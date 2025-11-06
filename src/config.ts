import fs from "fs-extra";
import path from "path";
import os from "os";

const CONFIG_DIR = path.join(os.homedir(), ".config", "kaskad-cli");
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export interface Config {
    passkey?: string;
}

/**
 * Load configuration from current user .conf file
 */
export async function loadConfig(): Promise<Config> {
    try {
        const data = await fs.readFile(CONFIG_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return {};
    }
}

/**
 * Save configuration file into current user .config directory
 * @param config
 */
export async function saveConfig(config: Config) {
    await fs.ensureDir(CONFIG_DIR);
    await fs.writeJSON(CONFIG_FILE, config, { spaces: 2 });
}

export { CONFIG_FILE };