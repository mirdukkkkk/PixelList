import { PixelCommandInterface, PermissionsInterface } from "./interfaces/PixelCommandInterface";

export class PixelCommand implements PixelCommandInterface {
    public name: string;
    public cooldown: number;
    public permissions?: PermissionsInterface;
    public raw: { dm_permission: boolean; name: string };

    constructor(name: string, options: object = {}, cooldown: number = 3, permissions?: PermissionsInterface) {
        this.name = name;
        this.cooldown = cooldown;
        this.permissions = permissions;
        this.raw = {
            name,
            ...options,
            dm_permission: false
        }
    }
}