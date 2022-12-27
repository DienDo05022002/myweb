import React from 'react';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie'
import {BsMessenger} from 'react-icons/bs'
import {TbSend} from 'react-icons/tb'

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
  const name = Cookies.get('user')
//  localStorage.getItem('user');
  const [openMes, setOpenMes] = useState(false);
  // console.log(name)

  const sendMessage = () => {
    socket.emit('client-chat', { name, messages });
    setMessages('');
  };
  useEffect(() => {
    socket.on('sever-chat', (data) => {
      console.log(data);
      console.log(messages);
      const tmp = messagesReceived;
      console.log(tmp);
      tmp.push(data);

      setMessagesReceived([...tmp]);
    });
  }, []);
  console.log(messagesReceived);
  console.log(openMes);
  return (
    // <div>Message</div>
    <div className="contaner-message--chat">
      <div>
        <Button
          onClick={() => setOpenMes(!openMes)}
          className="contaner-message--button"
        >
          <BsMessenger style={{ fontSize: '30px' }}/>
        </Button>
        <div
          className={
            openMes === true ? 'contaner-message' : 'contaner-message-close'
          }
        >
          <div div className="chat-box">
            <div className="chat-box-top">
              {messagesReceived.map((m, index) => {
                return (
                  <div
                    key={'message-' + index}
                    style={{ marginBottom: 8, flex: 1, display: 'flex' }}
                  >
                    {name === m.name && (
                      <div style={{ flex: 1 }}>
                        <div className="contaner-message-overview">
                          {m.messages}
                        </div>
                      </div>
                    )}

                    {name !== m.name && (
                      <div style={{ flex: 1 }}>
                        <div className="contaner-message-enemy">
                          <p
                            style={{ marginBottom: '0' }}
                            className="contaner-message-text-enemy"
                          >
                            {m.name}
                          </p>
                        </div>
                        <div className="contaner-message-overview-enemy">
                          {m.messages}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="contaner-message-send">
            <input
              className="contaner-message-input"
              placeholder="Message..."
              value={messages}
              onChange={(event) => {
                setMessages(event.target.value);
              }}
            />
            <Button
              variant="primary"
              onClick={sendMessage}
              className="contaner-message-button"
            >
              {/* <i class="fas fa-paper-plane" style={{ color: 'white' }}></i> */}
              <TbSend style={{ fontSize: '20px' }}/>
            </Button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default Realtime;
