export type TransitionState = {
    [key: string]: string;
};

export type Automaton = {
    states: string[];
    alphabet: string[];
    transitions: {
        [key: string]: TransitionState;
    };
    initialState: string;
    acceptanceStates: string[];
};