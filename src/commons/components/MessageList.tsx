
import { Row, Col } from 'react-bootstrap';
import { MessageToREST } from '../types/message';
import { UsertoREST } from '../types';

interface MessageListProps{
    message: MessageToREST,
    sender: UsertoREST | null
}

const MessagesList = ({ message, sender }: MessageListProps) => {
    const dateTime = new Date(message.createdAt);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString();
  
    return (
      <div className={`message ${message.senderId === sender?.id ? 'sender-message' : 'recipient-message'}`}>
        <Row>
          <Col>
            <p className='fs-6 mb-0'>{message.sender?.name}</p>
            <p className='fs-6 mb-1'>{formattedDate} {formattedTime}</p>
            <p className={`message ${message.senderId === sender?.id ? 'sender-message-content text-start d-inline-block mw-100' : 'recipient-message-content text-start d-inline-block mw-100'}`}>{message.content}</p>
          </Col>
        </Row>
      </div>
    );
  };
  

export default MessagesList;