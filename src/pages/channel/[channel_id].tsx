
import NavigationBar from '@/commons/components/NavigationBar';
import { UsertoREST } from '@/commons/types';
import { Message, MessageToREST } from '@/commons/types/message';
import { getMessagesByChannelId } from '@/services/messageService';
import { getUser, getUserById } from '@/services/userService';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import React from 'react';
import MessagesContainer from '@/commons/components/MessagesContainer';
import { ChanneltoREST } from '@/commons/types/channel';
import { redirect } from '@/services';

interface MessageProps {
  initialMessages: MessageToREST[];
  channelData: ChanneltoREST | null;
  senderData: UsertoREST | null;
}

const ChannelMessage = ({ initialMessages, channelData, senderData }: MessageProps) => {
  const { setValue, formState: { errors } } = useForm<Message>();
  const router = useRouter();
  const { channel_id } = router.query;
  const [messages, setMessages] = useState<MessageToREST[]>(initialMessages);
  const [channel, setChannel] = useState<ChanneltoREST | null>(channelData);
  const [sender, setSender] = useState<UsertoREST | null>(senderData);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, [channel_id]);

  const fetchData = async () => {
    if (channel_id) {
      const [userMessageData, channelData, userData] = await Promise.all([
        getMessagesByChannelId(Number(channel_id)),
        getUserById(Number(channel_id)),
        getUser()
      ]);

      setSender(userData.props.user);
      setChannel(channelData.props.user);
      setMessages(userMessageData.props.messages);
      setValue('recipientId', Number(channel_id));
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className=''>
        <MessagesContainer messagesContainerRef={messagesContainerRef} messages={messages} setMessages={setMessages} sender={sender} channel_id={String(channel_id)} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { channel_id } = context.query;
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return redirect('/login');
  }

  const [userMessageData, senderUserData] = await Promise.all([
    getMessagesByChannelId(Number(channel_id)),
    getUser()
  ]);

  return {
    props: {
      initialMessages: userMessageData.props.messages,
      senderData: senderUserData.props.user,
    },
  };
}

export default ChannelMessage;
