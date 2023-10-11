import {List, ListItem, Paper, Typography} from "@mui/material";
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
        <Paper elevation={4} className="validation-history p-6 h-72" style={{overflowY: "auto"}}>
            <Typography fontSize={18} fontWeight={"bold"}>{t('validationHistory')}</Typography>
            <List>
                {history.map((entry, index) => (
                    <ListItem key={index} className={t(entry.result) === t('reject') ? "bg-red-400" : "bg-green-400"}>
                        <strong className="pr-1">{entry.input}</strong> - {t(entry.result)}
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}