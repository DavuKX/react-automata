import React from 'react';
import {useState} from 'react';
import {LanguageIcon} from "@heroicons/react/24/solid";
import {useTranslation} from 'react-i18next';
import '@/i18n'
import {LanguageMenu} from "@/components/navBar/languajeMenu";


type Props = {};

const NavBar = (props: Props) => {
    const flexBetween = "flex justify-between items-center";
    const {t, i18n} = useTranslation();
    const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language).then(r => r);
        setLanguageMenuOpen(false);
    };

    const toggleLanguageMenu = () => {
        setLanguageMenuOpen(!isLanguageMenuOpen);
    };

    return (
        <div className={`${flexBetween} top-0 py-6 bg-white text-black w-full`}>
            <div className="mx-auto">
                <h1 className="text-center text-2xl font-bold">{t("title")}</h1>
            </div>
            <div className="relative">
                <div className="mr-8 w-6 h-6 p-1 cursor-pointer" onClick={toggleLanguageMenu}>
                    <LanguageIcon className="h-6 w-6 text-black"/>
                </div>
                {isLanguageMenuOpen && <LanguageMenu changeLanguage={changeLanguage}/>}
            </div>
        </div>
    );
};

export default NavBar;