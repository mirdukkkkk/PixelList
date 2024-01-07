import { PixelClient } from "./structures/PixelClient";

const client = new PixelClient({
    intents: 71
});

client._start();