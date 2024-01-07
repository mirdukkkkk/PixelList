import { PixelEventInterface } from "./interfaces/PixelEventInterface";

export class PixelEvent implements PixelEventInterface {
    constructor(public name: string) {
        this.name = name;
    }
}