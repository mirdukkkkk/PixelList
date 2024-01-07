export interface PixelCommandInterface {
    name: string;
    cooldown: number;
    raw: {
        name: string;
    };
    permissions?: PermissionsInterface;
}

export interface PermissionsInterface {
    user: string[];
    client: string[];
}