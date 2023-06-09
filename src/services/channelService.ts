
import { CreateChannel, EditChannel } from "@/commons/types/channel";
import { getRequest, postRequest, token } from "@/utils";
import { toast } from "react-toastify";

export const getChannels = async () => {
  let channels = [];
  
  const url = '/channels';
  const options = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const channelData = await getRequest(url, options);
    channels = channelData.channels;
    console.log(channels);
  } catch (error) {
    console.error('Erreur:', error);
  }

  return {
    props: {channels},
  };
};

export const onCreateChannel = async (data: CreateChannel) => {
  const url = '/channel';
  const newChannel = {
    name: data.channelName,
    type: data.type,
    members: data.members
  }
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const channelData = await postRequest(url, newChannel, options);
    toast('Channel create successfuly', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    window.location.href = '/channel';
    console.log(channelData);
    
  } catch (error) {
    toast('Failed create Channel', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    console.error('Erreur:', error);
  }

  return {
    props: {},
  };
};

export const onEditChannel = async (data: EditChannel, channelId: number) => {
  const url = `/channels/${channelId}/members`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const channelData = await postRequest(url, data, options);
    toast('Channel update successfuly', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    window.location.href = '/channel';
    console.log(channelData);
    
  } catch (error) {
    console.error('Erreur:', error);
  }
  await editChannel(data, channelId);
};

const editChannel = async (data: EditChannel, channelId: number) => {
  console.log("Édition du canal avec ID:", channelId);
  console.log("Nouvelles données:", data);
};
