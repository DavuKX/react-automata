import React, {useState} from 'react';
import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import '@/i18n';
import {validationResultType} from "@/types/validationResultType";
import { useValidationLogic } from './validationLogic';

interface ValidateSectionProps {
    inputString: string;
    onFinishedValidation: (result: validationResultType) => void;
}

const ValidateSection: React.FC<ValidateSectionProps> = ({inputString, onFinishedValidation}) => {
    const {t} = useTranslation();
    const [validInputMessageVisible, setValidInputMessageVisible] = useState(false);
    const { validateWord } = useValidationLogic();

    const handleValidate = async () => {
        if (inputString && inputString.length > 0) {
            setValidInputMessageVisible(false);
            const validationResult = await validateWord(inputString);
            onFinishedValidation(validationResult);
        } else {
            setValidInputMessageVisible(true);
        }
    };

    return (
        <>
            <div>
                <Button variant="outlined" fullWidth onClick={handleValidate}>
                    {t('validate')}
                </Button>
                {validInputMessageVisible && <div>{t('validInput')}</div>}
            </div>
        </>
    );
};

export default ValidateSection;
