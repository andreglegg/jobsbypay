import React from 'react';

import {
    NavLink,
    HashRouter
} from "react-router-dom";
import classes from './Footer.css'

const footer = (props) => {
    return (
        <HashRouter>
            <div className={classes.Footer}>
                <p>Made by a Jamaican in Norway.</p>
                <NavLink to="/about">About</NavLink>
            </div>
        </HashRouter>
    );
};

export default footer;
