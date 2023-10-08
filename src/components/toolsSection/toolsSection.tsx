import React, { ChangeEvent } from 'react';
import { Box, Button, Paper, Slider, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from 'react-i18next';
import '@/i18n';

interface ToolsSectionProps {
    onWordsChanged: (words: string) => void;
}

const ToolsSection: React.FC<ToolsSectionProps> = ({ onWordsChanged }) => {
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
                    <Grid item>
                        <Box>
                            <Typography>{t("speed")}</Typography>
                            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" min={10} />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" fullWidth>{t("run")}</Button>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
};

export default ToolsSection;
