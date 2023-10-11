import {automaton} from "@/constans";

export const speak = (message: string): void => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
};

export const validateAndSpeak = async (inputString: string, t: (key: string) => string, validationSpeed: number, onStateChanged: (currentState: string, newState: string) => void): Promise<string> => {
    const isValid = validateString(inputString, validationSpeed, onStateChanged);
    const message = await isValid ? 'accept' : 'reject';
    speak(message);
    return message;
};

export const validateString = async (inputString: string, validationSpeed: number, onStateChanged: (currentState: string, newState: string) => void) => {
    let currentState = automaton.initialState;
    const enteredString = inputString.toLowerCase();

    for (let i = 0; i < enteredString.length; i++) {
        const character = enteredString[i];
        const newState = automaton.transitions[currentState] && automaton.transitions[currentState][character];
        onStateChanged(currentState, newState)

        if (automaton.transitions[currentState] && newState) {
            currentState = newState;
        } else {
            return false;
        }

        await new Promise(resolve => setTimeout(resolve, validationSpeed));
    }

    return automaton.acceptanceStates.includes(currentState);
};