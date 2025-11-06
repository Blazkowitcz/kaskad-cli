#!/usr/bin/env node
import { Command } from "commander";
import { setPasskey, showPasskey } from "./commands/passkey.js";
import chalk from "chalk";

const program = new Command();

program
    .name("kaskadcli")
    .description("CLI Kaskad")
    .version("1.0.0");

program
    .command("passkey")
    .description("Manage user passkey")
    .argument("[value]", "New passkey")
    .action(async (value) => {
        if (value) {
            await setPasskey(value);
        } else {
            console.log(chalk.yellow("No passkey given"));
        }
    });

program
    .command("download")
    .description("Download Torrent")
    .argument("[slug]", "Torrent slug")
    .action(async (value) => {})

program.parse();
