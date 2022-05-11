import React from 'react';

const MessageItem = ({ userName, messages }) => {
  return (
    <li className={`messageBox ${messages.from === userName ? 'rightBox' : 'leftBox'}`}>
      <h6 className={`${messages.from === userName ? 'rightBox' : 'leftBox'}`}>
        {messages.from}
      </h6>
      {messages.messageText}
    </li>
  );
}

export default MessageItem;