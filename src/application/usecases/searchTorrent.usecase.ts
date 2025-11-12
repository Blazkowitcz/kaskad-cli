import {ITorrentRepository} from "../interfaces/ITorrentRepository";

export class SearchTorrentUseCase {
    constructor(private torrentRepository: ITorrentRepository) {}

    async execute(content: string) {
        await this.torrentRepository.search(content);
    }
}