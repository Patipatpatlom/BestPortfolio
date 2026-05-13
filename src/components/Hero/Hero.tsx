import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import balloonName from '../../assets/balloon_name.png';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const balloonRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = balloonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to 1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to 1
    setTilt({ x: dy * -14, y: dx * 14 });             // tilt up to 14°
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <section ref={sectionRef} id="hero" className={styles.section}>

      <motion.div
        className={styles.inner}
        style={{ y: yText, opacity, scale }}
      >
        {/* Floating Animation Wrapper */}
        <motion.div
          animate={{ 
            y: [0, -15, 8, -5, 0],
            x: [0, 10, -6, 8, 0],
            rotateZ: [0, 1.5, -1, 0.5, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Balloon Name — 3D Tilt */}
          <motion.div
            ref={balloonRef}
            className={styles.balloonWrap}
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.06 : 1})`,
              transition: isHovered
                ? 'transform 0.08s linear'
                : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={balloonName}
              alt="PATIPAT PATLOM"
              className={`${styles.balloonImg} ${isHovered ? styles.balloonImgHovered : ''}`}
              draggable={false}
            />
            {/* Reflection glow that blooms on hover */}
            <div className={`${styles.balloonGlow} ${isHovered ? styles.balloonGlowActive : ''}`} />

            {/* Sparkle particles on hover */}
            {isHovered && (
              <>
                <span className={`${styles.sparkle} ${styles.s1}`}>✦</span>
                <span className={`${styles.sparkle} ${styles.s2}`}>✦</span>
                <span className={`${styles.sparkle} ${styles.s3}`}>✦</span>
                <span className={`${styles.sparkle} ${styles.s4}`}>✦</span>
              </>
            )}
          </motion.div>
        </motion.div>

        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Full-Stack Developer &amp; UX/UI Designer
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="#projects" className={styles.primaryBtn}>
            <span className={styles.btnText}>View Work</span>
            <span className={styles.btnGlow}></span>
          </a>
          <a href="#contact" className={styles.secondaryBtn}>
            Let's Talk
          </a>
        </motion.div>
      </motion.div>


    </section>
  );
}
