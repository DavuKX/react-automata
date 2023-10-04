import React, { useState } from 'react';

const Automaton = () => {
  const [state, setState] = useState('start');

  const automaton = {
    states: ['start', 'q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13'],
    alphabet: ['a', 'b'],
    transitions: {
      start: { b: 'q0', a: 'q1' },
      q1: { a: 'q2', b: 'q3' },
      q2: { a: 'q4' },
      q3: { a: 'q4', b: 'q13' },
      q2: { b: 'q13' },
      q4: { b: 'q6' },
      q6: { b: 'q13', a: 'q7' },
      q4: { a: 'q5' },
      q5: { b: 'q13', a: 'q7' },
      q7: { a: 'q8', b: 'q9' },
      q8: { a: 'q10' },
      q9: { a: 'q10' },
      q10: { a: 'q11', b: 'q12' }
    },
    initialState: 'start',
    aceptationStates: ['q2', 'q3', 'q6', 'q5', 'q9', 'q8', 'q11', 'q12'],
  };

  const validateString = (string) => {
    let currentState = automaton.initialState;
  
    for (let i = 0; i < string.length; i++) {
      const character = string[i];
      if (automaton.transitions[currentState][character]) {
        currentState = automaton.transitions[currentState][character];
      } else {
        setState('rejected');
        return false;
      }
    }
  
    if (automaton.aceptationStates.includes(currentState)) {
      setState('accepted');
      return true;
    } else {
      setState('rejected');
      return false;
    }
  };

};