import { Button } from "@headlessui/react";
import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const SuggestedMessage = ({
  conversations,
  onClick
}) => {
  const {
    suggestMessage1,
    suggestMessage2,
    languageCode
  } = useContext(LanguageContext);

  return (
    <div className={`flex justify-center gap-2 flex-wrap mt-0 md:mt-3 px-7 ${conversations.length === 0 ? 'block' : 'hidden'}`}>
      <Button
        className='template-question'
        value={suggestMessage1}
        onClick={onClick}
        children={
          languageCode === 'id' || languageCode === 'en'
            ? `${suggestMessage1.substring(0, 25)}...`
            : `${suggestMessage1.substring(0, 10)}...`
        }
      />
      <Button
        className='template-question'
        value={suggestMessage2}
        onClick={onClick}
        children={
          languageCode === 'id' || languageCode === 'en'
            ? `${suggestMessage1.substring(0, 25)}...`
            : `${suggestMessage1.substring(0, 10)}...`
        }
      />
    </div>
  );
};

export default SuggestedMessage;