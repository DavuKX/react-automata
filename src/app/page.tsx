"use client"
import NavBar from "@/components/navBar/navBar";
import ToolsSection from "@/components/toolsSection/toolsSection";
import Grid from '@mui/material/Unstable_Grid2'
import AutomatonGraph from "@/components/automatonGraph/automatonGraph";
import React, {useState} from 'react';
import {validateString} from "@/businessLogic/validateString";
import {graphData} from "@/constans";

export default function Home() {
    const [validationResult, setValidationResult] = useState('');
    const [inputWords, setInputWords] = useState('');

    const handleValidate = () => {
        const isValid = validateString(inputWords);
        setValidationResult(isValid ? 'String accepted' : 'String rejected');
    };

    const handleWordsChange = (words: string) => {
        setInputWords(words);
    };

    return (
        <div className='h-screen w-full bg-white'>
            <NavBar/>
            <Grid container spacing={2}>
                <Grid xs={3}>
                    <ToolsSection onWordsChanged={handleWordsChange} inputWords={inputWords}/>
                </Grid>
                <Grid xs={9}>
                    <AutomatonGraph graphData={graphData}/>
                </Grid>
                <Grid xs={12}></Grid>
            </Grid>
        </div>
    );
}
