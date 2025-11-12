import { Command } from "commander";
import path from "node:path";
import fs from "fs-extra";
import {fileURLToPath} from "node:url";

const program = new Command();

program
    .name("kaskad-cli")
    .description("Kaskad torrent CLI client")
    .version("1.0.0");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsDir = path.join(__dirname, "commands");
for (const file of fs.readdirSync(commandsDir)) {
    const module = await import(path.join(commandsDir, file));

    if (module.set && typeof module.set === "function") {
        module.set(program);
    } else {
        console.warn(`⚠️ The file ${file} doesn't contain "set(program)" function`);
    }
}

program.parse(process.argv);