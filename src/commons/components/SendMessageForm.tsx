
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Message, MessageToREST } from '../types/message';
import { onCreateMessage } from '@/services/messageService';
import { UsertoREST } from '../types';

interface SendMessageProps {
  recipient_id?: string,
  channel_id?: string,
  sender: UsertoREST | null,
  messagesContainerRef: any,
  setMessages: React.Dispatch<React.SetStateAction<MessageToREST[]>>
}

const SendMessageForm = ({ recipient_id, channel_id, sender, setMessages, messagesContainerRef }: SendMessageProps) => {
  const { handleSubmit, register, control, reset, formState: { errors } } = useForm<Message>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = handleSubmit((data: Message) => {
    if (data.message?.trim() !== '') {
      const currentDate = new Date().toISOString();
      const newData: MessageToREST = {
        senderId: sender?.id,
        recipientId: undefined,
        createdAt: currentDate,
        id: undefined,
        content: data.message,
        channelId: undefined,
        updateAt: '',
        sender: { name: sender?.name }
      };

      onCreateMessage(data);
      const recipientId = data.recipientId;
      reset({ message: '', recipientId });
      setMessages(prevMessages => [...prevMessages, newData]);
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSendMessage();
  };

  return (
    <div className='fixed-bottom bg-dark p-3'>
      <form name='sendMessageForm' onSubmit={onSubmit}>
        {recipient_id != null && <input type="hidden" {...register('recipientId')} defaultValue={Number(recipient_id)} />}
        {channel_id != null && <input type="hidden" {...register('channelId')} defaultValue={channel_id} />}

        <div className='d-flex justify-message-center'>
          <div className='px-2'>
            <Controller
              name="message"
              control={control}
              defaultValue=""
              rules={{ required: '' }}
              render={({ field }) => (
                <textarea
                  {...field}
                  name='message'
                  value={field.value}
                  ref={textareaRef}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Enter your message..."
                />
              )}
            />
            {errors.message && <p>{errors.message.message}</p>}
          </div>
          <div className='p-2'>
            <button className='sendMessageButton btn btn-dark border border-light-subtle' type="submit">Send Message</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default SendMessageForm;
