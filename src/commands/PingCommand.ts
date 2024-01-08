import { PixelCommand } from "../structures/PixelCommand";
import { CommandInteraction } from "discord.js";

export class PingCommand extends PixelCommand {
    constructor() {
        super('ping', {
            description: 'Отображает текущую задержку пингов Discord API'
        }, 3);
    }

    async run(interaction: CommandInteraction) {
        return interaction.reply({ content: `Понг! Текущая задержка: \`${interaction.client.ws.ping}ms\`` });
    }
}