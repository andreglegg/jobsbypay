import Job from './Job/Job';
import styles from './Jobs.module.css';
import type { JobListing } from '../../types/jobs';

type JobsProps = {
  jobsData?: JobListing[];
};

const toComparableDate = (value?: string | number): number => {
  if (!value) {
    return 0;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
};

const Jobs = ({ jobsData = [] }: JobsProps) => {
  if (jobsData.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No listings matched your criteria. Try again later.</p>
      </div>
    );
  }

  const sortedJobs = [...jobsData].sort(
    (a, b) => toComparableDate(b.created ?? b.date ?? 0) - toComparableDate(a.created ?? a.date ?? 0),
  );

  return (
    <div className={styles.jobs}>
      {sortedJobs.map((job, index) => (
        <Job
          key={job.link ?? index}
          title={job.title}
          link={job.link}
          date={job.date}
          companyName={job.companyName}
          location={job.location}
          salary={job.salary}
        />
      ))}
    </div>
  );
};

export default Jobs;
