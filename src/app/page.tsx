"use client"
import NavBar from "@/components/navBar/navBar";
import ToolsSection from "@/components/toolsSection/toolsSection";
import Grid from '@mui/material/Unstable_Grid2'
import AutomatonGraph from "@/components/automatonGraph/automatonGraph";
import { useTranslation} from 'react-i18next';
import React, { useState } from 'react';
import ValidateSection from "@/businessLogic/validateSection";
import { validateString } from "@/businessLogic/validateString";
import '@/i18n'

export default function Home() {
    const {t, i18n} = useTranslation();
    const [validationResult, setValidationResult] = useState('');
    const [inputWords, setInputWords] = useState('');

    const handleValidate = () => {
        const isValid = validateString(inputWords);
        setValidationResult(isValid ? 'String accepted' : 'String rejected');
    };

    const handleWordsChange = (words) => {
        setInputWords(words);
    };

    return (
        <div className='h-screen w-full'>
            <button onClick={() => changeLanguage("en")}>EN</button>
            <button onClick={() => changeLanguage("es")}>ES</button>
            <button onClick={() => changeLanguage("pt")}>PT</button>
            <hr />
            <NavBar />
            <Grid container spacing={2}>
                <Grid xs={3}>
                    <ToolsSection onWordsChanged={handleWordsChange} />
                    <ValidateSection inputString={inputWords}/>
                    <button onClick={handleValidate}>Validate string</button>
                    <div>{validationResult}</div>
                </Grid>
                <Grid xs={9}>
                    <AutomatonGraph />
                </Grid>
                <Grid xs={12}></Grid>
            </Grid>
            <div>{t("title")}</div>
            
        </div>
    );
}
