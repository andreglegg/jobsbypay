import React, {Component} from 'react';

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

            const rss = await new Parser();
            rss.parseURL('https://stackoverflow.com/jobs/feed?l=Norway&u=Km&d=20')
                .then(feed => {
                    console.log(feed.items);
                    this.setState({
                        jobsData: feed.items
                    });
                }).catch(error => {
                    console.log(error)
            })

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
