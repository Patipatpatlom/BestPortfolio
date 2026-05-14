import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // Faster progress for better feeling

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div 
          className={styles.container}
          style={{ position: 'fixed' }}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: "easeInOut" } 
          }}
        >
          <div className={styles.content}>
            <div className={styles.mainGroup}>
              <motion.h1 
                className={styles.letterB}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                PATIPAT
              </motion.h1>
              <div className={styles.glow} />
            </div>

            <div className={styles.progressSection}>
              <div className={styles.barContainer}>
                <motion.div 
                  className={styles.barFill} 
                  style={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
              <div className={styles.percentageWrapper}>
                <span className={styles.percentage}>{progress}%</span>
              </div>
              <span className={styles.status}>Loading Experience</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
