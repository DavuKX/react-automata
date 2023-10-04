import React from 'react';
import PropTypes from 'prop-types';

const NavBar = ({}) => {

    return (
        <div className="mx-3 py-5 text-center">
            <div className="flex gap-3 flex-wrap justify-around">
                <div className="bg-clip-text font-bold text-2xl">
                    Automaton solver
                </div>
            </div>
        </div>
    );
};

NavBar.propTypes = {

};

export default NavBar;