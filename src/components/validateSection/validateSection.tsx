import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useValidationHistory } from '@/businessLogic/validationHistory';
import { validateString } from '@/businessLogic/validateString';
import '@/i18n';

interface ValidateSectionProps {
    inputString: string;
}

const speak = (message: string): void => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
};

const validateAndSpeak = (inputString: string, t: (key: string) => string): void => {
    const isValid = validateString(inputString);
    const message = isValid ? t('accept') : t('reject');
    speak(message);
};

const ValidateSection: React.FC<ValidateSectionProps> = ({ inputString }) => {
    const { t } = useTranslation();
    const { addValidationToHistory } = useValidationHistory();
    const [validationResult, setValidationResult] = useState('');

    const handleValidate = () => {
        if (inputString && inputString.length > 0) {
            validateAndSpeak(inputString, t);
            addValidationToHistory(inputString, validationResult);
        } else {
            setValidationResult(t('validInput'));
        }
    };

    return (
        <>
            <div className="p-6">
                <Button variant="outlined" fullWidth onClick={handleValidate}>
                    {t('validate')}
                </Button>
                <div>{validationResult}</div>
            </div>
        </>
    );
};

export default ValidateSection;
