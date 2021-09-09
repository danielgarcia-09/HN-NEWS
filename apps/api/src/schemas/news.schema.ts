import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type NewsDocument = News & Document;

@Schema()
export class News{

    @Prop(String)
    title: string;

    @Prop(String)
    author: string;

    @Prop(String)
    url: string;

    @Prop(String)
    created_at: string;

    @Prop({ type: Boolean, default: true })
    active: boolean;

}

export const NewsSchema = SchemaFactory.createForClass(News);