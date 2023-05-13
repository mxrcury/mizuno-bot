import { Context } from 'telegraf';

export interface ISession {
  value: string;
}
export interface IBotContext extends Context {
  session: ISession;
}

export interface IBotOptions {
  token: string;
}

export interface IMessage {
  message_id: number;
  from: IMessageFrom;
  chat: IChat;
  date: number;
  text: string;
}

export interface IMessageFrom {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
  language_code: string;
}
export interface IChat {
  id: number;
  first_name: string;
  username: string;
  type: string;
}

export interface IExtractAudioArgs {
  videoPath: string;
  audioPath: string;
}
