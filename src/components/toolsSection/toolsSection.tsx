import React, { ChangeEvent } from 'react';
import { Box, Paper, Slider, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from 'react-i18next';
import '@/i18n';
import ValidateSection from "@/businessLogic/validateSection";

interface ToolsSectionProps {
    onWordsChanged: (words: string) => void;
    inputWords: string
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ onWordsChanged, inputWords }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const words = e.target.value;
        onWordsChanged(words);
    };

    const { t } = useTranslation();
    return (
        <Paper elevation={4} className="h-full">
            <div className="p-6">
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label={t("word")}
                            multiline
                            defaultValue=""
                            fullWidth
                            minRows={4}
                            maxRows={10}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} className="mt-6">
                        <Box>
                            <Typography>{t("speed")}</Typography>
                            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" min={10} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ValidateSection inputString={inputWords}/>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
};

export default ToolsSection;
