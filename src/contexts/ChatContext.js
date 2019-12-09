import React, { createContext, useReducer, useState } from 'react';
import io from 'socket.io-client';
import { getToken } from '../Helpers/auth-helper';
import { ProyectContext } from '../contexts/ProyectContext';

// proyect:[{msg}, {msg}, ...]
const initState = {
  '': []
};

const ChatContext = createContext();

//@state = all messages
//@action = a message
const reducer = (state, action) => {
  const { from, msg, proyectId } = action.payload;
  console.log(state[proyectId]);
  if (!state[proyectId]) {
    state[proyectId] = [];
  }
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
  const [proyectChat, setProyectChat] = useState({});
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
    <ChatContext.Provider
      value={{ setProyectChat, allChats, sendChatAction, user }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatContextProvider };
