import styles from './JobLoading.module.css';

const PLACEHOLDER_ITEMS = 5;

const JobLoading = () => (
  <div className={styles.container}>
    {Array.from({ length: PLACEHOLDER_ITEMS }).map((_, index) => (
      <div className={styles.job} key={index}>
        <div className={styles.icon} />
        <div className={styles.meta}>
          <div className={styles.lineShort} />
          <div className={styles.lineLong} />
        </div>
      </div>
    ))}
  </div>
);

export default JobLoading;
