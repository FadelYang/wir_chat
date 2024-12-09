import react from 'react';
import MainInputMessage from '../molecules/MainInputMessage';
import MainPageLogo from '../molecules/MainPageLogo';
import remarkGfm from 'remark-gfm';
import remakerBreaks from 'remark-breaks';

const WindowChatArea = ({
  conversations,
}) => {
  return (
    <div className={`flex flex-col ${conversations.length == 0 ? 'my-auto' : 'flex-grow'}`}>
      <MainPageLogo conversations={conversations}/>
      <div className={`${conversations.length === 0 ? 'hidden' : 'flex mt-10'}  flex-col chat-area flex-grow px-7 gap-10 sm:px-28 xl:px-56`}>
        {conversations.map((message, index) => (
          <div key={index} className={MessageChannel.isUser ? 'ml-auto bg-slate-100 py-2 px-4 rounded-2xl' : 'bot-message'}>
            {message.isUser ? (
              <ReactMarkdown remarkPlugins={[remarkGfm, remakerBreaks]}>{message.text}</ReactMarkdown>

            ) : (
              <>
                <ReactMarkdown remarkPlugins={[remarkGfm, remakerBreaks]}>{message.text}</ReactMarkdown>
                <div ref={latestBotMessage}></div>
              </>
            )}
            {isRequestPending && (
              <>
                <div className='bot-message' ref={bottomOfChatArea}>{loadingText}.</div>
              </>
            )}
          </div>
        ))}
      </div>
      <MainInputMessage />
    </div>
  );
};

export default WindowChatArea;