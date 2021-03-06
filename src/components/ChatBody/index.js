import React, { useEffect, useCallback, useRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Container } from '@material-ui/core';
import ChatMessage from '../ChatMessage';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '5px',
    paddingBottom: '70px',
  },
}));

function App({
  contactName, contactAvatar, userName, userAvatar, messages, onOption,
}) {
  const endElRef = useRef(null);

  function scrollToEnd() {
    endElRef.current.scrollIntoView({ behavior: 'instant' });
  }

  useEffect(scrollToEnd, [messages]);

  const handleChooseOption = useCallback((option) => {
    if (onOption) {
      onOption(option);
    }
  }, [onOption]);

  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      {messages.map((message, index) => (
        <ChatMessage
          key={message.key}
          message={message}
          isLast={index === messages.length - 1}
          handleChooseOption={handleChooseOption}
          userName={userName}
          userAvatar={userAvatar}
          contactName={contactName}
          contactAvatar={contactAvatar}
          onImageLoad={scrollToEnd}
        />
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={endElRef} />
    </Container>
  );
}

export default App;
