import { Command } from "commander";
import {container} from "../../config/container";

export function set(program: Command): Command {
    return program
        .command("download")
        .description("Download")
        .argument("[slug]", "Torrent slug")
        .action(async (slug) => {
            await container.download.execute(slug);
        });
}