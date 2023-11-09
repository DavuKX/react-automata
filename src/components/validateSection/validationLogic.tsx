import {useContext} from 'react';
import {finiteAutomaton, pushdownAutomaton} from "@/constans";
import {validationResultType} from "@/types/validationResultType";
import { useCookies } from 'next-client-cookies';
import {AutomatonTypeContext} from "@/contexts/automatonTypeContext";

const automatonGraphData ={
    finite: finiteAutomaton,
    pushdown: pushdownAutomaton,
}

export const useValidationLogic = () => {
    const automatonType = useContext(AutomatonTypeContext);
    const cookies = useCookies();

    const validateWord = async (inputString: string): Promise<validationResultType> => {
        return await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/validate-automaton', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                automaton_data: automatonGraphData[automatonType.state],
                automaton_type: automatonType.state,
                word: inputString,
                path: [],
                uuid: cookies.get('uuid')
            })

        }).then((res) => res.json() as Promise<validationResultType>);
    };

    return { validateWord };
};
