import { PixelEvent } from "../structures/PixelEvent";

export class ReadyEvent extends PixelEvent {
    constructor() {
        super('ready');
    }

    async run() {
        console.log('* Bot started!');
    }
}