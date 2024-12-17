import react, { useContext } from 'react';
import MainLogo from '../atoms/MainLogo';
import { LanguageContext } from '../../context/LanguageContext';

const MainPageLogo = ({ conversations }) => {
  const {
      heroText
  } = useContext(LanguageContext);

  return (
    <>
      <div className={`flex flex-col ${conversations.length == 0 ? 'my-auto' : 'hidden'}`}>
        <div className='flex justify-center main-logo'>
          <MainLogo className='relative w-56' />
        </div>
        <h1 className='mb-3 text-2xl font-bold text-center sm:text-3xl'>{heroText}</h1>
      </div>
    </>
  );
};

export default MainPageLogo;