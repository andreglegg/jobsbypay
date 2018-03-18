import React from 'react';

import Aux from '../../hoc/Aux'
import Navigation from '../Navigation/Navigation'
import Intro from '../Intro/Intro'

const layout = (props) => (
    <Aux>
        <Navigation/>
        <Intro />
        {props.children}
    </Aux>
);

export default layout;