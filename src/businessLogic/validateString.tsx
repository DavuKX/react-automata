export const validateString = (inputString: string) => {
  const automaton = {
    states: ['start', 'q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13'],
    alphabet: ['a', 'b'],
    transitions: {
      start: { a: 'q1', b: 'q0' },
      q1: { a: 'q2', b: 'q3' },
      q2: { a: 'q4', b: 'q13' },
      q3: { a: 'q4', b: 'q13' },
      q4: { a: 'q5', b: 'q6' },
      q5: { a: 'q7', b: 'q13' },
      q6: { a: 'q7', b: 'q13' },
      q7: { a: 'q8', b: 'q9' },
      q8: { a: 'q10' },
      q9: { a: 'q10' },
      q10: { a: 'q11', b: 'q12' },
    },
    initialState: 'start',
    acceptanceStates: ['q2', 'q3', 'q6', 'q5', 'q9', 'q8', 'q11', 'q12'],
  };

  let currentState = automaton.initialState;

  for (let i = 0; i < inputString.length; i++) {
    const character = inputString[i];
    if (automaton.transitions[currentState] && automaton.transitions[currentState][character]) {
      currentState = automaton.transitions[currentState][character];
    } else {
      return false;
    }
  }

  if (automaton.acceptanceStates.includes(currentState)) {
    return true;
  } else {
    return false;
  }
  };