import { User } from "./user";

export interface Channel {
    name: string;
    type: string;
  }

  export interface AddMembers {
    members: number[];
  }

  export interface CreateChannel {
    name: string;
    type: string;
    members: string;
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
  