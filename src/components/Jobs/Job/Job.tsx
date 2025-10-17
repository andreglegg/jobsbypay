import styles from './Job.module.css';
import type { JobListing } from '../../../types/jobs';

type JobProps = Pick<JobListing, 'title' | 'link' | 'date' | 'companyName' | 'location' | 'salary'>;

const LOGO =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDEyMCAxMjAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEyMCAxMjA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNCQ0JCQkI7fQ0KCS5zdDF7ZmlsbDojRjQ4MDIzO30NCjwvc3R5bGU+DQo8cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9Ijg0LjQsOTMuOCA4NC40LDcwLjYgOTIuMSw3MC42IDkyLjEsMTAxLjUgMjIuNiwxMDEuNSAyMi42LDcwLjYgMzAuMyw3MC42IDMwLjMsOTMuOCAiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0zOC44LDY4LjRsMzcuOCw3LjlsMS42LTcuNmwtMzcuOC03LjlMMzguOCw2OC40eiBNNDMuOCw1MC40bDM1LDE2LjNsMy4yLTdsLTM1LTE2LjRMNDMuOCw1MC40eiBNNTMuNSwzMy4yDQoJbDI5LjcsMjQuN2w0LjktNS45TDU4LjQsMjcuM0w1My41LDMzLjJ6IE03Mi43LDE0LjlsLTYuMiw0LjZsMjMsMzFsNi4yLTQuNkw3Mi43LDE0Ljl6IE0zOCw4NmgzOC42di03LjdIMzhWODZ6Ii8+DQo8L3N2Zz4NCg==';
const JOBSITE_URL = 'https://stackoverflow.com';

const buildJobUrl = (link?: string): string => {
  if (!link) {
    return JOBSITE_URL;
  }

  return link.startsWith('http') ? link : `${JOBSITE_URL}${link}`;
};

const Job = ({
  title = 'Untitled position',
  link,
  date = 'Unknown date',
  companyName = 'Unknown company',
  location = 'Remote',
  salary
}: JobProps) => (
  <article className={styles.job}>
    <div className={styles.icon}>
      <a href={buildJobUrl(link)} target="_blank" rel="noopener noreferrer">
        <img src={LOGO} alt="Stack Overflow jobs mark" />
      </a>
    </div>
    <div className={styles.title}>
      <a href={buildJobUrl(link)} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
      <dl className={styles.meta}>
        <div>
          <dt>Company</dt>
          <dd>{companyName}</dd>
        </div>
        <div>
          <dt>Location</dt>
          <dd>{location}</dd>
        </div>
        <div>
          <dt>Posted</dt>
          <dd>{date}</dd>
        </div>
      </dl>
    </div>
    <div className={styles.salary}>{salary && <span>{salary}</span>}</div>
  </article>
);

export default Job;
