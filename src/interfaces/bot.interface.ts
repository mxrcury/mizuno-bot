import { Context } from "telegraf";

export interface Session {
    value:string
}

export interface BotContext extends Context {
    session:Session
}

export interface BotOptions {
    token: string
}