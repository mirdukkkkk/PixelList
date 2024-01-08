import { Collection, CommandInteraction } from "discord.js";
import { PixelClient } from "../structures/PixelClient";
import { PixelCommand } from "../structures/PixelCommand";

const cooldown: Collection<string, string> = new Collection();

export class CommandsExecutorService {
    readonly interaction;
    readonly client;

    constructor(interaction: CommandInteraction, client: PixelClient) {
        this.interaction = interaction;
        this.client = client || interaction.client;
    }

    async runCommand() {
        const command: PixelCommand | undefined = this.client.commands.get(this.interaction.commandName);

        if(command) {
            try {
                await command.run(this.interaction);
            } catch(error) {
                console.error(error);
            }

            cooldown.set(this.interaction.user.id, command.name);
            setTimeout(() => cooldown.delete(this.interaction.user.id), command.cooldown * 1000);
        }
    }
}