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
    const [currentNodes, setCurrentNodes] = useState({
        currentState: "",
        newState: "",
    })

    const handleWordsChange = (words: string) => {
        setInputWords(words);
    };

    return (
        <div className='w-full bg-white h-screen'>
            <NavBar/>
            <Grid container spacing={2} style={{margin: '0 20px'}}>
                <Grid xs={12}>
                    <AutomatonGraph graphData={graphData} state={currentNodes}/>
                </Grid>
                <Grid lg={6} md={12} xs={12}>
                    <ToolsSection
                        onWordsChanged={handleWordsChange}
                        inputWords={inputWords}
                        onFinishedValidation={addValidationToHistory}
                        onStateChanged={(currentState, newState) => setCurrentNodes({
                            currentState: currentState,
                            newState: newState
                        })}
                    />
                </Grid>
                <Grid lg={6} md={12} xs={12}>
                    <ValidationHistoryComponent history={validationHistory}/>
                </Grid>
            </Grid>
        </div>
    );
}
