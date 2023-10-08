import {Paper} from "@mui/material";
import React from "react";
import {ValidationEntry} from "@/Interfaces/validationEntry";

interface ValidationHistoryProps {
    history: ValidationEntry[];
}

export function ValidationHistoryComponent({history}: ValidationHistoryProps) {
    return (
        <Paper elevation={4} className="validation-history p-4 h-80">
            <h2>Validation History</h2>
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