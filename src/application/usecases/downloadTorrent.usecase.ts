import {ITorrentRepository} from "../interfaces/ITorrentRepository";

export class DownloadTorrentUseCase {
    constructor(private torrentRepository: ITorrentRepository) {}

    async execute(torrentSlug: string): Promise<void> {
        const torrent = this.torrentRepository.download(torrentSlug);
    }
}