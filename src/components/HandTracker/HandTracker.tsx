import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HandTracker.module.css';

// Declare global for MediaPipe
declare global {
  interface Window {
    Hands: any;
    Camera: any;
  }
}

export default function HandTracker() {
  const [isActive, setIsActive] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isHandVisible, setIsHandVisible] = useState(false);
  const [isPinching, setIsPinching] = useState(false);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [landmarks, setLandmarks] = useState<any[]>([]);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const handsRef = useRef<any>(null);
  const requestRef = useRef<number>(null);

  // Load MediaPipe via CDN dynamically to avoid Vite build issues
  useEffect(() => {
    const loadScripts = async () => {
      const scripts = [
        'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js',
      ];

      for (const src of scripts) {
        if (!document.querySelector(`script[src="${src}"]`)) {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          document.head.appendChild(script);
          await new Promise((resolve) => (script.onload = resolve));
        }
      }

      if (window.Hands) {
        const hands = new window.Hands({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }
        });

        hands.setOptions({
          maxNumHands: 1,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        hands.onResults((results: any) => {
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            setIsHandVisible(true);
            const currentLandmarks = results.multiHandLandmarks[0];
            setLandmarks(currentLandmarks);

            const thumbTip = currentLandmarks[4];
            const indexTip = currentLandmarks[8];
            const middleTip = currentLandmarks[12];
            const ringTip = currentLandmarks[16];
            const pinkyTip = currentLandmarks[20];

            const x = (1 - indexTip.x) * window.innerWidth;
            const y = indexTip.y * window.innerHeight;
            setPointerPos({ x, y });

            // 1. Gesture: Peace Sign (✌️) for PhotoBooth
            const isIndexUp = indexTip.y < currentLandmarks[6].y;
            const isMiddleUp = middleTip.y < currentLandmarks[10].y;
            const isRingDown = ringTip.y > currentLandmarks[14].y;
            const isPinkyDown = pinkyTip.y > currentLandmarks[18].y;

            if (isIndexUp && isMiddleUp && isRingDown && isPinkyDown) {
              window.dispatchEvent(new CustomEvent('gesture-peace'));
            }

            // 2. Gesture: Pinch (👌) for Clicking
            const pinchDist = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y);
            if (pinchDist < 0.05) {
              setIsPinching(true);
              const el = document.elementFromPoint(x, y);
              if (el && !el.classList.contains(styles.pointer)) {
                (el as HTMLElement).click();
              }
            } else {
              setIsPinching(false);
            }

            // 3. Scroll Logic
            const center = 0.5;
            const deadzone = 0.1;
            const offset = indexTip.y - center;

            if (Math.abs(offset) > deadzone) {
              const direction = Math.sign(offset);
              const strength = Math.pow(Math.abs(offset) - deadzone, 1.2) * 500;

              window.scrollBy({ top: direction * strength, behavior: 'auto' });
              document.documentElement.scrollTop += direction * strength;

              setScrollSpeed(Math.round(direction * strength));
            } else {
              setScrollSpeed(0);
            }
          } else {
            setIsHandVisible(false);
            setLandmarks([]);
            setScrollSpeed(0);
            setIsPinching(false);
          }
        });

        handsRef.current = hands;
        setIsModelLoaded(true);
      }
    };

    loadScripts();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (handsRef.current) handsRef.current.close();
    };
  }, []);

  const processVideo = useCallback(async () => {
    if (videoRef.current && isActive && handsRef.current) {
      try {
        await handsRef.current.send({ image: videoRef.current });
      } catch (e) {
        // Retry
      }
      requestRef.current = requestAnimationFrame(processVideo);
    }
  }, [isActive]);

  const toggle = async () => {
    if (!isActive) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsActive(true);
            document.body.classList.add('air-mode-active');
          };
        }
      } catch (err) {
        alert("Please enable camera access.");
      }
    } else {
      setIsActive(false);
      document.body.classList.remove('air-mode-active');
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(t => t.stop());
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      setScrollSpeed(0);
      setLandmarks([]);
      setIsPinching(false);
    }
  };

  useEffect(() => {
    if (isActive) {
      requestRef.current = requestAnimationFrame(processVideo);
    }
  }, [isActive, processVideo]);

  return (
    <>
      <div className={styles.controls}>
        <button
          className={`${styles.toggle} ${isActive ? styles.active : ''}`}
          onClick={toggle}
          disabled={!isModelLoaded}
        >
          <div className={styles.icon}>🖐️</div>
          <span>{isActive ? `SPEED: ${scrollSpeed}` : isModelLoaded ? 'AIR GESTURES' : 'LOADING AI...'}</span>
          {!isModelLoaded && <div className={styles.miniLoader} />}
        </button>
      </div>

      <video
        ref={videoRef}
        className={`${styles.debugVideo} ${isActive ? styles.showVideo : ''}`}
        playsInline
        muted
      />

      <AnimatePresence>
        {isActive && (
          <>
            <div className={styles.heartbeat} />
            <motion.div className={styles.centerLine} exit={{ opacity: 0 }} />
            <div className={styles.scrollZoneTop}><div className={styles.zoneText}>UP</div></div>
            <div className={styles.scrollZoneBottom}><div className={styles.zoneText}>DOWN</div></div>

            {landmarks.length > 0 && (
              <svg className={styles.skeletonOverlay}>
                {landmarks.map((point: any, i: number) => (
                  <circle
                    key={i}
                    cx={(1 - point.x) * 100 + '%'}
                    cy={point.y * 100 + '%'}
                    r={i === 8 ? (isPinching ? 10 : 4) : 3}
                    fill={i === 8 ? (isPinching ? "#ff0055" : "#fff") : "rgba(0, 245, 255, 0.5)"}
                    className={i === 8 ? styles.indexPoint : ''}
                    style={{ transition: 'all 0.1s ease' }}
                  />
                ))}
              </svg>
            )}

            {isHandVisible && (
              <motion.div
                className={styles.pointer}
                style={{ left: pointerPos.x, top: pointerPos.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: isPinching ? 0.6 : 1,
                  background: isPinching ? 'rgba(255, 0, 85, 0.4)' : 'transparent',
                  boxShadow: isPinching ? '0 0 30px #ff0055' : '0 0 20px rgba(0, 245, 255, 0.3)'
                }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <div className={styles.innerPointer} style={{ background: isPinching ? '#ff0055' : '#fff' }} />
                <div className={styles.ring} style={{ borderColor: isPinching ? '#ff0055' : '#00f5ff' }} />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {isActive && (
        <div className={styles.status}>
          <div className={`${styles.statusDot} ${isHandVisible ? styles.green : styles.orange}`} />
          {isHandVisible ? 'HAND TRACKED' : 'PLACE HAND IN VIEW'}
        </div>
      )}
    </>
  );
}
