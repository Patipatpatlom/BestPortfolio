import { useEffect } from 'react';
import styles from './Orbs.module.css';

export default function Orbs(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />
    </div>
  );
}
