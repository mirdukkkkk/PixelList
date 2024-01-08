import * as settings from "../../settings.json";
import { Client, ClientOptions, Collection } from "discord.js";
import { MongoClient } from "mongodb";
import { LoaderService } from "../services/LoaderService";

import { PixelEvent } from "./PixelEvent";
import { PixelCommand } from "./PixelCommand";

export class PixelClient extends Client {
    readonly settings;
    readonly mongo;
    readonly commands: Collection<string, PixelCommand> = new Collection();
    readonly events: Collection<string, PixelEvent> = new Collection();

    constructor(options: ClientOptions) {
        super(options);
        this.settings = settings;
        this.mongo = new MongoClient(this.settings.mongo);
    }

    get database() {
        return this.mongo.db('stable');
    }

    async _start(): Promise<string> {
        await this.mongo.connect();
        await LoaderService.loadEvents(this, '../events');
        await LoaderService.loadCommands(this, '../commands');
        return this.login(this.settings.token);
    }
}