import React from 'react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socketServerUrl = 'http://localhost:3010';

const config = {
  secure: true,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 10,
  // transports: ['polling'],
};

let socket = io(socketServerUrl, config);
socket.on('connect', () => {
  // console.log(`Socket is connected with id: ${socket.id}`);
});

const Realtime = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState('');
  const [messagesReceived, setMessagesReceived] = useState([]);
  const name = localStorage.getItem('user');
  // console.log(name)

  const sendMessage = () => {
    socket.emit('client-message', { name, messages });
    setMessages('')
  };
  useEffect(() => {
    socket.on('sever-message', (data) => {
      // setMessagesReceived(data.messages)
      console.log(data);
      console.log(messages);
      // if (data.type === 'chat') {
      const tmp = messagesReceived;
      console.log(tmp);
      tmp.push(data);

      setMessagesReceived([...tmp]);
      // }
    });
  }, []);
  console.log(messagesReceived);
  // console.log(messages)
  return (
    <div className='contaner-message'>
      <div div className='chat-box'>
      <div className='chat-box-top'> 
        {messagesReceived.map((m, index) => {
          return (
            <div key={'message-' + index} style={{ marginBottom: 8, flex: 1, display: 'flex' }}>
              {name === m.name && (
                <div style={{ flex: 1 }}>
                  <div className='contaner-message-name'>
                    <p style={{ marginBottom:'0' }} className='contaner-message-text'>{m.name}</p>
                  </div>
                  <div className='contaner-message-overview'>{m.messages}</div>
                </div>
              )}

              {name !== m.name && (
                <div style={{ flex: 1, display: 'flex' }}>
                  <div style={{ backgroundColor: 'gray', display: 'flex', flex: 0 }}>
                    {m.name}: {m.messages}
                  </div>
                  <div style={{ flex: 1 }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>


      {/* <form onSubmit={sendMessage}> */}
      <div className='contaner-message-send'>
        <input
          className="contaner-message-input"
          placeholder="Message..."
          value={messages}
          onChange={(event) => {
            setMessages(event.target.value);
          }}
        />
        <button onClick={sendMessage} className="contaner-message-button">
          <i class="fas fa-paper-plane" style={{color: 'white'}}></i>
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Realtime;
