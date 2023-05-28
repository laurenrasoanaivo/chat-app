
import { MessageUser } from "@/commons/types/message";
import { API_URL, getRequest, postRequest, token } from "@/utils";

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
    const messageData = await getRequest(API_URL + url, options);
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

const messagesByUser = async (userId: number) => {
  console.log("Édition du canal avec ID:", userId);
};

export const onCreateMessage = async (data: MessageUser) => {
  const url = `/message`;

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const messageData = await postRequest(API_URL + url, data, options);
    console.log(messageData);
    
  } catch (error) {
    console.error('Erreur:', error);
  }
  
};