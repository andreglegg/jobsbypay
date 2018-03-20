import React from 'react';
import classes from './Job.css'

const LOGO = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDEyMCAxMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyMCAxMjA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNCQ0JCQkI7fQ0KCS5zdDF7ZmlsbDojRjQ4MDIzO30NCjwvc3R5bGU+DQo8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9Ijg0LjQsOTMuOCA4NC40LDcwLjYgOTIuMSw3MC42IDkyLjEsMTAxLjUgMjIuNiwxMDEuNSAyMi42LDcwLjYgMzAuMyw3MC42IDMwLjMsOTMuOCAiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zOC44LDY4LjRsMzcuOCw3LjlsMS42LTcuNmwtMzcuOC03LjlMMzguOCw2OC40eiBNNDMuOCw1MC40bDM1LDE2LjNsMy4yLTdsLTM1LTE2LjRMNDMuOCw1MC40eiBNNTMuNSwzMy4yDQoJbDI5LjcsMjQuN2w0LjktNS45TDU4LjQsMjcuM0w1My41LDMzLjJ6IE03Mi43LDE0LjlsLTYuMiw0LjZsMjMsMzFsNi4yLTQuNkw3Mi43LDE0Ljl6IE0zOCw4NmgzOC42di03LjdIMzhWODZ6Ii8+DQo8L3N2Zz4NCg=="
const JOBSITEURL = "https://stackoverflow.com";
const job = (props) => {
    return (
        <div className={classes.Job}>
            <div className={classes.Icon}>
                <a href={props.link}><img src={LOGO} alt="logo"/></a>
            </div>
            <div className={classes.Title}>
                <a href={[JOBSITEURL, props.link].join('')}>{props.title}</a>
                <div className={classes.MeteData}><strong>{props.companyName}</strong> - {props.location} - {props.date}
                </div>
            </div>
            <div className={classes.Salary}>
                {props.salary}
            </div>

        </div>
    );
};

export default job;
