import { User } from "./user";

export interface Message {
  content: string,
  recipientId: number
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

export interface MessageToREST extends MessageforDomain {
  updateAt?: string;
  sender?: User;
}
