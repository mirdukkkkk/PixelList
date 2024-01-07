import path from "path";
import fs from "fs/promises";

import { PixelEvent } from "../structures/PixelEvent";
import { PixelCommand } from "../structures/PixelCommand";
import { PixelClient } from "../structures/PixelClient";

export class LoaderService {
    constructor() {
        throw new TypeError(`Class ${this.constructor.name} cannot be initialized!`);
    }

    public static async loadEvents(client: PixelClient, dir: string = '') {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for(const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if(stat.isDirectory()) {
                await this.loadEvents(client, path.join(dir, file));
            }
            if(file.endsWith('.js')) {
                const Listener = require(path.join(filePath, file));
                if(Listener.prototype instanceof PixelEvent) {
                    const listener = new Listener();
                    client.events.set(listener.name, listener);
                    client.on(listener.name, listener.run.bind(listener, client));
                }
            }
        }
    }

    public static async loadCommands(client: PixelClient, dir: string = '') {
        const filePath = path.join(__dirname, dir);
        const files = await fs.readdir(filePath);
        for(const file of files) {
            const stat = await fs.lstat(path.join(filePath, file));
            if(stat.isDirectory()) {
                await this.loadCommands(client, path.join(dir, file));
            }
            if(file.endsWith('.js')) {
                const Command = require(path.join(filePath, file));
                if(Command.prototype instanceof PixelCommand) {
                    const cmd = new Command();
                    client.commands.set(cmd.name, cmd);
                }
            }
        }
    }
}