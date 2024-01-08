import { PixelEventInterface } from "./interfaces/PixelEventInterface";
import { PixelClient } from "./PixelClient";

export abstract class PixelEvent implements PixelEventInterface {
    protected constructor(public name: string) {
        this.name = name;
    }

    abstract run(client: PixelClient, ...params: any): Promise<any> | Promise<void> | any | void;
}