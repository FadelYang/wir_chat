import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remakerBreaks from 'remark-breaks';
import { v4 as uuidv4 } from 'uuid';

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

  function handleMessageInput(e) {
    setInputMessage(e.target.value);
  }

  function handleEnterInput(e) {
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

  const handleSendMessageClick = (e) => {
    e.preventDefault();
    sendQuestionMessage();
  };

  const handleTemplateMessageButtonClick = (e) => {
    setInputMessage(e.target.value);
  };

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

    const data = {
      message: inputMessage,
      session_id: sessionId
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
      rawBotMessage = 'Gagal menjawab pertanyaan, server mengalami masalah. Silahkan hubungi tim IT Governance';
    }

    const botMessage = { isUser: false, text: rawBotMessage };
    setConversations((previousMessage) => [...previousMessage, botMessage]);
    setSessionId(sessionId);
  };

  return (
    <div className=''>
      <div className={`container flex flex-col min-h-screen mx-auto ${conversations.length == 0 ? '' : ''}`}>
        <NavBar />
        {/* Navbar */}
        <div className={`flex flex-col ${conversations.length == 0 ? 'my-auto' : 'flex-grow'}`}>
          {/* Render this component if there is no conversations */}
          <div className={`text-center ${conversations.length === 0 ? 'block px-7' : 'hidden'}`}>
            <h1 className='mb-3 text-2xl font-bold sm:text-3xl'>Ada yang bisa saya bantu?</h1>
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
                  <div className='bot-message' ref={bottomOfChatArea}>Sedang memproses, silahkan menunggu...</div>
                </>
              )
            }
          </div>
          {/* End of chat area */}

          {/* Input area */}
          <div className={`sticky bottom-0 bg-white p-3 ${!conversations ? 'my-auto' : ''}`}>
            <form className="flex justify-center gap-1 mx-1 sm:mx-10">
              <textarea
                value={inputMessage}
                onChange={handleMessageInput}
                onKeyDown={handleEnterInput}
                type="text"
                required
                id="messageInputTextarea"
                placeholder="Kirim pertanyaan"
                className="w-full px-5 py-2 border border-black resize-none xl:w-1/2 sm:w-2/3 rounded-xl h-11 max-h-36"
              />
              {
                inputMessage ? (
                  <button onClick={handleSendMessageClick} className="items-start self-end px-5 text-white bg-black rounded-xl h-11 flex-shrink-1">
                    Kirim
                  </button>
                ) : (
                  <button type='submit' className="items-start self-end px-5 text-white bg-gray-900 rounded-xl h-11 flex-shrink-1">
                    Kirim
                  </button>
                )
              }
              {/* End of input area */}
            </form>
          </div>

          {/* Render this component if there is no conerstations */}
          <div className={`flex justify-center gap-2 flex-wrap mt-3 px-7 ${conversations.length === 0 ? 'block' : 'hidden'}`}>
            <button
              onClick={handleTemplateMessageButtonClick}
              className='template-question'
              value='Adakah bisnis unit yang relevan untuk membuat platform eCommerce dengan pengalaman AR?'
            >
              Adakah bisnis unit yang...
            </button>
            <button
              onClick={handleTemplateMessageButtonClick}
              className='template-question'
              value='Apa yang kamu ketahui tentang AR&Co?'>
              Apa yang kamu ketahui...
            </button>
          </div>
        </div>
      </div>
    </div >

  );
};