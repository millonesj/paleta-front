import React from 'react';
import io from 'socket.io-client';

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
    { from: 'Pool', msg: 'Hi' },
    { from: 'Moor', msg: 'hello' },
    { from: 'Aaron', msg: 'Hello' },
    { from: 'Jhon', msg: 'hello' },
    { from: 'Pool', msg: 'Hi' },
    { from: 'Moor', msg: 'hello' },
    { from: 'Aaron', msg: 'Hello' },
    { from: 'Jhon', msg: 'hello' },
    { from: 'Pool', msg: 'Hi' },
    { from: 'Moor', msg: 'hello' },
    { from: 'Aaron', msg: 'Hello' },
    { from: 'Jhon', msg: 'hello' },
    { from: 'Pool', msg: 'Hi' },
    { from: 'Moor', msg: 'hello' }
  ]
};

export const CTX = React.createContext();

const reducer = (state, action) => {
  console.log('>> STATE');
  console.log(state);
  console.log('>>> ACTION>');
  console.log(action);

  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
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
    socket = io(':3001');
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
