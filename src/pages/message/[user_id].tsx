
import NavigationBar from '@/commons/components/NavigationBar';
import { UsertoREST } from '@/commons/types';
import { Message, MessageToREST } from '@/commons/types/message';
import { getMessagesByUserId } from '@/services/messageService';
import { getUser, getUserById } from '@/services/userService';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import React from 'react';
import MessagesContainer from '@/commons/components/MessagesContainer';
import { redirect } from '@/services';

interface MessageProps {
  initialMessages: MessageToREST[];
  recipientData: UsertoREST | null;
  senderData: UsertoREST | null;
}

const Message = ({ initialMessages, recipientData, senderData }: MessageProps) => {
  const { setValue, formState: { errors } } = useForm<Message>();
  const router = useRouter();
  const { user_id } = router.query;
  const [messages, setMessages] = useState<MessageToREST[]>(initialMessages);
  const [recipient, setRecipient] = useState<UsertoREST | null>(recipientData);
  const [sender, setSender] = useState<UsertoREST | null>(senderData);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, [user_id]);

  const fetchData = async () => {
    if (user_id) {
      const [userMessageData, recipientUserData, userData] = await Promise.all([
        getMessagesByUserId(Number(user_id)),
        getUserById(Number(user_id)),
        getUser()
      ]);

      setSender(userData.props.user);
      setRecipient(recipientUserData.props.user);
      setMessages(userMessageData.props.messages);
      setValue('recipientId', Number(user_id));
    }
  };

  return (
    <div>
      <NavigationBar/>
      <div className=''>
        <MessagesContainer messagesContainerRef={messagesContainerRef} messages={messages} setMessages={setMessages} sender={sender} recipient_id={String(user_id)} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const { user_id } = context.query;
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return redirect('/login');
  }
  const [userMessageData, recipientUserData] = await Promise.all([
    getMessagesByUserId(Number(user_id)),
    getUser()
  ]);

  return {
    props: {
      initialMessages: userMessageData.props.messages,
      recipientData: recipientUserData.props.user,
    },
  };
}

export default Message;
