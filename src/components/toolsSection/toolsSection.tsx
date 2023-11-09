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
import {AutomatonTypeContext} from "@/contexts/automatonTypeContext";
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
            <Grid container spacing={2}>
                <Grid item xs={12}>
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
                {automatonType === 'finite' && (
                    <Grid item xs={12}>
                        <Typography fontSize={18} fontWeight={"bold"}>
                            {`${t(`${automatonType}AutomatonRE`)}`}
                        </Typography>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label={t("word")}
                        defaultValue=""
                        fullWidth
                        minRows={1}
                        maxRows={1}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography >{t("speed")}</Typography>
                    <Slider
                        value={automatonSpeed}
                        aria-label="Default"
                        valueLabelDisplay="auto"
                        min={10}
                        onChange={(e, newValue) => handleAutomatonSpeedChange(e, newValue)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ValidateSection
                        inputString={inputWords.toLowerCase()}
                        onFinishedValidation={onFinishedValidation}
                    />
                </Grid>
            </Grid>
        </AutomatonTypeContext.Provider>
    );
};

export default ToolsSection;
