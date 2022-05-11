export class MessageContent {
  public date: Date;
  public from: string;
  public messageText: String;
  
  constructor(messageText: String) {
    this.date = new Date();
    this.from = 'server';
    this.messageText = messageText;
  }
}

export class Message {
  public chatId: any;
  public message: MessageContent;

  constructor(chatId: any, message: MessageContent) {
    this.chatId = chatId;
    this.message = message;
  }
}
