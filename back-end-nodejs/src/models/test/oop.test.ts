import { Message, MessageContent } from '../oop';

describe('testing message constructor', () => {
  it('creating message', () => {

    let msg = 'My Test';
    let id = 1;

    let messageContent = new MessageContent(msg);
    let message = new Message(id, messageContent);

    expect(typeof(messageContent.messageText)).toBe('string');
    
    expect(messageContent.date.getTime).toBe(new Date().getTime);
    expect(messageContent.messageText).toBe(msg);
    expect(messageContent.from).toBe('server');

    expect(message.chatId).toBe(id);

    expect(message.message).toBe(messageContent);
  });
});