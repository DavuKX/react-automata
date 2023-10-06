import React, { useEffect, useState } from 'react';
import { Button, Paper } from '@mui/material';
import { validateString } from './validateString';

export const ValidateSection = ({ inputString }) => {
  const [validationResult, setValidationResult] = useState('');
  const [spokenMessage, setSpokenMessage] = useState('');

  useEffect(() => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(spokenMessage);
    synth.speak(utterance);
  }, [spokenMessage]);

  const handleValidate = () => {
    if (inputString && inputString.length > 0) {
      const isValid = validateString(inputString);
      const message = isValid ? 'String accepted' : 'String rejected';
      setValidationResult(message);
      setSpokenMessage(message);
    } else {
      setValidationResult('Please enter a valid input string.');
      setSpokenMessage('Please enter a valid input string.');
    }
  };      

  return (
    <Paper elevation={4} className="h-full">
      <div className="p-6">
        <Button variant="outlined" fullWidth onClick={handleValidate}>
          Validate string
        </Button>
        <div>{validationResult}</div>
      </div>
    </Paper>
  );
};

export default ValidateSection;
