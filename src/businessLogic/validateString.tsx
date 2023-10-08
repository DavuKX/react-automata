import {automaton} from "@/constans";

export const validateString = async (inputString: string, validationSpeed: number) => {
    let currentState = automaton.initialState;
    const enteredString = inputString.toLowerCase();

    for (let i = 0; i < enteredString.length; i++) {
        const character = enteredString[i];

        if (automaton.transitions[currentState] && automaton.transitions[currentState][character]) {
            currentState = automaton.transitions[currentState][character];
        } else {
            return false;
        }

        await new Promise(resolve => setTimeout(resolve, validationSpeed));
    }

    return automaton.acceptanceStates.includes(currentState);
};
