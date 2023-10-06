import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { LanguageIcon } from "@heroicons/react/24/solid";
import { useTranslation} from 'react-i18next';
import '@/i18n'


type Props = {};

const LanguageMenu = ({ changeLanguage }) => {
  return (
    <div className="mr-6 absolute top-8 right-0 mt-2 bg-white border border-gray-300 rounded shadow-md">
      <button onClick={() => changeLanguage("en")} className="block px-4 py-2 hover:bg-gray-100">EN</button>
      <button onClick={() => changeLanguage("es")} className="block px-4 py-2 hover:bg-gray-100">ES</button>
      <button onClick={() => changeLanguage("pt")} className="block px-4 py-2 hover:bg-gray-100">PT</button>
    </div>
  );
};

const NavBar = (props: Props) => {
  const flexBetween = "flex justify-between items-center";
  const { t, i18n } = useTranslation();
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setLanguageMenuOpen(false); 
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!isLanguageMenuOpen);
  };

  return (
    <div className={`${flexBetween} top-0 w-full py-6 bg-white text-black w-full`}>
      <div className="mx-auto">
        <h1 className="text-center text-2xl font-bold">{t("title")}</h1>
      </div>
      <div className="relative">
        <div className="mr-8 w-6 h-6 p-1 cursor-pointer" onClick={toggleLanguageMenu}>
          <LanguageIcon className="h-6 w-6 text-black" />
        </div>
        {isLanguageMenuOpen && <LanguageMenu changeLanguage={changeLanguage} />}
      </div>
    </div>
  );
};

// NavBar.propTypes = {

// };

export default NavBar;