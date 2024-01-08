import { CommandInteraction } from "discord.js";

export interface PixelCommandInterface {
    readonly name: string;
    cooldown: number;
    raw: {
        name: string;
    };
    permissions?: PermissionsInterface;

    run(interaction: CommandInteraction): Promise<any> | Promise<void> | any | void;
}

export interface PermissionsInterface {
    user: string[];
    client: string[];
}