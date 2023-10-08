import React, { useState } from 'react';

interface ValidationEntry {
  input: string;
  result: string;
  timestamp: Date;
}

export function useValidationHistory() {
  const [validationHistory, setValidationHistory] = useState<ValidationEntry[]>([]);

  function addValidationToHistory(inputWords: string, result: string) {
    const entry = { input: inputWords, result: result, timestamp: new Date() };
    setValidationHistory(prevHistory => [entry, ...prevHistory]);
  }

  return {
    validationHistory,
    addValidationToHistory,
  };
}

interface ValidationHistoryProps {
  history: ValidationEntry[];
}

export function ValidationHistoryComponent({ history }: ValidationHistoryProps) {
  return (
    <div className="validation-history">
      <h2>Validation History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <strong>{entry.input}</strong> - {entry.result}
          </li>
        ))}
      </ul>
    </div>
  );
}


