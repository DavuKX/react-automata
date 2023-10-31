import React, {useContext, useState} from 'react';
import {Button} from '@mui/material';
import {useTranslation} from 'react-i18next';
import '@/i18n';
import {AutomatonTypeContext} from "@/Contexts/automatonTypeContext";
import {finiteAutomaton, pushdownAutomaton} from "@/constans";
import {validationResultType} from "@/types/validationResultType";
import { useCookies } from 'next-client-cookies';

interface ValidateSectionProps {
    inputString: string;
    onFinishedValidation: (result: validationResultType) => void;
}

const automatonGraphData ={
    finite: finiteAutomaton,
    pushdown: pushdownAutomaton,
}

const ValidateSection: React.FC<ValidateSectionProps> = ({inputString, onFinishedValidation}) => {
    const {t} = useTranslation();
    const [validInputMessageVisible, setValidInputMessageVisible] = useState(false);
    const automatonType = useContext(AutomatonTypeContext);
    const cookies = useCookies();

    const validateWord = async (inputString: string): Promise<validationResultType> => {
        return await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/validate-automaton', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                automaton_data: automatonGraphData[automatonType.state],
                automaton_type: automatonType.state,
                word: inputString,
                uuid: cookies.get('uuid')
            })

        }).then((res) => res.json() as Promise<validationResultType>);
    };

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
