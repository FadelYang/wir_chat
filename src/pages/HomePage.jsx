import React, { useState, useEffect, useRef, useContext } from 'react';
import NavBar from '../components/organism/NavBar';
import Footer from '../components/organism/Footer';
import WindowChatArea from '../components/organism/WindowChatArea';
import { LanguageContext } from '../context/LanguageContext';

export default function HomePage() {
  const [conversations, setConversations] = useState(() => {
    const savedConverstations = localStorage.getItem('conversations');
    return savedConverstations ? JSON.parse(savedConverstations) : [];
  });
  const {
    languageCode,
    startNewChatButtonText,
    startNewChatConfirmationText,
  } = useContext(LanguageContext);

  const handleSelectedLanguage = () => {

  };

  return (
    <>
      <div className={`container-fluid flex flex-col min-h-screen mx-auto ${conversations.length == 0 ? '' : ''}`} style={{ backgroundImage: '/01.logo.png' }}>
        <NavBar handleSelectedLanguage={handleSelectedLanguage} startNewChatButtonText={startNewChatButtonText} startNewChatConfirmationText={startNewChatConfirmationText} />
        {/* Navbar */}
        <WindowChatArea languageContent={languageCode} conversations={conversations} setConversations={setConversations}/>
        <Footer></Footer>
      </div>
    </ >

  );
};