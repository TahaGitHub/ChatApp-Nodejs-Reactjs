import React, { useState } from 'react';
import ChatsContainer from './ChatsContainer';
import { Connection } from '../../services/Connection';

export function Home () {
  const [socket, setSocket] = useState(null);
  const [name, setname] = useState('');
  const [isName, setisName] = useState(true);

  // Connect to server when click on connect button
  async function connect () {
    if (name === '') {
      setisName(false);
      return;  
    }

    console.log(`Wait please Server Connecting...`);

    const newSocket = Connection();
    setSocket(newSocket);

    newSocket.on('connection', () => {
      console.log(`Wow, User connected with the back-end server`);
    });
  }
  
  return (
    <div className='homePage'>
      <h3>Technical Case Test</h3>
      {socket ? 
        // Chats box list
        <div>
          <h6>Welcome {name.toUpperCase()}</h6>
          <ChatsContainer userName={name} socket={socket} />
        </div>
        :
        // Input form to enter user name & connect ot server
        <div className='form'>
          <input type="text" placeholder='Enter your name'
            value={name} onChange={(event) => { setname(event.target.value); setisName(true); }} />
          {!isName && <div className='invalid-name'>Please add you name</div>}
          <button type="button" onClick={connect} className="btn btn-success">Connect Server</button>
        </div>
      }
      <h5>Did by Taha Almokahel</h5>
    </div>
  );
}