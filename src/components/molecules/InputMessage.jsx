import React from 'react';
import Textarea from '../atoms/Textarea';

const InputMessage = ({
  inputValue,
  inputButtonText,
  inputPlaceholder,
  handleInputButtonClick
}) => {
  <>
    <Textarea
      className='w-full px-5 py-2 border border-black resize-none box-orer xl:w-2/3 rounded-xl h-11 max-h-36'
      value={inputValue}
      placeholder={inputPlaceholder}
    />
    {
      inputValue ? (
        <Button
          className='self-end inline-block px-4 text-white bg-black item-start hover:bg-gray-900 rouned-xl h-11 whitespace-nowrap'
          onClick={handleInputButtonClick}
          children={inputButtonText}
          type='submit'
        />
      ) : (
        <Button
          className='items-start self-end inline-block px-4 text-white bg-black hover:bg-gray-900 rounded-xl h-11 whitespace-nowrap'
          children={inputButtonText}
        />
      )
    }
  </>;
};