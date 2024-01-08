import { REST, Routes } from "discord.js";
import { PixelClient } from "../src/structures/PixelClient";
import { LoaderService } from "../src/services/LoaderService";

const client = new PixelClient({ intents: 1 });
const rest = new REST().setToken(client.settings.token);
const rawCommands: object[] = [];

console.log(`* Starts loading commands into ${client.settings.clientId}`);
(async() => {
    await LoaderService.loadCommands(client, '../commands');
    client.commands.map(cmd => rawCommands.push(cmd.raw));

    try {
        const data/*: { length: number } | unknown*/ = await rest.put(
            Routes.applicationCommands(client.settings.clientId),
            { body: rawCommands }
        );

        // @ts-ignore
        console.log(`* Loaded ${data?.length || 0} commands`);
    } catch(error) {
        console.error(error);
        process.exit(0);
    }
})();