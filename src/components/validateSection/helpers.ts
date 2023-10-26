import {finiteAutomaton} from "@/constans";

export const speak = (message: string): void => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
};

export const validateString = async (inputString: string, validationSpeed: number, onStateChanged: (currentState: string, newState: string) => void) => {
    let currentState = finiteAutomaton.initialState;
    const enteredString = inputString.toLowerCase();

    for (let i = 0; i < enteredString.length; i++) {
        const character = enteredString[i];
        const newState = finiteAutomaton.transitions[currentState] && finiteAutomaton.transitions[currentState][character];
        onStateChanged(currentState, newState)

        if (finiteAutomaton.transitions[currentState] && newState) {
            currentState = newState;
        } else {
            return false;
        }

        await new Promise(resolve => setTimeout(resolve, validationSpeed));
    }

    return finiteAutomaton.acceptanceStates.includes(currentState);
};