import { Command } from "commander";
import inquirer from "inquirer";
import {container} from "../../config/container";

export function set(program: Command): Command {
    return program
        .command("auth")
        .description("Connection to Kaskad server")
        .action(async () => {
            const identification = await inquirer.prompt([
                { type: "input", name: "username", message: "Username :" },
                { type: "password", name: "password", message: "Password :", mask: "*" },
            ]);
            await container.signin.execute(identification.username, identification.password);
        });
}