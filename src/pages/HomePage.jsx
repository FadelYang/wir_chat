import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remakerBreaks from 'remark-breaks';
import wirLogo from '/logo.png';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../components/Footer';

const languageLibrary = {
  id: {
    loadingText: 'Sedang memproses, silahkan menunggu...',
    errorMessage: 'Gagal menjawab pertanyaan, server mengalami masalah. Silahkan hubungi tim IT Governance.',
    suggestMessage1: 'Adakah bisnis unit yang relevan untuk membuat platform eCommerce dengan pengalaman AR?',
    suggestMessage2: 'Apa yang kamu ketahui tentang AR&Co?',
    inputPlaceholder: 'Kirim pertanyaan...',
    heroText: 'Ada yang bisa saya bantu?',
    sendButtonText: 'Kirim',
    startNewChatButtonText: 'Mulai chat baru',
    startNewChatConfirmationText: 'Apakah kamu yakin? chat yang ada sekarang akan terhapus'
  },
  en: {
    loadingText: 'Processing, please wait...',
    errorMessage: 'Failed to answer the question. The server encountered an issue. Please contact the IT Governance team.',
    suggestMessage1: 'Is there a relevant business unit to create an eCommerce platform with an AR experience?',
    suggestMessage2: 'What do you know about AR&Co?',
    inputPlaceholder: 'Send a question...',
    heroText: 'Can I help you?',
    sendButtonText: 'Send',
    startNewChatButtonText: 'Start a new chat',
    startNewChatConfirmationText: 'Are you sure? The current chat will be deleted',
  },
  ja: {
    loadingText: '処理中です。お待ちください...',
    errorMessage: '質問に答えることができませんでした。サーバーに問題が発生しました。ITガバナンスチームに連絡してください。',
    suggestMessage1: 'AR体験を備えたeコマースプラットフォームを作成するために関連するビジネスユニットはありますか？',
    suggestMessage2: 'AR&Coについて何を知っていますか？',
    inputPlaceholder: '質問を送信...',
    heroText: 'お手伝いしますか？',
    sendButtonText: '送信',
    startNewChatButtonText: '新しいチャットを開始',
    startNewChatConfirmationText: 'よろしいですか？現在のチャットが削除されます',
  },
  zhCn: {
    loadingText: '处理中，请稍候...',
    errorMessage: '未能回答问题，服务器遇到问题。请联系IT治理团队。',
    suggestMessage1: '是否有相关的业务部门可以创建带有AR体验的电子商务平台？',
    suggestMessage2: '你对AR&Co了解多少？',
    inputPlaceholder: '发送问题...',
    heroText: '需要帮忙吗？',
    sendButtonText: '发送',
    startNewChatButtonText: '开始新聊天',
    startNewChatConfirmationText: '你确定吗？当前的聊天将被删除',
  },
};

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
  const [loadingText, setLoadingText] = useState(languageLibrary.id.loadingText);
  const [errorMessage, setErrorMessage] = useState(languageLibrary.id.errorMessage);
  const [suggestMessage1, setSuggestMessage1] = useState(languageLibrary.id.suggestMessage1);
  const [suggestMessage2, setSuggestMessage2] = useState(languageLibrary.id.suggestMessage2);
  const [inputPlaceholder, setInputPlaceholder] = useState(languageLibrary.id.inputPlaceholder);
  const [heroText, setHeroText] = useState(languageLibrary.id.heroText);
  const [languageCode, setlanguageCode] = useState(() => localStorage.getItem('languageCode') || 'id');
  const [sendButtonText, setSendButtonText] = useState(languageLibrary.id.sendButtonText);
  const [startNewChatButtonText, setStartNewChatButtonText] = useState(languageLibrary.id.startNewChatButtonText);
  const [startNewChatConfirmationText, setStartNewChatConfirmationText] = useState(languageLibrary.id.startNewChatConfirmationText);

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
    handleSelectedLanguage();
    setInputMessage(e.target.value);
  };

  const handleSelectedLanguage = () => {
    // Handle selected language
    let languageCode = localStorage.getItem('languageCode');

    if (!languageCode) {
      languageCode = 'id';
    }

    if (languageCode === 'id') {
      setLoadingText(languageLibrary.id.loadingText);
      setErrorMessage(languageLibrary.id.errorMessage);
      setSuggestMessage1(languageLibrary.id.suggestMessage1);
      setSuggestMessage2(languageLibrary.id.suggestMessage2);
      setInputPlaceholder(languageLibrary.id.inputPlaceholder);
      setHeroText(languageLibrary.id.heroText);
      setSendButtonText(languageLibrary.id.sendButtonText);
      setStartNewChatButtonText(languageLibrary.id.startNewChatButtonText);
      setStartNewChatConfirmationText(languageLibrary.id.startNewChatConfirmationText);
    } else if (languageCode === 'en') {
      setLoadingText(languageLibrary.en.loadingText);
      setErrorMessage(languageLibrary.en.errorMessage);
      setSuggestMessage1(languageLibrary.en.suggestMessage1);
      setSuggestMessage2(languageLibrary.en.suggestMessage2);
      setInputPlaceholder(languageLibrary.en.inputPlaceholder);
      setHeroText(languageLibrary.en.heroText);
      setSendButtonText(languageLibrary.en.sendButtonText);
      setStartNewChatButtonText(languageLibrary.en.startNewChatButtonText);
      setStartNewChatConfirmationText(languageLibrary.en.startNewChatConfirmationText);
    } else if (languageCode === 'ja') {
      setLoadingText(languageLibrary.ja.loadingText);
      setErrorMessage(languageLibrary.ja.errorMessage);
      setSuggestMessage1(languageLibrary.ja.suggestMessage1);
      setSuggestMessage2(languageLibrary.ja.suggestMessage2);
      setInputPlaceholder(languageLibrary.ja.inputPlaceholder);
      setHeroText(languageLibrary.ja.heroText);
      setSendButtonText(languageLibrary.ja.sendButtonText);
      setStartNewChatButtonText(languageLibrary.ja.startNewChatButtonText);
      setStartNewChatConfirmationText(languageLibrary.ja.startNewChatConfirmationText);
    } else if (languageCode === 'zh-cn') {
      setLoadingText(languageLibrary.zhCn.loadingText);
      setErrorMessage(languageLibrary.zhCn.errorMessage);
      setSuggestMessage1(languageLibrary.zhCn.suggestMessage1);
      setSuggestMessage2(languageLibrary.zhCn.suggestMessage2);
      setInputPlaceholder(languageLibrary.zhCn.inputPlaceholder);
      setHeroText(languageLibrary.zhCn.heroText);
      setSendButtonText(languageLibrary.zhCn.sendButtonText);
      setStartNewChatButtonText(languageLibrary.zhCn.startNewChatButtonText);
      setStartNewChatConfirmationText(languageLibrary.zhCn.startNewChatConfirmationText);
    }

    setlanguageCode(languageCode);
    return languageCode;
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
                onChange={handleMessageInput}
                onKeyDown={handleEnterInput}
                type="text"
                required
                id="messageInputTextarea"
                placeholder={inputPlaceholder}
                className="box-border w-full px-5 py-2 border border-black resize-none xl:w-1/2 sm:w-2/3 rounded-xl h-11 max-h-36"
              />
              {
                inputMessage ? (
                  <button onClick={handleSendMessageClick} className="items-start self-end inline-block px-4 text-white bg-black hover:bg-gray-900 rounded-xl h-11 whitespace-nowrap">
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
              onClick={handleTemplateMessageButtonClick}
              className='template-question'
              value={suggestMessage1}
            >
              {languageCode === 'id' || languageCode === 'en'
                ? `${suggestMessage1.substring(0, 25)}...`
                : `${suggestMessage1.substring(0, 10)}...`}
            </button>
            <button
              onClick={handleTemplateMessageButtonClick}
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