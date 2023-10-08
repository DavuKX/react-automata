import {automaton} from "@/constans";

export const speak = (message: string): void => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
};

export const validateAndSpeak = async (inputString: string, t: (key: string) => string, validationSpeed: number, onStateChanged: (currentState: string, newState: string) => void): Promise<string> => {
    const isValid = validateString(inputString, validationSpeed, onStateChanged);
    const message = await isValid ? t('accept') : t('reject');
    speak(message);
    return message;
};

export const validateString = async (inputString: string, validationSpeed: number, onStateChanged: (currentState: string, newState: string) => void) => {
    let currentState = automaton.initialState;
    const enteredString = inputString.toLowerCase();

    for (let i = 0; i < enteredString.length; i++) {
        const character = enteredString[i];
        const newState = automaton.transitions[currentState][character];

        if (automaton.transitions[currentState] && newState) {
            onStateChanged(currentState, newState)
            currentState = newState;
        } else {
            return false;
        }

        await new Promise(resolve => setTimeout(resolve, validationSpeed));
    }

    return automaton.acceptanceStates.includes(currentState);
};