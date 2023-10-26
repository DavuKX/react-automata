import React, {FC, useState} from 'react';
import {useValidationHistory} from "@/businessLogic/validationHistory";
import NavBar from "@/components/navBar/navBar";
import Grid from "@mui/material/Unstable_Grid2";
import AutomatonGraph from "@/components/automatonGraph/automatonGraph";
import {finiteAutomatonGraphData} from "@/constans";
import ToolsSection from "@/components/toolsSection/toolsSection";
import {ValidationHistoryComponent} from "@/components/validationHistoryComponent/validationHistoryComponent";

export default function Home(): JSX.Element {
    const [inputWords, setInputWords] = useState('');
    const {validationHistory, addValidationToHistory} = useValidationHistory();

    const handleWordsChange = (words: string): void => {
        setInputWords(words);
    };

    return (
        <div className='w-full bg-white'>
            <NavBar/>
            <Grid container spacing={2} style={{margin: '0 20px'}}>
                <Grid xs={12}>
                    <AutomatonGraph graphData={finiteAutomatonGraphData}/>
                </Grid>
                <Grid lg={6} md={12} xs={12}>
                    <ToolsSection
                        onWordsChanged={handleWordsChange}
                        inputWords={inputWords}
                        onFinishedValidation={addValidationToHistory}
                    />
                </Grid>
                <Grid lg={6} md={12} xs={12}>
                    <ValidationHistoryComponent history={validationHistory}/>
                </Grid>
            </Grid>
        </div>
    );
};