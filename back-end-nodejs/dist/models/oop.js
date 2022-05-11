"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.MessageContent = void 0;
class MessageContent {
    constructor(messageText) {
        this.date = new Date();
        this.from = 'server';
        this.messageText = messageText;
    }
}
exports.MessageContent = MessageContent;
class Message {
    constructor(chatId, message) {
        this.chatId = chatId;
        this.message = message;
    }
}
exports.Message = Message;
//# sourceMappingURL=oop.js.map