import axios, {AxiosInstance} from "axios";
import { ITorrentRepository } from "../../application/interfaces/ITorrentRepository";
import { ConfigRepository } from "../repositories/configRepository";
import {Torrent} from "../../domain/Torrent";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar, Cookie } from "tough-cookie";
import WebTorrent from 'webtorrent'
import { SingleBar } from 'cli-progress'

export class TorrentService implements ITorrentRepository {
    private client: AxiosInstance;
    private readonly jar: CookieJar;

    constructor(private configRepository: ConfigRepository) {
        this.jar = new CookieJar();
        this.client = wrapper(axios.create({ jar: this.jar, withCredentials: true }));
    }

    /**
     * Search torrents with value and return table
     * @param value {String}
     */
    async search(value: string): Promise<void> {
        try{
            await this.setTokenCookie();
            const res = await this.client.get(`${this.configRepository.getConfig('url')}/torrents/search`, {
                params: { name: value },
            });
            const torrents: Torrent[] = res.data.map((t: Torrent) => new Torrent(t.name, t.slug, t.size));
            console.table(
                torrents.map((t: Torrent) => ({
                    name: t.name,
                    slug: t.slug,
                    size: t.getSize(),
                }))
            );
        }catch(e){
            console.log('❌ Error while fetching torrents');
            throw e
        }
    }

    /**
     * Download torrent
     * @param torrentSlug {String}
     */
    async download(torrentSlug: string): Promise<void> {
        try{
            await this.setTokenCookie();
            const res = await this.client.get(
                `${this.configRepository.getConfig('url')}/torrents/download/${torrentSlug}`,
                { responseType: "arraybuffer" }
            );
            const progressBar = new SingleBar({
                format: 'CLI Progress |' + '{bar}' + '| {percentage}% || {value}/{total} Chunks || Speed: {speed}',
                barCompleteChar: '\u2588',
                barIncompleteChar: '\u2591',
                hideCursor: true
            });
            progressBar.start(100,0, {
                speed: 'N/A'
            })
            const webTorrentClient = new WebTorrent();
            webTorrentClient.add(Buffer.from(res.data), (torrent: WebTorrent.Torrent) => {
                const interval = setInterval(() => {
                    const downloadSpeed = (torrent.downloadSpeed / 1024 / 1024).toFixed(2);
                    progressBar.update(torrent.progress * 100, {speed: downloadSpeed});
                }, 2000);

                torrent.on("done", () => {
                    clearInterval(interval);
                    console.log(`✅ Téléchargement terminé : ${torrent.name}`);
                    torrent.destroy();
                    webTorrentClient.destroy();
                });
            });
        }catch{
            console.log(`❌ Error during downloading torrent`);
        }
    }

    private async setTokenCookie(): Promise<void> {
        const token = this.configRepository.getConfig("token");
        if (!token) {
            throw new Error("❌ Missing Token. Please reconnect");
        }

        const cookie = new Cookie({
            key: "token",
            value: token,
            domain: "localhost",
            httpOnly: true,
            secure: false,
        });

        await this.jar.setCookie(cookie.toString(), this.configRepository.getConfig('url'));
    }
}