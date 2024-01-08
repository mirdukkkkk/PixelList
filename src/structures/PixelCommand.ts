import { PixelCommandInterface, PermissionsInterface } from "./interfaces/PixelCommandInterface";
import { CommandInteraction } from "discord.js";

export abstract class PixelCommand implements PixelCommandInterface {
    public cooldown: number;
    public raw: { name: string; dm_permission: boolean; };

    protected constructor(public name: string, options: object = {}, cooldown: number = 3, public permissions?: PermissionsInterface) {
        this.name = name;
        this.cooldown = cooldown;
        this.permissions = permissions;
        this.raw = {
            name,
            ...options,
            dm_permission: false
        }
    }

    abstract run(interaction: CommandInteraction): Promise<any> | Promise<void> | any | void;
}