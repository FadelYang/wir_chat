// LanguageContext.js
import React, { createContext, useState, useEffect } from 'react';

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

// Create the LanguageContext
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [languageCode, setLanguageCode] = useState(localStorage.getItem('languageCode') || 'id');
  const [loadingText, setLoadingText] = useState(languageLibrary[languageCode].loadingText);
  const [errorMessage, setErrorMessage] = useState(languageLibrary[languageCode].errorMessage);
  const [suggestMessage1, setSuggestMessage1] = useState(languageLibrary[languageCode].suggestMessage1);
  const [suggestMessage2, setSuggestMessage2] = useState(languageLibrary[languageCode].suggestMessage2);
  const [inputPlaceholder, setInputPlaceholder] = useState(languageLibrary[languageCode].inputPlaceholder);
  const [heroText, setHeroText] = useState(languageLibrary[languageCode].heroText);
  const [sendButtonText, setSendButtonText] = useState(languageLibrary[languageCode].sendButtonText);
  const [startNewChatButtonText, setStartNewChatButtonText] = useState(languageLibrary[languageCode].startNewChatButtonText);
  const [startNewChatConfirmationText, setStartNewChatConfirmationText] = useState(languageLibrary[languageCode].startNewChatConfirmationText);

  // Function to change language
  const changeLanguage = (languageCode) => {
    setLanguageCode(languageCode);
    localStorage.setItem('languageCode', languageCode);

    const languageSettings = languageLibrary[languageCode] || languageLibrary['id'];

    setLoadingText(languageSettings.loadingText);
    setErrorMessage(languageSettings.errorMessage);
    setSuggestMessage1(languageSettings.suggestMessage1);
    setSuggestMessage2(languageSettings.suggestMessage2);
    setInputPlaceholder(languageSettings.inputPlaceholder);
    setHeroText(languageSettings.heroText);
    setSendButtonText(languageSettings.sendButtonText);
    setStartNewChatButtonText(languageSettings.startNewChatButtonText);
    setStartNewChatConfirmationText(languageSettings.startNewChatConfirmationText);
  };

  return (
    <LanguageContext.Provider value={{ 
      languageCode, 
      loadingText, 
      errorMessage, 
      suggestMessage1, 
      suggestMessage2, 
      inputPlaceholder, 
      heroText, 
      sendButtonText, 
      startNewChatButtonText, 
      startNewChatConfirmationText,
      changeLanguage // Add changeLanguage to context
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
