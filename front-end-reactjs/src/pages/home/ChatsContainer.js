import React, { useEffect, useRef, useState } from 'react';

import ChatItemOfList from '../../components/ChatItemOfList';
import MessageItem from '../../components/MessageItem';
import { Chat, Message } from '../../models/oop';

const ChatsContainer = ({ userName, socket }) => {
  const [chats, setchats] = useState([]);
  const [currentChat, setcurrentChat] = useState();

  const [newRecMessage, setnewRecMessage] = useState();
  const [newMessage, setnewMessage] = useState('');
  
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Add new chat when app start
    newChat();

    // Listener for new message
    socket.on("message", (message) => {
      console.log(`Resived message from server Chat's id: ${message.chatId} & Server's Message: ${message.message}`);
      setnewRecMessage(message);
    });
    return () => socket.off('message');
  }, []);
  
  // Fixed Receiving new message because inside listener can not access usestate updates
  useEffect(() => {
    if (newRecMessage) {
      // Search for chat and add the new message that receive from server
      let _chats = chats;
      let _newRecMessage = new Message(
        new Date(newRecMessage.message.date),
        newRecMessage.message.from,
        newRecMessage.message.messageText,
      );
      let index = chats.findIndex((item) => item.chatId === newRecMessage.chatId);
      _chats[index].messages.push(_newRecMessage);
      setchats([..._chats]);
      scrollDown();
    }
  }, [newRecMessage]);

  // Open New Chat and get chatId from server
  function newChat () {
    console.log(`Open new chat. Chat's count ${chats.length} `);
    
    // Listener for request chat id where make the server creating it
    socket.on('res-request-id', (chatId) => {

      let _newChat = new Chat(chatId);
      setchats(prevArray => [...prevArray, _newChat]);
      setcurrentChat(_newChat);
      
      socket.off('res-request-id');
      socket.removeListener('res-request-id');
    });
    
    // Send request for chatId
    socket.emit('request-id');
  }

  // Delete Chat
  function delChat(index, chatId) {
    console.log(`Delete chat ${index}`);
    setchats(chats.filter((item, _index) => item.chatId !== chatId));

    // Check if delete current chat will show empty message
    if (currentChat.chatId === chatId) {
      setcurrentChat(null);
    }
  }

  // Send Message to Server 
  function sendMessage () {
    if (!newMessage) {
      console.log(`No Message entered`)
      return;
    }

    console.log(`Sending "${newMessage}" message to server`);
    let message = new Message(null, userName, newMessage);
    setcurrentChat(e => ({
      ...e,
      [e.messages]: e.messages.push(message)
    }));

    socket.emit("message", { chatId: currentChat.chatId, message });
    setnewMessage('');
    scrollDown();
  }

  // When Click on Enter will send message if exist
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const scrollDown = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className='row chatsContainer'>

      <div className="col chatslistBox">
        {/* Show chat count in top left for chat list box */}
        <h6>{chats.length} Chats</h6>
        
        <ul className="list-unstyled scroll-bar" >
          {chats.map((chat, index) => 
            <ChatItemOfList key={index}
              chatId={chat.chatId}
              chatsCount={chats.length}
              onSelect={() => {
                setcurrentChat(chat)
                scrollDown();
              }}
              onDelete={() => delChat(index, chat.chatId)}/>
          )}
        </ul>

        {/* For open new chat */}
        <span onClick={newChat}>
          <i className="bi bi-plus"></i>
        </span>
      </div>

      <div className='col-8 messagesBox'>
        <div className='chatContent'>
          {currentChat ?
            <div className='ChatSelected'>
              CHAT ID {currentChat.chatId}
              
              <ul className="list-unstyled scroll-bar" >
                {/* Messages List */}
                {currentChat.messages.map((item, index) => 
                  <MessageItem key={index} userName={userName} messages={item} />
                )}
                <div className='scroller' ref={messagesEndRef} />
              </ul>

              {/* Input & button to write and send a message */}
              <div className='row texterForm'>
                <div className="col-9 div1">
                  <input type="text" className="text-start"
                    value={newMessage} onChange={(e) => setnewMessage(e.target.value)}
                    onKeyDown={handleKeyDown} placeholder="Message" />
                </div>

                <div className="col-3 div2">
                  <span onClick={() => sendMessage()} className="sendButton">
                    <i className='bi bi-send-fill'></i>
                  </span>
                </div>
              </div>
            </div>
            :
            <div className='noChatSelected'>
              NO CHAT SELECTED<br/>SELECT ONE<br/>PLEASE
            </div>
          }
        </div>
      </div>

    </div>
  );
}

export default ChatsContainer;