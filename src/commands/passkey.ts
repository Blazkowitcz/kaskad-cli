import chalk from "chalk";
import { saveConfig, loadConfig } from "../config.js";

/**
 * Set and save new passkey
 * @param passkey {string}
 */
export async function setPasskey(passkey: string) {
    const current = await loadConfig();
    const updated = { ...current, passkey };
    await saveConfig(updated);
    console.log(chalk.green("✅ Passkey sauvegardée avec succès !"));
}

/**
 *
 */
export async function showPasskey() {
    const config = await loadConfig();
    if (config.passkey) {
        console.log(chalk.cyan(`🔑 Passkey actuelle : ${config.passkey}`));
    } else {
        console.log(chalk.yellow("⚠️  Aucune passkey n’est encore définie."));
    }
}