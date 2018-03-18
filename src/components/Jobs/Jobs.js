import React from 'react';

import Aux from '../../hoc/Aux'
import Job from './Job/Job'
import classes from './Jobs.css'

const jobs = (props) => {
    const JobList = Object.keys(props.jobsData) //.slice(0, 10)
        .map((key, index) => {
            const item = props.jobsData[index];
            //console.log(item);
            return (<Job
                key={index}
                title={item.title}
                link={item.link}
                pubDate={item.pubDate}
            />);
        });

    //console.log(myItem);
    return (
        <div className={classes.Jobs}>
            { JobList }
        </div>
    );
};

export default jobs;
