import React from 'react';

import {
    NavLink,
    HashRouter
} from "react-router-dom";
import classes from './Navigation.css'

const navigation = () => {
    return (
        <HashRouter>
            <nav className={classes.Navigation}>
                <div className={classes.Wrapper}>
                    <nav>
                        <NavLink to="/">Logo</NavLink>
                    </nav>
                </div>
            </nav>
        </HashRouter>
    );
};

export default navigation;
