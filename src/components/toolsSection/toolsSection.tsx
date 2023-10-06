import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Paper, Slider, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const ToolsSection = ({ onWordsChanged }) => {
    const handleInputChange = (e) => {
        const words = e.target.value;
        onWordsChanged(words);
    };
    
    return (
        <Paper elevation={4} className="h-full">
            <div className="p-6">
                <Grid>
                    <Grid xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Ingrese las palabras"
                            multiline
                            defaultValue=""
                            fullWidth
                            minRows={4}
                            maxRows={10}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid>
                        <Box>
                            <Typography>Automata speed</Typography>
                            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" min={10}/>
                        </Box>
                    </Grid>
                    <Grid xs={12}>
                        <Button variant="outlined" fullWidth>Run Automata</Button>
                    </Grid>
                </Grid>
            </div>
        </Paper>
    );
};

ToolsSection.propTypes = {

};

export default ToolsSection;