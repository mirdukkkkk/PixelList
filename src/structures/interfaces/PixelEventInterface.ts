import { PixelClient } from "../PixelClient";

export interface PixelEventInterface {
    name: string;

    run(client: PixelClient, ...params: any): Promise<any> | Promise<void> | any | void;
}