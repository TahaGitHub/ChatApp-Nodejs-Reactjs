import React from 'react';

const ChatItemOfList = ({
  chatId,
  chatsCount,
  onSelect,
  onDelete
}) => {
  return (
    <li className='row chatItemOfList'>
      <span className={`itemText ${chatsCount > 1 ? 'col-10' : 'col-12'}`} onClick={onSelect}>
        <h6>
          Chat id {chatId}
        </h6>
      </span>

      {chatsCount > 1 && 
        // {/* For open new chat */}
        <span className='col-2 itemTrash' onClick={onDelete}>
          <i className="bi bi-trash"></i>
        </span>
      }
    </li>
  );
}

export default ChatItemOfList;