import * as settings from "../../settings.json";
import { Client, ClientOptions, Collection } from "discord.js";
import { MongoClient } from "mongodb";
import { LoaderService } from "../services/LoaderService";

export class PixelClient extends Client {
    readonly settings;
    readonly mongo;
    commands = new Collection();
    events = new Collection();

    constructor(options: ClientOptions) {
        super(options);
        this.settings = settings;
        this.mongo = new MongoClient(this.settings.mongo);
    }

    get database() {
        return this.mongo.db('stable');
    }

    async _start() {
        await this.mongo.connect();
        await LoaderService.loadEvents(this, '../events');
        await LoaderService.loadCommands(this, '../commands');
        return this.login(this.settings.token);
    }
}