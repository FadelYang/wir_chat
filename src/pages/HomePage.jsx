import React, { useState } from 'react';
import WindowChatArea from '../components/organism/WindowChatArea';
import MainTemplate from '../components/templates/MainTemplate';

export default function HomePage() {
  const [conversations, setConversations] = useState(() => {
    const savedConverstations = localStorage.getItem('conversations');
    return savedConverstations ? JSON.parse(savedConverstations) : [];
  });

  return (
    <>
      <MainTemplate
        children={
          <WindowChatArea conversations={conversations} setConversations={setConversations} />
        } />
    </>
  );
};