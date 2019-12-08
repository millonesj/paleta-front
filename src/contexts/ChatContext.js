import React, { createContext, useReducer } from 'react';
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
  '5de70c1a5607dd49f83060fa': [{ from: 'Aaron', msg: 'Hello' }]
};

const ChatContext = createContext();

//@state = all messages
//@action = a message
const reducer = (state, action) => {
  const { from, msg, proyectId } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      const allMessages = {
        ...state,
        [proyectId]: [...state[proyectId], { from, msg }]
      };
      return allMessages;
    default:
      return [];
  }
};

let socket;

const sendChatAction = value => {
  socket.emit('chat message', value);
};

const ChatContextProvider = props => {
  const [allChats, dispatch] = useReducer(reducer, initState);
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
    <ChatContext.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
