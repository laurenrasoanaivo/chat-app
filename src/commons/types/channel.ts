import { User } from "./user";

export interface Channel {
    name: string;
    type: string;
  }

  export interface EditChannel {
    type: string;
    members: number[];
  }

  export interface CreateChannel {
    channelName: string;
    type: string;
    members: number[];
  }
  
  export interface ChannelforDomain {
    ownerId?: number;
    createdAt?: string;
    id?: number;
    name?: string;
    type?: string;
  }
  
  export interface ChanneltoREST extends ChannelforDomain {
    deletedAt?: string;
    owner?: User;
  }
  