import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Paper, Slider, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from 'react-i18next';
import '@/i18n'

const ToolsSection = ({}) => {
    const { t } = useTranslation();
    return (
        <Paper elevation={4} className="h-full">
            <div className="p-6">
                <Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label={t("word")}
                            multiline
                            defaultValue=""
                            fullWidth
                            minRows={4}
                            maxRows={10}
                        />
                    </Grid>
                    <Grid>
                        <Box>
                            <Typography>{t("speed")}</Typography>
                            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" min={10}/>
                        </Box>
                    </Grid>
                    <Grid xs={12}>
                        <Button variant="outlined" fullWidth>{t("run")}</Button>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
};

ToolsSection.propTypes = {

};

export default ToolsSection;