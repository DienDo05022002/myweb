import React from 'react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Button from 'react-bootstrap/Button';

const socketServerUrl = 'http://localhost:3010';

const config = {
  secure: true,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 10,
};

let socket = io(socketServerUrl, config);
socket.on('connect', () => {
  // console.log(`Socket is connected with id: ${socket.id}`);
});

const Realtime = () => {
  const [messages, setMessages] = useState('');
  const [messagesReceived, setMessagesReceived] = useState([]);
  const name = localStorage.getItem('user');
  const [openMes, setOpenMes] = useState(false);
  // console.log(name)

  const sendMessage = () => {
    socket.emit('client-chat', { name, messages });
    setMessages('')
  };
  useEffect(() => {
    socket.on('sever-chat', (data) => {
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
  // console.log(messagesReceived);
  // console.log(openMes)
  return (
    <div className='contaner-message--chat'>
    <div>
    <Button  onClick={() => setOpenMes(!openMes)} className='contaner-message--button'>
      <i class="fab fa-facebook-messenger" style={{fontSize: '30px'}} ></i>
    </Button>
    <div className={
      openMes === true 
        ? 'contaner-message' : 'contaner-message-close'
    }>
      <div div className='chat-box'>
      <div className='chat-box-top'> 
        {messagesReceived.map((m, index) => {
          return (
            <div key={'message-' + index} style={{ marginBottom: 8, flex: 1, display: 'flex' }}>
              {name === m.name && (
                <div style={{ flex: 1 }}>
                  {/* <div className='contaner-message-name'>
                    <p style={{ marginBottom:'0' }} className='contaner-message-text'>{m.name}</p>
                  </div> */}
                  <div className='contaner-message-overview'>{m.messages}</div>
                </div>
              )}

              {name !== m.name && (
                <div style={{ flex: 1 }}>
                  <div className='contaner-message-enemy'>
                    <p style={{ marginBottom:'0' }} className='contaner-message-text-enemy'>{m.name}</p>
                  </div>
                  <div className='contaner-message-overview-enemy'>{m.messages}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>


      <div className='contaner-message-send'>
        {/* {name !== null ? (<div>
          <input
          className="contaner-message-input"
          placeholder="Message..."
          value={messages}
          onChange={(event) => {
            setMessages(event.target.value);
          }}
        />
        <Button variant="primary" onClick={sendMessage} className="contaner-message-button">
          <i class="fas fa-paper-plane" style={{color: 'white'}}></i>
        </Button>
        </div>) : (<div>
          <input
            disabled
            className="contaner-message-input"
            placeholder="Vui lòng đăng nhập để Chat"
          />
          <Button variant="primary" className="contaner-message-button" disabled>
            <i class="fas fa-paper-plane" style={{color: 'white'}}></i>
          </Button>
        </div>)} */}
        <input
          className="contaner-message-input"
          placeholder="Message..."
          value={messages}
          onChange={(event) => {
            setMessages(event.target.value);
          }}
        />
        <Button variant="primary" onClick={sendMessage} className="contaner-message-button">
          <i class="fas fa-paper-plane" style={{color: 'white'}}></i>
        </Button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Realtime;
