import React from 'react';

import Aux from '../../hoc/Aux'
import Job from './Job/Job'

const jobs = (props) => {
    const JobList = Object.keys(props.jobsData).slice(0, 10)
        .map((key, index) => {

            const item = props.jobsData[index];
            //console.log(item);
            return (<Job key={index} title={item.title} link={item.link} />);
        });

    //console.log(myItem);
    return (
        <Aux>
            { JobList }
        </Aux>
    );
};

export default jobs;
