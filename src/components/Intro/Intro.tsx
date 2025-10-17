import styles from './Intro.module.css';

const Intro = () => (
  <section className={styles.intro}>
    <p>Developer job listings in Norway ranked by pay.</p>
    <p className={styles.notice}>
      Stack Overflow retired its public jobs feed, so we are exploring alternative data sources.
    </p>
  </section>
);

export default Intro;
