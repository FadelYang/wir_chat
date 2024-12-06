import wirLogo from '/logo.png';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useEffect, useState } from 'react';
import chinaFlag from '/flag/china.png';
import indonesiaFlag from '/flag/flag.png';
import japanFlag from '/flag/japan.png';
import unitedKingdomFlag from '/flag/united-kingdom.png';

export default function ({ handleSelectedLanguage, startNewChatButtonText, startNewChatConfirmationText }) {
  const clearChat = (e) => {
    e.preventDefault();

    const confirmed = window.confirm(`${startNewChatConfirmationText}`);

    if (confirmed) {
      localStorage.removeItem('conversations');
      localStorage.removeItem('sessionId');
      window.location.reload();
    }
  };

  const languages = [
    { imageSize: '25px', flag: indonesiaFlag, name: 'Indonesian', code: 'id' },
    { imageSize: '25px', flag: chinaFlag, name: 'Chinese', code: 'zhCn' },
    { imageSize: '25px', flag: japanFlag, name: 'Japanese', code: 'ja' },
    { imageSize: '25px', flag: unitedKingdomFlag, name: 'English', code: 'en' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('languageCode');
    return languages.find(language => language.code === savedLanguage) || languages[0];
  });

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage !== selectedLanguage) {
      const confirmed = window.confirm(
        `${startNewChatConfirmationText}`
      );
      if (confirmed) {
        localStorage.removeItem('conversations');
        localStorage.removeItem('sessionId');
        localStorage.removeItem('languageCode');

        setSelectedLanguage(newLanguage);

        localStorage.setItem('languageCode', newLanguage.code);
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    handleSelectedLanguage();
  }, [selectedLanguage]);

  return (
    <>
      <div className="sticky top-0 z-10 px-5 py-5 bg-white border border-b-gray-300 md:px-20 ">
        <div className='container flex mx-auto'>
          <div className='flex items-center gap-2'>
            <img src={wirLogo} className='w-14' />
            <div className='hidden md:block'>WIR Chat</div>
          </div>
          <div className='flex items-center gap-1 ms-auto'>
            {/* Language seleciton dropdowm */}
            <div className="">
              <Listbox value={selectedLanguage} onChange={handleLanguageChange}>
                <div className="relative">
                  <ListboxButton className="px-4 py-2 bg-gray-200 rounded-md">
                    <div className='flex gap-1'>
                      <img src={selectedLanguage.flag} width={selectedLanguage.imageSize}></img>
                      <div className='hidden md:block'>{selectedLanguage.name}</div>
                    </div>
                  </ListboxButton>
                  <ListboxOptions className="absolute z-50 mt-1 overflow-auto bg-white rounded-md shadow-lg min-w-48">
                    {languages.map((language, index) => (
                      <ListboxOption
                        key={index}
                        value={language}
                        className={({ active, selected }) =>
                          `${active ? 'text-white bg-red-500' : ''} ${selected ? 'font-semibold' : ''} cursor-pointer select-none relative py-2 pl-10 pr-4`
                        }
                      >
                        {({ selected }) => (
                          <>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg
                                  className="w-5 h-5 text-red-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.293 4.293a1 1 0 0 1 1.414 1.414l-9 9a1 1 0 0 1-1.414-1.414l9-9z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                            <div className='flex gap-1'>
                              <img src={language.flag} width={language.imageSize}></img>
                              <div className=''>{language.name}</div>
                            </div>
                          </>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
            <button onClick={clearChat} className='px-5 py-2 text-white bg-black rounded-md hover:bg-gray-900 hover:cursor-pointer'>{startNewChatButtonText}</button>
          </div>
        </div>
      </div>
    </>
  );
};