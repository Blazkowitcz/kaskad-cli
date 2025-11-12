export interface ITorrentRepository {
    search(value: string): Promise<void>;
    download(torrentSlug: string): Promise<void>;
}
