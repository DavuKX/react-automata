import React from 'react';
import { useState } from 'react';
import { LanguageIcon } from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { LanguageMenu } from "@/components/navBar/languajeMenu";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";

type Props = {};

const NavBar = (props: Props) => {
    const flexBetween = "flex justify-between items-center";
    const { t, i18n } = useTranslation();
    const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language).then(r => r);
        setLanguageMenuOpen(false);
    };

    const toggleLanguageMenu = () => {
        setLanguageMenuOpen(!isLanguageMenuOpen);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Automaton Simulator
                    </Typography>
                    <div className="relative">
                        <div className="mr-8 w-6 h-6 p-1 cursor-pointer" onClick={toggleLanguageMenu}>
                            <LanguageIcon className="h-6 w-6 text-white"/>
                        </div>
                        {isLanguageMenuOpen && <LanguageMenu changeLanguage={changeLanguage}/>}
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
