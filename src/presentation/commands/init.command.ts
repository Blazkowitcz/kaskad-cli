import { Command } from "commander";
import {container} from "../../config/container";
import inquirer from "inquirer";

export function set(program: Command): Command {
    return program
        .command("init")
        .description("Init client configuration")
        .argument("[backendUrl]", "Backend URL")
        .action(async () => {
            const information = await inquirer.prompt([
                { type: "input", name: "backendUrl", message: "Backend URL (http://localhost:3000) :" },
            ]);
            container.init.execute(information.backendUrl || 'http://localhost:3000');
        });
}