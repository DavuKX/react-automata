import React, { createContext } from 'react';
import {AutomatonTypes} from "@/types/automaton";

type ContextType = {
    state: AutomatonTypes;
    setState: React.Dispatch<React.SetStateAction<AutomatonTypes>>;
};

export const AutomatonTypeContext = createContext<ContextType>({
    state: 'finite',
    setState: () => {},
});
