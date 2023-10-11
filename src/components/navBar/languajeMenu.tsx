import React from "react";

interface LanguageMenuProps {
    changeLanguage: (language: string) => void
}

export const LanguageMenu: React.FC<LanguageMenuProps> = ({ changeLanguage }) => {
    return (
        <div className="mr-6 absolute top-8 right-0 mt-2 bg-white border border-gray-300 rounded shadow-md z-30 text-black">
            <button onClick={() => changeLanguage("en")} className="block px-4 py-2 hover:bg-gray-100">EN</button>
            <button onClick={() => changeLanguage("es")} className="block px-4 py-2 hover:bg-gray-100">ES</button>
            <button onClick={() => changeLanguage("pt")} className="block px-4 py-2 hover:bg-gray-100">PT</button>
        </div>
    );
};