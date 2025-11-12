import { IInitRepository } from "../interfaces/IInitRepository";

export class InitUsecase {
    constructor(private initRepository: IInitRepository) {}

    execute(backendUrl: string): void {
        this.initRepository.init(backendUrl);
    }
}