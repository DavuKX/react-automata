import React, {useState} from 'react';
import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import '@/i18n';
import {validateAndSpeak} from "@/components/validateSection/helpers";

interface ValidateSectionProps {
    inputString: string;
    validationSpeed: number;
    onFinishedValidation: (word: string, result: string) => void;
    onStateChanged: (currentState: string, newState: string) => void
}

const ValidateSection: React.FC<ValidateSectionProps> = ({inputString, validationSpeed, onFinishedValidation, onStateChanged}) => {
    const {t} = useTranslation();
    const [validationResult, setValidationResult] = useState('');

    const handleValidate = () => {
        if (inputString && inputString.length > 0) {
            validateAndSpeak(inputString, t, validationSpeed, onStateChanged)
                .then(validationResult => onFinishedValidation(inputString, validationResult));
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
