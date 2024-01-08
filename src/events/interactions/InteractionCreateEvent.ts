import { CommandsExecutorService } from "../../services/CommandsExecutorService";
import { PixelEvent } from "../../structures/PixelEvent";
import { PixelClient } from "../../structures/PixelClient";
import { Interaction } from "discord.js";

export class InteractionCreateEvent extends PixelEvent {
    constructor() {
        super('interactionCreate');
    }

    async run(client: PixelClient, interaction: Interaction): Promise<any> {
        if(!interaction.isCommand()) return;
        if(!interaction.guild) return interaction.reply({ content: 'Команды доступны только на серверах, где я присутствую', ephemeral: true });

        const executor = new CommandsExecutorService(interaction, client);
        return executor.runCommand();
    }
}