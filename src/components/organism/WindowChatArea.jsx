import React, { useContext, useEffect, useRef, useState } from 'react';
import MainInputMessage from '../molecules/MainInputMessage';
import MainPageLogo from '../molecules/MainPageLogo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remakerBreaks from 'remark-breaks';
import { v4 as uuidv4 } from 'uuid';
import { LanguageContext } from '../../context/LanguageContext';
import SuggestedMessage from '../molecules/SuggestedMessage';

const WindowChatArea = ({ conversations }) => {
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [sessionId, setSessionId] = useState(() => localStorage.getItem('sessionId') || '');
  const [inputMessage, setInputMessage] = useState('');
  const {
    errorMessage,
    loadingText,
    changeLanguage
  } = useContext(LanguageContext);
  const bottomOfChatArea = useRef(null);
  const latestBotMessage = useRef(null);

  const sendQuestionMessage = async () => {
    const formattedInputMessage = inputMessage.replace(/\n\n/gi, '&nbsp; \n');
    const newInputMessage = { isUser: true, text: formattedInputMessage };

    setConversations((previousMessage) => [...previousMessage, newInputMessage]);

    let sessionId = localStorage.getItem('sessionId');
    const selectedLanguageCode = localStorage.getItem('languageCode');

    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('sessionId', sessionId);
    }

    const requestParams = {
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
      body: JSON.stringify(requestParams)
    });

    const answer = await response.json();

    setIsRequestPending(false);

    if (!sessionId && requestParams.session_id) {
      setSessionId(requestParams.session_id);
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

  const onSendMessageClick = (e) => {
    e.preventDefault();
    sendQuestionMessage();
  };

  const onMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const onEnterKeyDown = (e) => {
    if (e.key === 'Enter' & !e.shiftkey) {
      e.preventDefault();

      if (inputMessage) {
        sendQuestionMessage();
      }
    }
  };

  const onTemplateMessageClick = (e) => {
    e.preventDefault();
    console.log('Suggest message button clicked');
    setInputMessage(e.target.value);
    console.log({
      buttonvalue: e.target.value,
      inputMessageState: inputMessage
    });
  };

  const scrollToChatArea = () => {
    bottomOfChatArea.current?.scrollIntoView({ behaviour: 'smooth' });
  };

  const scrollToLatestBotMessage = () => {
    latestBotMessage.current?.scrollIntoView({ behaviour: 'smooth' });
  };

  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
    localStorage.setItem('sessionId', sessionId);
  }, [conversations, sessionId]);

  useEffect(() => {
    if (isRequestPending) {
      scrollToChatArea();
      setInputMessage('');
    } else {
      scrollToLatestBotMessage();
    }
  });

  useEffect(() => {
    const inputTextArea = document.querySelector('#messageInputTextareaComponent');
    inputTextArea.style.height = '3rem';
    inputTextArea.style.height = `${inputTextArea.scrollHeight}px`;
  }, [inputMessage]);

  useEffect(() => {
    const languageCode = localStorage.getItem('languageCode') || 'id';
    changeLanguage(languageCode);
  }, [changeLanguage]);

  return (
    <div className={`flex flex-col ${conversations.length == 0 ? 'my-auto' : 'flex-grow'}`}>
      <MainPageLogo conversations={conversations} />
      <div className={`${conversations.length === 0 ? 'hidden' : 'flex mt-10'}  flex-col chat-area flex-grow px-7 gap-10 sm:px-28 xl:px-56`}>
        {conversations.map((message, index) => (
          <div key={index} className={message.isUser ? 'ml-auto bg-slate-100 py-2 px-4 rounded-2xl' : 'bot-message'}>
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
        {isRequestPending && (
          <>
            <div className='bot-message' ref={bottomOfChatArea}>{loadingText}.</div>
          </>
        )}
      </div>
      <MainInputMessage
        onSendMessageClick={onSendMessageClick}
        onMessageChange={onMessageChange}
        onEnterKeyDown={onEnterKeyDown}
        conversations={conversations}
        inputValue={inputMessage}
      />
      <SuggestedMessage
        conversations={conversations}
        onClick={onTemplateMessageClick}
      />
    </div>
  );
};

export default WindowChatArea;