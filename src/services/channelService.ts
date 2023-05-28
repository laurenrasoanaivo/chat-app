
import { AddMembers, CreateChannel } from "@/commons/types/channel";
import { getRequest, postRequest, token } from "@/utils";
import { Channel } from "diagnostics_channel";
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
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const channelData = await postRequest(url, data, options);
    toast('Channel create successfuly', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    window.location.href = '/channel';
    console.log(channelData);
    
  } catch (error) {
    console.error('Erreur:', error);
  }

  return {
    props: {},
  };
};

export const onEditChannel = async (data: AddMembers, channelId: number) => {
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

const editChannel = async (data: AddMembers, channelId: number) => {
  console.log("Édition du canal avec ID:", channelId);
  console.log("Nouvelles données:", data);
};
