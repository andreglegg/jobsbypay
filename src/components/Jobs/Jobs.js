import React from 'react';

import Job from './Job/Job'
import classes from './Jobs.css'

const timeSince = (date) => {

    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
};

const jobs = (props) => {
    const JobList = Object.keys(props.jobsData) //.slice(0, 10)
        .map((key, index) => {
            const item = props.jobsData[index];
            //console.log(item);
            const date = timeSince(new Date(item.created));
            return (<Job
                key={index}
                title={item.title}
                link={item.link}
                pubDate={date + " ago"}
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