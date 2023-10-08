"use client"
import NavBar from "@/components/navBar/navBar";
import ToolsSection from "@/components/toolsSection/toolsSection";
import Grid from '@mui/material/Unstable_Grid2'
import AutomatonGraph from "@/components/automatonGraph/automatonGraph";
import React, {useState} from 'react';
import {graphData} from "@/constans";
import {useValidationHistory} from "@/businessLogic/validationHistory";
import {ValidationHistoryComponent} from "@/components/validationHistoryComponent/validationHistoryComponent";

export default function Home() {
    const [inputWords, setInputWords] = useState('');
    const {validationHistory, addValidationToHistory} = useValidationHistory();

    const handleWordsChange = (words: string) => {
        setInputWords(words);
    };

    return (
        <div className='h-screen w-full bg-white'>
            <NavBar/>
            <Grid container spacing={2} style={{margin: '0 20px'}}>
                <Grid xs={3}>
                    <ToolsSection
                        onWordsChanged={handleWordsChange}
                        inputWords={inputWords}
                        onFinishedValidation={addValidationToHistory}
                    />
                </Grid>
                <Grid xs={9}>
                    <AutomatonGraph graphData={graphData}/>
                </Grid>
                <Grid xs={12} className="h-full">
                    <ValidationHistoryComponent history={validationHistory}/>
                </Grid>
            </Grid>
        </div>
    );
}
