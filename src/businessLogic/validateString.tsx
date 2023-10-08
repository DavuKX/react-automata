import {automaton} from "@/constans";

export const validateString = async (inputString: string, validationSpeed: number) => {

    let currentState = automaton.initialState;

    for (let i = 0; i < inputString.length; i++) {
        const character = inputString[i];

        if (automaton.transitions[currentState] && automaton.transitions[currentState][character]) {
            currentState = automaton.transitions[currentState][character];
        } else {
            return false;
        }

        await new Promise(resolve => setTimeout(resolve, validationSpeed));
    }

    return automaton.acceptanceStates.includes(currentState);
};
