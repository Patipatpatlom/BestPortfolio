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
          // Small delay before closing to show 100%
          setTimeout(() => setIsDone(true), 800);
          return 100;
        }
        // Realistic non-linear progress
        const diff = Math.floor(Math.random() * 7) + 1;
        return Math.min(100, prev + diff);
      });
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {!isDone && (
        <motion.div 
          className={styles.container}
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, delay: 0.4 } 
          }}
        >
          {/* Subtle noise texture */}
          <div className={styles.noise} />
          
          <div className={styles.content}>
            <div className={styles.mainGroup}>
              <motion.div 
                className={styles.letterB}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ 
                  scale: 30,
                  opacity: 0,
                  filter: "blur(20px)",
                  transition: { duration: 1, ease: [0.7, 0, 0.3, 1] }
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                B
              </motion.div>
              
              {/* Refractive Glow */}
              <motion.div 
                className={styles.glow}
                exit={{ scale: 5, opacity: 0 }}
              />
            </div>

            <motion.div 
              className={styles.progressSection}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className={styles.percentageWrapper}>
                <motion.span className={styles.percentage}>
                  {progress < 10 ? `0${progress}` : progress}%
                </motion.span>
              </div>
              
              <div className={styles.barContainer}>
                <motion.div 
                  className={styles.barFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              <motion.div 
                className={styles.status}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                LOADING SYSTEM
              </motion.div>
            </motion.div>
          </div>

          <div className={styles.footer}>
            <span>© PATIPAT PATLOM 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
