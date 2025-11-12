import { IConfigRepository } from "../../application/interfaces/IConfigRepository";
import path from "node:path";
import * as os from "node:os";
import fs from "fs-extra";

export class ConfigRepository implements IConfigRepository {
    private CONFIG_DIR = path.join(os.homedir(), ".config", "kaskadcli");
    private CONFIG_FILE = path.join(this.CONFIG_DIR, "config.json");
    private configData: Record<string, any> = {};

    constructor() {
        this.loadData();
    }

    /**
     * Load data from user config file
     * @private
     */
    private loadData(): void {
        try {
            const data = fs.readFileSync(this.CONFIG_FILE, "utf-8");
            this.configData = JSON.parse(data);
        } catch {
            this.configData = {};
        }
    }

    /**
     * Save current config to user config  file
     * @param attribute {String}
     * @param value {String}
     * @results {boolean}
     */
    saveConfig(attribute: string, value: string): boolean {
        try{
            fs.ensureDirSync(this.CONFIG_DIR);
            this.configData[attribute] = value;
            fs.writeJSONSync(this.CONFIG_FILE, this.configData, { spaces: 2 });
            return true;
        }catch{
            return false;
        }
    }

    /**
     * Get config value from attribute
     * @param attribute {String}
     * @returns {String}
     */
    getConfig(attribute: string): string {
        return this.configData[attribute];
    }
}