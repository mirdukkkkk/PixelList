import { ObjectId } from "mongodb";

export interface SchemasGuildInterface {
    whitelist: string[];
}

export interface FullSchemasGuildInterface extends SchemasGuildInterface {
    _id: ObjectId;
    id: string;
}