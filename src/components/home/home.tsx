import React, {useState} from 'react';
import NavBar from "@/components/navBar/navBar";
import Grid from "@mui/material/Unstable_Grid2";
import AutomatonGraph from "@/components/automatonGraph/automatonGraph";
import {finiteAutomatonGraphData, pushdownAutomatonGraphData} from "@/constans";
import ToolsSection from "@/components/toolsSection/toolsSection";
import {ValidationHistoryComponent} from "@/components/validationHistoryComponent/validationHistoryComponent";
import {validationResultType} from "@/types/validationResultType";
import {AutomatonTypes} from "@/types/automaton";

const automatonGraphData = {
    finite: finiteAutomatonGraphData,
    pushdown: pushdownAutomatonGraphData
}

export default function Home(): JSX.Element {
    const [inputWords, setInputWords] = useState('');
    const [graphData, setGraphData] = useState(finiteAutomatonGraphData);
    const [validationResult, setValidationResult] = useState<validationResultType>({result: false, path: [], word: ''} as validationResultType);
    const [automatonSpeed, setAutomatonSpeed] = useState<number[] | number>(50)

    const handleWordsChange = (words: string): void => {
        setInputWords(words);
    };

    const handleFinishedValidation = (validationResult: validationResultType) => {
        setValidationResult(validationResult)
    }

    const handleAutomatonTypeChanged = (automatonType: AutomatonTypes) => {
        setGraphData(automatonGraphData[automatonType])
    }

    return (
        <div className='w-full bg-white'>
            <NavBar/>
            <Grid container spacing={2} style={{margin: '0 20px'}}>
                <Grid xs={12}>
                    <AutomatonGraph
                        graphData={graphData}
                        validationResult={validationResult}
                        automatonSpeed={Number(automatonSpeed)}
                    />
                </Grid>
                <Grid lg={6} md={12} xs={12}>
                    <ToolsSection
                        onWordsChanged={handleWordsChange}
                        inputWords={inputWords}
                        onFinishedValidation={handleFinishedValidation}
                        onAutomatonTypeChanged={handleAutomatonTypeChanged}
                        onAutomatonSpeedChanged={setAutomatonSpeed}
                    />
                </Grid>
                <Grid lg={6} md={12} xs={12}>
                    <ValidationHistoryComponent history={[]}/>
                </Grid>
            </Grid>
        </div>
    );
};