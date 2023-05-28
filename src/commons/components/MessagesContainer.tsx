import { Container } from "react-bootstrap"
import MessagesList from "./MessageList";
import { MessageToREST } from "../types/message";
import SendMessageForm from "./SendMessageForm";
import { UsertoREST } from "../types";

interface MessagesContainerProps{
  messagesContainerRef: any,
  messages: MessageToREST[],
  sender: UsertoREST | null,
  setMessages: React.Dispatch<React.SetStateAction<MessageToREST[]>>,
  recipient_id?: string,
  channel_id?: string,
}

const MessagesContainer = ({ messagesContainerRef, messages, sender, recipient_id, channel_id, setMessages }: MessagesContainerProps) => {
    return (
        <Container ref={messagesContainerRef} fluid className="content-container w-50 mt-5 mb-5 py-5 overflow-y-auto h-100">
        {messages != null &&
            messages
              .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
              .map((message, index) => (
                <MessagesList key={index} message={message} sender={sender} />
              ))}
        {recipient_id!=null ? <SendMessageForm messagesContainerRef={messagesContainerRef} recipient_id={String(recipient_id)} sender={sender} setMessages={setMessages} /> : <SendMessageForm messagesContainerRef={messagesContainerRef} channel_id={String(channel_id)} sender={sender} setMessages={setMessages} />}
      </Container>
    )
}

export default MessagesContainer;