import React from 'react';
import io from 'socket.io-client';
import { getToken } from '../Helpers/auth-helper';

/*
  {
    from: 'user
    msg: 'hi'
    topic: 'general'
  }

  state {
    topic1: [
      {msg}, {msg}, {msg}
    ]
    general: [
      {msg}, {msg}, {msg}, {newmsg}
    ]
  }

*/

const initState = {
  general: [
    { from: 'Aaron', msg: 'Hello' },
    { from: 'Jhon', msg: 'hello' },
    { from: 'Pool', msg: 'Hi' }
  ]
};

export const CTX = React.createContext();

//state = all messages, action = a message
const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      const allMessages = {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
      return allMessages;
    default:
      return false;
  }
};

let socket;

const sendChatAction = value => {
  socket.emit('chat message', value);
};

const Storage = props => {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  const user = 'Jhonny' + Math.random(100).toFixed(2);

  if (!socket) {
    socket = io(':3001', {
      query: {
        token: getToken()
      }
    });
    socket.on('chat message', function(msg) {
      dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
    });
  }

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
};

export default Storage;
