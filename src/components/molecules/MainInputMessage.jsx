import React, { useContext } from 'react';
import Textarea from '../atoms/Textarea';
import Button from '../atoms/Button';
import { LanguageContext } from '../../context/LanguageContext';

const MainInputMessage = ({
  inputValue,
  onSendMessageClick,
  onMessageChange,
  onEnterKeyDown,
  conversations
}) => {
  const {
    inputPlaceholder,
    sendButtonText
  } = useContext(LanguageContext);

  return (
    <div className={`sticky bottom-0 pt-3 pb-1 ${!conversations ? 'my-auto' : ''}`}>
      <form className='flex justify-center gap-1 mx- 1 sm:mx-10'>
        <Textarea
          className='w-full px-5 py-2 border border-black resize-none box box-orer xl:w-1/2 sm:w-2/3 rounded-xl h-11 max-h-36'
          value={inputValue}
          placeholder={inputPlaceholder}
          type='text'
          id='messageInputTextareaComponent'
          onChange={onMessageChange}
          onKeyDown={onEnterKeyDown}
        />
        {
          inputValue ? (
            <Button
              className='self-end inline-block px-4 text-white bg-black item-start hover:bg-gray-900 rounded-xl h-11 whitespace-nowrap'
              onClick={onSendMessageClick}
              children={sendButtonText}
              type='submit'
            />
          ) : (
            <Button
              className='items-start self-end inline-block px-4 text-white bg-black hover:bg-gray-900 rounded-xl h-11 whitespace-nowrap'
              children={sendButtonText}
            />
          )
        }
      </form>
    </div>
  );
};

export default MainInputMessage;