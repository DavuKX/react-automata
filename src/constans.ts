import {Automaton} from "@/types/automaton";
import { AutomatonPushDown } from "@/types/automaton";

export const finiteAutomatonGraphData = {
    nodes: [
        {data: {id: "start", label: "start"}},
        {data: {id: "q0", label: "q0"}},
        {data: {id: "q1", label: "q1"}},
        {data: {id: "q2", label: "q2", final: "true"}},
        {data: {id: "q3", label: "q3", final: "true"}},
        {data: {id: "q4", label: "q4"}},
        {data: {id: "q5", label: "q5", final: "true"}},
        {data: {id: "q6", label: "q6", final: "true"}},
        {data: {id: "q7", label: "q7"}},
        {data: {id: "q8", label: "q8", final: "true"}},
        {data: {id: "q9", label: "q9", final: "true"}},
        {data: {id: "q10", label: "q10"}},
        {data: {id: "q11", label: "q11", final: "true"}},
        {data: {id: "q12", label: "q12", final: "true"}},
        {data: {id: "q13", label: "q13"}}
    ],
    edges: [
        {
            data: {source: "start", target: "q0", label: "B"}
        },
        {
            data: {source: "start", target: "q1", label: "A"}
        },
        {
            data: {source: "q1", target: "q2", label: "A"}
        },
        {
            data: {source: "q1", target: "q3", label: "B"}
        },
        {
            data: {source: "q2", target: "q4", label: "A"}
        },
        {
            data: {source: "q3", target: "q4", label: "A"}
        },
        {
            data: {source: "q2", target: "q13", label: "B"}
        },
        {
            data: {source: "q3", target: "q13", label: "B"}
        },
        {
            data: {source: "q4", target: "q6", label: "B"}
        },
        {
            data: {source: "q6", target: "q13", label: "B"}
        },
        {
            data: {source: "q4", target: "q5", label: "A"}
        },
        {
            data: {source: "q6", target: "q7", label: "A"}
        },
        {
            data: {source: "q7", target: "q8", label: "A"}
        },
        {
            data: {source: "q8", target: "q13", label: "B"}
        },
        {
            data: {source: "q5", target: "q13", label: "B"}
        },
        {
            data: {source: "q5", target: "q6", label: "A"}
        },
        {
            data: {source: "q7", target: "q9", label: "B"}
        },
        {
            data: {source: "q9", target: "q13", label: "B"}
        },
        {
            data: {source: "q9", target: "q10", label: "A"}
        },
        {
            data: {source: "q8", target: "q10", label: "A"}
        },
        {
            data: {source: "q10", target: "q11", label: "A"}
        },
        {
            data: {source: "q10", target: "q12", label: "B"}
        }
    ]
}

export const pushdownAutomatonGraphData = {
    nodes: [
        {data: {id: "start", label: "start"}},
        {data: {id: "p", label: "p"}},
        {data: {id: "q", label: "q"}},
        {data: {id: "r", label: "r", final: "true"}}
    ],
    edges: [
        {
            data: {source: "start", target: "p", label: ""}
        },
        {
            data: {source: "p", target: "p", label: "b,b/bb"}
        },
        {
            data: {source: "p", target: "p", label: "a,b/ba"}
        },
        {
            data: {source: "p", target: "p", label: "b,a/ab"}
        },
        {
            data: {source: "p", target: "p", label: "a,a/aa"}
        },
        {
            data: {source: "p", target: "p", label: "b,#/#b"}
        },
        {
            data: {source: "p", target: "p", label: "a,#/#a"}
        },
        {
            data: {source: "p", target: "q", label: "b,b/λ"}
        },
        {
            data: {source: "p", target: "q", label: "a,a/λ"}
        },
        {
            data: {source: "q", target: "q", label: "a,a/λ"}
        },
        {
            data: {source: "q", target: "q", label: "b,b/λ"}
        },
        {
            data: {source: "q", target: "r", label: "λ,#/#"}
        }
    ]
}


export const finiteAutomaton: Automaton = {
    states: ['start', 'q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13'],
    alphabet: ['a', 'b'],
    transitions: {
        start: {a: 'q1', b: 'q0'},
        q1: {a: 'q2', b: 'q3'},
        q2: {a: 'q4', b: 'q13'},
        q3: {a: 'q4', b: 'q13'},
        q4: {a: 'q5', b: 'q6'},
        q5: {a: 'q6', b: 'q13'},
        q6: {a: 'q7', b: 'q13'},
        q7: {a: 'q8', b: 'q9'},
        q8: {a: 'q10', b: 'q13'},
        q9: {a: 'q10', b: 'q13'},
        q10: {a: 'q11', b: 'q12'},
    },
    initialState: 'start',
    acceptanceStates: ['q2', 'q3', 'q5', 'q6', 'q8', 'q9', 'q11', 'q12'],
};

export const pushdownAutomaton: AutomatonPushDown = {
    states: ['start', 'p', 'q', 'r'],
    alphabet: ['a','b'],
    transitions: {
        p: {
            a: [{ next_state: 'p', pop_symbol: '#', push_symbols: ['#', 'a']}, 
                { next_state: 'p', pop_symbol: 'a', push_symbols: ['a', 'a']},
                { next_state: 'p', pop_symbol: 'b', push_symbols: ['b', 'a']},
                { next_state: 'q', pop_symbol: 'a', push_symbols: ['λ']}],
            b: [{ next_state: 'p', pop_symbol: '#', push_symbols: ['#', 'b']},
                { next_state: 'p', pop_symbol: 'a', push_symbols: ['a', 'b']},
                { next_state: 'p', pop_symbol: 'b', push_symbols: ['b', 'b']},
                { next_state: 'q', pop_symbol: 'b', push_symbols: ['λ']}],
        },
        q: {
            a: [{ next_state: 'q', pop_symbol: 'a', push_symbols: ['λ']}],
            b: [{ next_state: 'q', pop_symbol: 'b', push_symbols: ['λ']}], 
            λ: [{ next_state: 'r', pop_symbol: '#', push_symbols: ['#']}],
        },
    },    
    // transitions: {
    //     p: {'a,#/#a': 'p', 'b,#/#b': 'p', 'a,a/aa': 'p', 'b,b/bb': 'p', 'a,b/ba': 'p', 'b,a/ab': 'p', 'a,a/λ': 'q', 'b,b/λ': 'q'},
    //     q: {'a,a/λ': 'q', 'b,b/λ': 'q', 'λ,#/#' : 'r'}
    // },
    initialState: 'p',
    acceptanceStates: ['r'],
}