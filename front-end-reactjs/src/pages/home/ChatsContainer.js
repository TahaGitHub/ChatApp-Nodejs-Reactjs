import React, { useEffect, useState } from 'react';

import ChatItemOfList from '../../components/ChatItemOfList';

const ChatsContainer = ({ userName, socket }) => {
  const [chats, setchats] = useState([]);

  useEffect(() => {
    if (chats.length === 0) {
      setchats([socket])
    }

    // socket.on("message", function({id, msg}) {
    //   console.log(`Chat's id: ${id} & Server's Message: ${msg}`);
    // });

    // socket.emit("message", { id: 1, msg: 'messagesss' });
  }, []);
  
  // Open New Chat
  function newChat () {
    console.log(`Open new chat. Chat's count ${chats.length} `);
    setchats(prevArray => [...prevArray, socket])
  }

  // Delete Chat
  function delChat(index) {
    console.log('Delete new chat');
    let list = [...chats];
    list.splice(index, 1);
    setchats(list);
  }

  return (
    <div className='row chatsContainer'>
      <div className="col chatslistBox">
        {/* Show chat count in top left for chat list box */}
        <h6>{chats.length} Chats</h6>
        
        <ul className="list-unstyled scroll-bar" >
          {chats.map((chat, index) => 
            <ChatItemOfList key={index}
              chatId={chat.id}
              chatIndex={index}
              chatsCount={chats.length}
              onSelect={() => console.log(index)}
              onDelete={delChat}/>
          )}
        </ul>

        {/* For open new chat */}
        <span onClick={newChat}>
          <i className="bi bi-plus"></i>
        </span>
      </div>
      <div className='col-8 messageBox'>
        Chat messages
      </div>
    </div>
  );
}

export default ChatsContainer;