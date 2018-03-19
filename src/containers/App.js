import React, {Component} from 'react';

import {
    Route,
    HashRouter
} from "react-router-dom";
import classes from './App.css'
import Aux from '../hoc/Aux'
import Navigation from "../components/Navigation/Navigation";
import Home from "../components/Home"
import About from "../components/About"
import Footer from "../components/Footer/Footer";


class App extends Component {

    render() {
        return (
            <HashRouter>
                <Aux>
                    <Navigation/>
                    <div className={classes.Content}>
                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        {/*<Route path='*' exact component={notFound} />*/}
                    </div>
                    <Footer/>
                </Aux>
            </HashRouter>
        );
    }
}

export default App;
