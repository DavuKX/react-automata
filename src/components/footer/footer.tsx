import React from 'react';
import PropTypes from 'prop-types';
import {Box, Container, Link, Paper, Typography} from "@mui/material";

const Footer = () => {
    return (
        <Paper
            sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                height: '70px',
            }}
        >
            <Box
                sx={{
                    p: 2,
                }}
                component="footer"
            >
                <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Copyright © "}
                        {new Date().getFullYear()}
                        {" Duván Navarro | Anuarth Rincón | Dania Sarmiento | Universidad del Magdalena"}
                    </Typography>
                </Container>
            </Box>
        </Paper>
    );
};

export default Footer;