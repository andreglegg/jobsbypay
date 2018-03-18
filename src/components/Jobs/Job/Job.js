import React from 'react';
import classes from './Job.css'

const job = (props) => {
    return (
        <div className={classes.Job}>
            <a href={props.link}>{props.title}</a>
        </div>
    );
};

export default job;
