import React, { useEffect, useState } from 'react';
import {Fade} from 'react-awesome-reveal';

const AnimatedStack = () => {
    const [animationStack, setAnimationStack] = useState([]);
    const automatonType = useContext(AutomatonTypeContext);

    useEffect(() => {
      const fetchData = async () => {
          const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/pushdown_automaton_solver_strategy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                automaton_type: automatonType.state
                automaton_data:
            })
          });
            const data = await response.json();
            setAnimationStack(data);
  
      fetchData();
  
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }}, []);

    return (
        <div className="stack-container">
            {animationStack.map((state, index) => (
                <Fade key={index} triggerOnce direction="left" duration={500} delay={index * 100}>
                    <div className="stack-item">
                        <div className="state">{state.current_state}</div>
                        <div className="stack-content">
                            {state.stack.map((symbol, symbolIndex) => (
                                <div key={symbolIndex} className="stack-symbol">
                                    {symbol}
                                </div>
                            ))}
                        </div>
                        <div className="char">{state.char}</div>
                        <div className="final-state">{state.final_state}</div>
                    </div>
                </Fade>
            ))}
        </div>
    );
};

export default AnimatedStack;
                            
