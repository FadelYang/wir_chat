import react from 'react';
import MainLogo from '../atoms/MainLogo';

const MainPageLogo = ({ conversations, heroText }) => {
  return (
    <>
      <div className={`flex flex-col ${conversations.length == 0 ? 'my-auto' : 'hidden'}`}>
        <div className='flex justify-center main-logo'>
          <MainLogo className='relative w-56' />
        </div>
        <h1 className='mb-3 text-2xl font-bold sm:text-3xl'>{heroText}</h1>
      </div>
    </>
  );
};

export default MainPageLogo