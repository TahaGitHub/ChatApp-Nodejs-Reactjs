
export class Message {
  constructor(date, from, messageText) {
    this.date = date || new Date();
    this.from = from;
    this.messageText = messageText;
  }
}

export class Chat {
  constructor(chatId) {
    this.chatId = chatId || null; // Math.floor(Math.random()*(100 - 1 + 1) + 0);
    this.messages = [];
  }
}