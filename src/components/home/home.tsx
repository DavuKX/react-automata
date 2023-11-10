import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import AutomatonGraph from "@/components/automatonGraph/automatonGraph";
import {finiteAutomatonGraphData, pushdownAutomatonGraphData, turingMachineGraphData} from "@/constans";
import ToolsSection from "@/components/toolsSection/toolsSection";
import {ValidationHistoryComponent} from "@/components/validationHistoryComponent/validationHistoryComponent";
import {validationResultType} from "@/types/validationResultType";
import {AutomatonTypes} from "@/types/automaton";
import {v4 as uuidv4} from 'uuid';
import {useCookies} from 'next-client-cookies';
import {ValidationEntry} from "@/Interfaces/validationEntry";
import {Box, Paper} from "@mui/material";

const automatonGraphData = {
    finite: finiteAutomatonGraphData,
    pushdown: pushdownAutomatonGraphData,
    turing: turingMachineGraphData
}

export default function Home(): JSX.Element {
    const [inputWords, setInputWords] = useState('');
    const [graphData, setGraphData] = useState(finiteAutomatonGraphData);
    const [validationResult, setValidationResult] = useState<validationResultType>({
        result: false,
        path: [],
        word: ''
    } as validationResultType);
    const [automatonSpeed, setAutomatonSpeed] = useState<number[] | number>(50)
    const [validationHistory, setValidationHistory] = useState<ValidationEntry[]>([] as ValidationEntry[])
    const cookies = useCookies();

    useEffect(() => {
        if (!cookies.get('uuid')) {
            cookies.set('uuid', uuidv4())
        }
    }, [cookies])

    useEffect(() => {
        loadValidations().then(r => r)
    }, [])

    const handleWordsChange = (words: string): void => {
        setInputWords(words);
    };

    const handleFinishedValidation = (validationResult: validationResultType) => {
        setValidationResult(validationResult)
        loadValidations().then(r => r)
    }

    const handleAutomatonTypeChanged = (automatonType: AutomatonTypes) => {
        setGraphData(automatonGraphData[automatonType])
    }

    const loadValidations = async () => {
        const urlParams = new URLSearchParams([['uuid', cookies.get('uuid') as string]]);

        const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/api/validations?' + urlParams.toString();
        const validations = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json() as Promise<ValidationEntry[]>);

        setValidationHistory(validations)
    }

    return (
        <Box
            sx={{
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
                padding: '10px',
                height: 'calc(100vh - 130px)',
            }}
        >
            <Grid
                container
                direction="row"
                justifyContent="space-around"
                spacing={2}
                height="100%"
            >
                <Grid item md={4} height="100%">
                    <Paper className="p-4 h-full">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <ToolsSection
                                    onWordsChanged={handleWordsChange}
                                    inputWords={inputWords}
                                    onFinishedValidation={handleFinishedValidation}
                                    onAutomatonTypeChanged={handleAutomatonTypeChanged}
                                    onAutomatonSpeedChanged={setAutomatonSpeed}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ValidationHistoryComponent history={validationHistory}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item md={8} height="100%">
                    <Paper className="p-4 h-full">
                        <AutomatonGraph
                            graphData={graphData}
                            validationResult={validationResult}
                            automatonSpeed={Number(automatonSpeed)}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};