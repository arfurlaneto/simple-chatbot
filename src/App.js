import React, { useEffect, useCallback, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import ChatHeader from './components/ChatHeader';
import ChatBody from './components/ChatBody';
import ChatFooter from './components/ChatFooter';

import config from './config';
import ChatEngine from './ChatEngine';
import covidDialog from './dialogs/covid19';

function App() {
  const [botName] = useState(config.botName);
  const [botAvatar] = useState(config.botAvatar);
  const [userName] = useState(config.userName);
  const [userAvatar] = useState(config.userAvatar);

  const [engine] = useState(new ChatEngine(covidDialog));
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (engine) {
      setMessages(engine.start());
    }
  }, [engine]);

  const handleUserText = useCallback(async (data) => {
    const userText = typeof (data) === 'string' ? data : data.label;
    const newMessages = await engine.handleUserText(userText);
    setMessages([...messages, ...newMessages]);
  }, [engine, messages]);

  return (
    <>
      <CssBaseline />
      <ChatHeader
        contactName={botName}
        contactAvatar={botAvatar}
        contactStatus="online"
      />
      <ChatBody
        messages={messages}
        contactName={botName}
        contactAvatar={botAvatar}
        userName={userName}
        userAvatar={userAvatar}
        onOption={handleUserText}
      />
      <ChatFooter
        onText={handleUserText}
      />
    </>
  );
}

export default App;
