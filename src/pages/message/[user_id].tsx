import NavigationBar from '@/commons/components/NavigationBar';
import { UsertoREST } from '@/commons/types';
import { MessageUser, MessagetoREST } from '@/commons/types/message';
import { getMessagesByUserId, onCreateMessage } from '@/services/messageService';
import { getUserById } from '@/services/userService';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

const Message = () => {
  const { handleSubmit, register, control, setValue, reset, formState: { errors } } = useForm<MessageUser>();
  const router = useRouter();
  const { user_id } = router.query;
  const [messages, setMessages] = useState<MessagetoREST[]>();
  const [recipient, setRecipient] = useState<UsertoREST | null>();

  useEffect(() => {
    async function fetchData() {
      if (user_id) {
        const userMessageData = await getMessagesByUserId(Number(user_id));
        const recipientUserData = await getUserById(Number(user_id));
        setRecipient(recipientUserData.props.user)
        setMessages(userMessageData.props.messages);
        setValue('recipientId', Number(user_id));
      }
    }
    fetchData();
  }, [user_id]);

  const handleSendMessage = handleSubmit((data) => {
    if (data.content.trim() !== '') {
      onCreateMessage(data);
      const recipientId = data.recipientId;
      reset({ content: '', recipientId });
    }
  });

  return (
    <div>
      <NavigationBar />
      <h2>Direct Messages</h2>
      <h3>Recipient: {recipient?.name}</h3>

      <div>
        {messages != null &&
          messages.map((message, index) => (
            <div key={index}>
              <p>{message.sender?.name}</p>
              <p>{message.createdAt}</p>
              <p>{message.content}</p>
            </div>
          ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input type="hidden" {...register('recipientId')} defaultValue={user_id} />

        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: 'Message content is required' }}
          render={({ field, fieldState }) => (
            <textarea
              {...field}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Enter your message..."
            />
          )}
        />
        {errors.content && <p>{errors.content.message}</p>}
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Message;
