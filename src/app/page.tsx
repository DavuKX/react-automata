"use client"
import NavBar from "@/components/navBar/navBar";
import ToolsSection from "@/components/toolsSection/toolsSection";
import Grid from '@mui/material/Unstable_Grid2'
import AutomatonGraph from "@/components/automatonGraph/automatonGraph";
import React, { useState } from 'react';
import ValidateSection from "@/businessLogic/validateSection";
import { validateString } from "@/businessLogic/validateString";

export default function Home() {
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
        <div className='h-screen w-full bg-white'>
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
        </div>
    );
}
