import {Paper} from "@mui/material";
import React from "react";
import {ValidationEntry} from "@/Interfaces/validationEntry";
import {useTranslation} from "react-i18next";
import '@/i18n';

interface ValidationHistoryProps {
    history: ValidationEntry[];
}

export function ValidationHistoryComponent({history}: ValidationHistoryProps) {
    const {t} = useTranslation();
    return (
        <Paper elevation={4} className="validation-history p-4 h-80" style={{overflowY: "auto"}}>
            <h2>{t('validationHistory')}</h2>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        <strong>{entry.input}</strong> - {entry.result}
                    </li>
                ))}
            </ul>
        </Paper>
    );
}