import React, {ChangeEvent, useState} from 'react';
import {
    Box,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Slider,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useTranslation} from 'react-i18next';
import '@/i18n';
import ValidateSection from "@/components/validateSection/validateSection";
import FormControl from '@mui/material/FormControl';
import {AutomatonTypeContext} from "@/Contexts/automatonTypeContext";
import {AutomatonTypes} from "@/types/automaton";
import {validationResultType} from "@/types/validationResultType";

interface ToolsSectionProps {
    onWordsChanged: (words: string) => void;
    inputWords: string,
    onFinishedValidation: (result: validationResultType) => void;
    onAutomatonTypeChanged: (automatonType: AutomatonTypes) => void;
    onAutomatonSpeedChanged: (automatonSpeed: number[] | number) => void;
}

interface StackOperation {
    stack: string[];
}
  
const ToolsSection: React.FC<ToolsSectionProps> = ({onWordsChanged, inputWords, onFinishedValidation, onAutomatonTypeChanged, onAutomatonSpeedChanged}) => {
    const [automatonSpeed, setAutomatonSpeed] = useState(50)
    const [automatonType, setAutomatonType] = useState<AutomatonTypes>("finite")

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const words = e.target.value;
        onWordsChanged(words);
    };

    const handleAutomatonSpeedChange = (e: Event, newValue: number | number[]) => {
        if (typeof newValue === 'number')
            setAutomatonSpeed(newValue)
            onAutomatonSpeedChanged(newValue)
    };

    const {t} = useTranslation();
    const onChangeAutomatonType = (e: SelectChangeEvent) => {
        setAutomatonType(e.target.value as AutomatonTypes)
        onAutomatonTypeChanged(e.target.value as AutomatonTypes)
    };


    return (
        <AutomatonTypeContext.Provider value={{ state: automatonType, setState: setAutomatonType }}>
            <Paper elevation={4} className="h-72">
                <div className="p-6">
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography className='pb-4' fontSize={18} fontWeight={"bold"} style={{marginBottom: '18px'}}>
                                        {automatonType === 'finite' && `${t(`${automatonType}AutomatonRE`)}`}
                                        {automatonType === 'pushdown' && <div style={{height: '24px'}}></div>}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="automaton-select-label">{t("automatonSelectLabel")}</InputLabel>
                                        <Select
                                            labelId="automaton-select-label"
                                            id="automaton-select"
                                            value={automatonType}
                                            label="Automaton"
                                            className={"w-full h-8"}
                                            onChange={onChangeAutomatonType}
                                        >
                                            <MenuItem value="finite">{t("finiteAutomatonLabel")}</MenuItem>
                                            <MenuItem value="pushdown">{t("pushdownAutomatonLabel")}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <TextField
                                id="outlined-multiline-static"
                                label={t("word")}
                                multiline
                                defaultValue=""
                                fullWidth
                                minRows={1}
                                maxRows={2}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} className="mt-6">
                            <Box>
                                <Typography >{t("speed")}</Typography>
                                <Slider
                                    value={automatonSpeed}
                                    aria-label="Default"
                                    valueLabelDisplay="auto"
                                    min={10}
                                    onChange={(e, newValue) => handleAutomatonSpeedChange(e, newValue)}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <ValidateSection
                                inputString={inputWords.toLowerCase()}
                                onFinishedValidation={onFinishedValidation}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </AutomatonTypeContext.Provider>
    );
};

export default ToolsSection;
