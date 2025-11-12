import { Command } from "commander";
import {container} from "../../config/container";

export function set(program: Command): Command {
    return program
        .command("search")
        .description("Search for torrents")
        .argument("[value]", "content to search")
        .action(async (value) => {
            await container.search.execute(value);
        });
}