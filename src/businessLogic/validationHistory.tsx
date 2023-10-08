import React, {useState} from 'react';
import {ValidationEntry} from "@/Interfaces/validationEntry";

export function useValidationHistory() {
    const [validationHistory, setValidationHistory] = useState<ValidationEntry[]>([]);

    function addValidationToHistory(inputWords: string, result: string) {
        const entry: ValidationEntry = {
            input: inputWords,
            result: result,
            timestamp: new Date()
        }
        setValidationHistory(prevHistory => [entry, ...prevHistory]);
    }

    return {
        validationHistory,
        addValidationToHistory,
    };
}


