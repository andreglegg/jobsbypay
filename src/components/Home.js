import React, {Component} from 'react';

import Aux from '../hoc/Aux'
import Intro from './Intro/Intro'
import Jobs from './Jobs/Jobs'

//const URL = 'https://stackoverflow.com/jobs/feed?l=Norway&u=Km&d=20&s=1&c=USD&sort=p';

class Home extends Component {
    state = {
        jobsData: {},
    };

    componentDidMount() {
        return fetch('https://job-scraper.fr.openode.io/output.json')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.jobs);
                this.setState({
                    jobsData: responseJson.jobs
                });
                //return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
        /*Feed.load(URL, (err, rss) => {
            console.log(rss.items);
            this.setState({
                jobsData: rss.items
            });
        });*/
        /*(async () => {

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

        })();*/
    }

    render() {
        return (
            <Aux>
                <Intro/>
                <Jobs jobsData={this.state.jobsData}/>
            </Aux>
        );
    }
}

export default Home;
