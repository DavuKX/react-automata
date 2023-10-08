import React, {useEffect, useState} from 'react';
import {Button, Paper} from '@mui/material';
import {validateString} from './validateString';
import {useTranslation} from 'react-i18next';
import '@/i18n'

interface ValidateSectionProps {
    inputString: string
}

export const ValidateSection: React.FC<ValidateSectionProps> = ({inputString}) => {
    const {t} = useTranslation();
    const [validationResult, setValidationResult] = useState('');
    const [spokenMessage, setSpokenMessage] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        if (isSpeaking) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(spokenMessage);
            synth.speak(utterance);

            utterance.onend = () => {
                setIsSpeaking(false);
            };
        }
    }, [isSpeaking, spokenMessage]);

    const handleValidate = () => {
        if (inputString && inputString.length > 0) {
            const isValid = validateString(inputString);
            const message = isValid ? t("accept") : t("reject");
            setValidationResult(message);
            setSpokenMessage(message);

            if (!isSpeaking) {
                setIsSpeaking(true);
            } else {
                setTimeout(() => {
                    setIsSpeaking(true);
                }, 1000);
            }
        } else {
            setValidationResult(t("validInput"));
        }
    };

    return (

        <Paper elevation={4} className="h-full">
            <div className="p-6">
                <Button variant="outlined" fullWidth onClick={handleValidate}>
                    {t("validate")}
                </Button>
                <div>{validationResult}</div>
            </div>
        </Paper>
    );
};

export default ValidateSection;
