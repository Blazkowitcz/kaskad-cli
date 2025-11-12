/**
 * Repositories and Services
 */
import { ConfigRepository } from "../infrastructure/repositories/configRepository";
import { AuthService } from '../infrastructure/services/authService';
import { TorrentService } from "../infrastructure/services/torrentService";
import { InitRepository } from "../infrastructure/repositories/InitRepository";

/**
 * Use Cases
 */
import { AuthenticateUseCase } from "../application/usecases/authenticate.usecase";
import { SearchTorrentUseCase } from "../application/usecases/searchTorrent.usecase";
import { DownloadTorrentUseCase } from "../application/usecases/downloadTorrent.usecase";
import { InitUsecase } from "../application/usecases/init.usecase";

/**
 * Init
 */
const configRepository = new ConfigRepository();
const authService = new AuthService(configRepository);
const torrentService = new TorrentService(configRepository);
const initRepository = new InitRepository(configRepository);

export const container = {
    signin: new AuthenticateUseCase(authService),
    search: new SearchTorrentUseCase(torrentService),
    download: new DownloadTorrentUseCase(torrentService),
    init: new InitUsecase(initRepository),
}