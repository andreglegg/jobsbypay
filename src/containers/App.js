import React, {Component} from 'react';

import classes from './App.css';
import Aux from '../hoc/Aux'
import Layout from '../components/Layout/Layout'
import Jobs from '../components/Jobs/Jobs'
import Parser from 'rss-parser'

class App extends Component {
    state = {
        jobsData : {},
    };

    componentDidMount() {

        (async () => {

            let feed = await new Parser().parseURL('https://stackoverflow.com/jobs/feed?l=Norway&u=Km&d=20');
            console.log(feed.items);

            this.setState({
                jobsData: feed.items
            });
            /*feed.items.forEach(item => {
                console.log(item.title + ':' + item.link)
            });*/

        })();
    }

    render() {
        return (
            <Aux>
                <Layout>
                    <Jobs jobsData={this.state.jobsData} />
                </Layout>
            </Aux>
        );
    }
}

export default App;
