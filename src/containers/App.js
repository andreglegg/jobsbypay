import React, {Component} from 'react';

import classes from './App.css';
import Aux from '../hoc/Aux'
import Layout from '../components/Layout/Layout'
import Jobs from '../components/Jobs/Jobs'

class App extends Component {
    render() {
        return (
            <Aux>
                <Layout>
                    <Jobs />
                </Layout>
            </Aux>
        );
    }
}

export default App;
