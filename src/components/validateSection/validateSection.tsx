import React, {useState} from 'react';
import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import '@/i18n';
import {speak, validateString} from "@/components/validateSection/helpers";

interface ValidateSectionProps {
    inputString: string;
    onFinishedValidation: (word: string, result: string) => void;
}

const ValidateSection: React.FC<ValidateSectionProps> = ({inputString, onFinishedValidation}) => {
    const {t} = useTranslation();
    const [validInputMessageVisible, setValidInputMessageVisible] = useState(false);

    const validateAndSpeak = async (inputString: string, t: (key: string) => string): Promise<string> => {
        const r = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/validate-automata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then((res) => res.json());
        const message = r.result ? 'accept' : 'reject';
        speak(t(message));
        return message;
    };

    const handleValidate = async () => {
        if (inputString && inputString.length > 0) {
            setValidInputMessageVisible(false);
            const validationResult = await validateAndSpeak(inputString, t);
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
