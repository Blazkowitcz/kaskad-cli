import { IInitRepository } from "../../application/interfaces/IInitRepository";
import { ConfigRepository } from "./configRepository";

export class InitRepository implements IInitRepository {
    constructor(private configRepository: ConfigRepository) {}

    init(backendUrl: string): void {
        try{
            this.configRepository.saveConfig('url', backendUrl);
            console.log(`✅ Configuration saved`);
        }catch{
            console.log(`❌ Error during saving configuration`);
        }
    }
}