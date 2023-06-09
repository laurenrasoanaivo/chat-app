
import { Message } from "@/commons/types/message";
import { getRequest, postRequest, token } from "@/utils";

export const getMessagesByUserId = async (userId: number) => {
  let messages = null;
  const url = `/messages/${userId}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const messageData = await getRequest(url, options);
    console.log(messageData);
    messages = messageData.messages;
  } catch (error) {
    console.error('Erreur:', error);
  }
  await messagesByUser(userId);
  return {
    props: {messages}
  }
};

export const getMessagesByChannelId = async (channelId: number) => {
  let messages = null;
  const url = `/messages/channel/${channelId}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const messageData = await getRequest(url, options);
    console.log(messageData);
    messages = messageData.messages;
  } catch (error) {
    console.error('Erreur:', error);
  }
  await messagesByUser(channelId);
  return {
    props: {messages}
  }
};

const messagesByUser = async (userId: number) => {
  console.log("Édition du canal avec ID:", userId);
};

export const onCreateMessage = async (data: Message) => {
  const url = `/message`;
  const newMessage = {
    content: data.message,
    recipientId: data.recipientId,
    channelId: data.channelId
  }
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const messageData = await postRequest(url, newMessage, options);
    console.log(messageData);
    
  } catch (error) {
    console.error('Erreur:', error);
  }
  
};