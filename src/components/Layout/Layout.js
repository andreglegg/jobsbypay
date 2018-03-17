import React from 'react';

import Aux from '../../hoc/Aux'
import classes from './Layout.css'
import Navigation from '../Navigation/Navigation'

const layout = (props) => (
    <Aux>
        <div>
            <Navigation/>
        </div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;