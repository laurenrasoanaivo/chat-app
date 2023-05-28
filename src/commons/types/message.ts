import { User } from "./user";

export interface Message {
  content: string,
}

export interface MessageUser extends Message {
  recipientId: number
}

export interface MessageChannel extends Message {
  channelId: number
}

export interface MessageforDomain {
  senderId?: number;
  recipientId?: number;
  createdAt: string;
  id?: number;
  content?: string;
  channelId?: number;
}

export interface MessagetoREST extends MessageforDomain {
  updateAt?: string;
  sender?: User;
}
