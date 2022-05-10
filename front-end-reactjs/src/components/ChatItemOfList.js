import React from 'react';

const ChatItemOfList = ({
  chatId,
  chatIndex,
  chatsCount,
  onSelect,
  onDelete
}) => {
  return (
    <li className='row chatItemOfList' onClick={onSelect}>
      <h5>
        Chat {chatIndex + 1}
      </h5>

      {chatsCount > 1 && 
        // {/* For open new chat */}
        <span onClick={onDelete}>
          <i className="bi bi-trash"></i>
        </span>
      }
    </li>
  );
}

export default ChatItemOfList;