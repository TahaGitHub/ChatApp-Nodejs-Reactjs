"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oop_1 = require("../oop");
describe('testing message constructor', () => {
    it('creating message', () => {
        let msg = 'My Test';
        let id = 1;
        let messageContent = new oop_1.MessageContent(msg);
        let message = new oop_1.Message(id, messageContent);
        expect(typeof (messageContent.messageText)).toBe('string');
        expect(messageContent.date.getTime).toBe(new Date().getTime);
        expect(messageContent.messageText).toBe(msg);
        expect(messageContent.from).toBe('server');
        expect(message.chatId).toBe(id);
        expect(message.message).toBe(messageContent);
    });
});
//# sourceMappingURL=oop.test.js.map