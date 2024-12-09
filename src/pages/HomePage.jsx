import React, { useState, useEffect, useRef, useContext } from 'react';
import NavBar from '../components/NavBar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remakerBreaks from 'remark-breaks';
import wirLogo from '/logo.png';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../components/Footer';
import WindowChatArea from '../components/organism/WindowChatArea';
import { LanguageContext } from '../context/LanguageContext';

export default function HomePage() {
  const [inputMessage, setInputMessage] = useState('');
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [sessionId, setSessionId] = useState(() => localStorage.getItem('sessionId') || '');
  const [conversations, setConversations] = useState(() => {
    const savedConverstations = localStorage.getItem('conversations');
    return savedConverstations ? JSON.parse(savedConverstations) : [];
  });
  const bottomOfChatArea = useRef(null);
  const latestBotMessage = useRef(null);
  const {
    loadingText,
    errorMessage,
    suggestMessage1,
    suggestMessage2,
    inputPlaceholder,
    heroText,
    languageCode,
    sendButtonText,
    startNewChatButtonText,
    startNewChatConfirmationText,
    changeLanguage
  } = useContext(LanguageContext);

  // If sessionId or message change, update the conversations and sessionId value
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
    localStorage.setItem('sessionId', sessionId);
  }, [conversations, sessionId]);

  useEffect(() => {
    if (isRequestPending) {
      scrollToChatArea();
      setInputMessage('');
    } else if (!isRequestPending) {
      scrollToLatestBotMessage();
    }
  }, [isRequestPending]);

  useEffect(() => {
    const inputTextArea = document.querySelector('#messageInputTextarea');
    inputTextArea.style.height = '3rem';
    inputTextArea.style.height = `${inputTextArea.scrollHeight}px`;
  }, [inputMessage]);

  function onMessageChange(e) {
    setInputMessage(e.target.value);
  }

  function onEnterKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (inputMessage) {
        sendQuestionMessage();
      }
    }
  }

  const scrollToChatArea = () => {
    bottomOfChatArea.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLatestBotMessage = () => {
    latestBotMessage.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSendMessageClick = (e) => {
    e.preventDefault();
    sendQuestionMessage();
  };

  const onTemplateMessageClick = (e) => {
    handleSelectedLanguage();
    setInputMessage(e.target.value);
  };

  const handleSelectedLanguage = () => {

  };

  useEffect(() => {
    // Handle selected language on component mount
    const languageCode = localStorage.getItem('languageCode') || 'id';
    changeLanguage(languageCode);
  }, [changeLanguage]);

  const sendQuestionMessage = async () => {
    const formattedInputMessage = inputMessage.replace(/\n\n/gi, '&nbsp; \n');

    const newInputMessage = { isUser: true, text: formattedInputMessage };
    setConversations((previousMessage) => [...previousMessage, newInputMessage]);

    let sessionId = localStorage.getItem('sessionId');

    // Create new session_id if session_id in localStorage not found
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('sessionId', sessionId);
    }

    const selectedLanguageCode = handleSelectedLanguage();

    const data = {
      message: inputMessage,
      session_id: sessionId,
      language: selectedLanguageCode
    };

    setIsRequestPending(true);

    const response = await fetch(process.env.REACT_APP_BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const answer = await response.json();

    setIsRequestPending(false);

    if (!sessionId && data.session_id) {
      setSessionId(data.session_id);
    }

    let rawBotMessage;

    try {
      rawBotMessage = answer.data.outputs[0].outputs[0].results.message.data.text.replace(/\n\n/gi, '&nbsp; \n\n');
    } catch (error) {
      rawBotMessage = errorMessage;
    }

    const botMessage = { isUser: false, text: rawBotMessage };
    setConversations((previousMessage) => [...previousMessage, botMessage]);
    setSessionId(sessionId);
  };

  return (
    <>
      <div className={`container-fluid flex flex-col min-h-screen mx-auto ${conversations.length == 0 ? '' : ''}`} style={{ backgroundImage: '/01.logo.png' }}>
        <NavBar handleSelectedLanguage={handleSelectedLanguage} startNewChatButtonText={startNewChatButtonText} startNewChatConfirmationText={startNewChatConfirmationText} />
        {/* Navbar */}
        <WindowChatArea conversations={conversations} languageContent={languageCode}/>

        <div className={`flex flex-col ${conversations.length == 0 ? 'my-auto' : 'flex-grow'}`}>
          {/* Render this component if there is no conversations */}
          <div className={`text-center ${conversations.length === 0 ? 'block px-7' : 'hidden'}`}>
            <div className='flex justify-center main-logo'>
              <img src={wirLogo} className='relative w-56' />
            </div>
            <h1 className='mb-3 text-2xl font-bold sm:text-3xl'>{heroText}</h1>
          </div>

          {/* Chat area */}
          <div className={`${conversations.length === 0 ? 'hidden' : 'flex mt-10'} flex-col chat-area flex-grow px-7 gap-10 sm:px-28 xl:px-56`}>
            {conversations.map((message, index) => (
              <div
                key={index}
                className={message.isUser ? "ml-auto bg-slate-100 py-2 px-4 rounded-2xl" : "bot-message"}
              >
                {message.isUser ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm, remakerBreaks]}>{message.text}</ReactMarkdown>

                ) : (
                  <>
                    <ReactMarkdown remarkPlugins={[remarkGfm, remakerBreaks]}>{message.text}</ReactMarkdown>
                    <div ref={latestBotMessage}></div>
                  </>
                )}
              </div>
            ))}

            {
              isRequestPending && (
                <>
                  <div className='bot-message' ref={bottomOfChatArea}>{loadingText}.</div>
                </>
              )
            }
          </div>
          {/* End of chat area */}

          {/* Input area */}
          <div className={`sticky bottom-0 pt-3 pb-1 ${!conversations ? 'my-auto' : ''}`}>
            <form className="flex justify-center gap-1 mx-1 sm:mx-10">
              <textarea
                value={inputMessage}
                onChange={onMessageChange}
                onKeyDown={onEnterKeyDown}
                type="text"
                required
                id="messageInputTextarea"
                placeholder={inputPlaceholder}
                className="box-border w-full px-5 py-2 border border-black resize-none xl:w-1/2 sm:w-2/3 rounded-xl h-11 max-h-36"
              />
              {
                inputMessage ? (
                  <button onClick={onSendMessageClick} className="items-start self-end inline-block px-4 text-white bg-black hover:bg-gray-900 rounded-xl h-11 whitespace-nowrap">
                    {sendButtonText}
                  </button>
                ) : (
                  <button type='submit' className="items-start self-end inline-block px-4 text-white bg-black hover:bg-gray-900 rounded-xl h-11 whitespace-nowrap">
                    {sendButtonText}
                  </button>
                )
              }
              {/* End of input area */}
            </form>
          </div>

          {/* Render this component if there is no conerstations */}
          <div className={`flex justify-center gap-2 flex-wrap mt-0 md:mt-3  px-7 ${conversations.length === 0 ? 'block' : 'hidden'}`}>
            <button
              onClick={onTemplateMessageClick}
              className='template-question'
              value={suggestMessage1}
            >
              {languageCode === 'id' || languageCode === 'en'
                ? `${suggestMessage1.substring(0, 25)}...`
                : `${suggestMessage1.substring(0, 10)}...`}
            </button>
            <button
              onClick={onTemplateMessageClick}
              className='template-question'
              value={suggestMessage2}>
              {languageCode === 'id' || languageCode === 'en'
                ? `${suggestMessage2.substring(0, 25)}...`
                : `${suggestMessage2.substring(0, 10)}...`}
            </button>
          </div>
        </div>

        <Footer></Footer>
      </div>
    </ >

  );
};