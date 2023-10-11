import React, {useState} from 'react';
import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import '@/i18n';
import {speak, validateString} from "@/components/validateSection/helpers";

interface ValidateSectionProps {
    inputString: string;
    validationSpeed: number;
    onFinishedValidation: (word: string, result: string) => void;
    onStateChanged: (currentState: string, newState: string) => void
}

const ValidateSection: React.FC<ValidateSectionProps> = ({inputString, validationSpeed, onFinishedValidation, onStateChanged}) => {
    const {t} = useTranslation();
    const [validInputMessageVisible, setValidInputMessageVisible] = useState(false);

    const validateAndSpeak = async (inputString: string, t: (key: string) => string, validationSpeed: number, onStateChanged: (currentState: string, newState: string) => void): Promise<string> => {
        const isValid = validateString(inputString, validationSpeed, onStateChanged);
        const message = await isValid ? 'accept' : 'reject';
        speak(t(message));
        return message;
    };

    const handleValidate = async () => {
        if (inputString && inputString.length > 0) {
            setValidInputMessageVisible(false);
            const validationResult = await validateAndSpeak(inputString, t, validationSpeed, onStateChanged);
            onFinishedValidation(inputString, validationResult);
        } else {
            setValidInputMessageVisible(true);
        }
    };

    return (
        <>
            <div className="p-6">
                <Button variant="outlined" fullWidth onClick={handleValidate}>
                    {t('validate')}
                </Button>
                {validInputMessageVisible && <div>{t('validInput')}</div>}
            </div>
        </>
    );
};

export default ValidateSection;
