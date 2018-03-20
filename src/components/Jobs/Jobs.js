import React from 'react';

import Job from './Job/Job'
import classes from './Jobs.css'

const jobs = (props) => {
    let obj = [...props.jobsData];
    obj.sort((a, b) => {
        return a.created < b.created;
    });
    const JobList = Object.keys(obj) //.slice(0, 10)
        .map((key, index) => {
            const item = obj[index];
            //console.log(item);
            //const formatedDate = timeSince(new Date(item.created));
            return (<Job
                key={index}
                title={item.title}
                link={item.link}
                date={item.date}
                companyName={item.companyName}
                location={item.location}
                salary={item.salary}
            />);
        });

    //console.log(myItem);
    return (
        <div className={classes.Jobs}>
            {JobList}
        </div>
    );
};

export default jobs;
