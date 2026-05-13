import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PhotoBooth.module.css';

interface PrintedPhoto {
  id: string;
  src: string;
  x: number;
  y: number;
  rotate: number;
}

export default function PhotoBooth() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [printedPhotos, setPrintedPhotos] = useState<PrintedPhoto[]>([]);
  
  // Track theme to only show button in light mode
  const [theme, setTheme] = useState(
    typeof document !== 'undefined' ? document.documentElement.getAttribute('data-theme') || 'dark' : 'dark'
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      setPhoto(null);
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setHasPermission(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    // Play flash effect
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 150);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Mirror the image horizontally
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Reset transform to draw text normally
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      
      // Y2K Watermark
      ctx.font = 'bold 48px "Courier New"';
      ctx.fillStyle = '#ff69b4';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.fillText('✨ Y2K VIBES ✨', 30, canvas.height - 40);
      
      const dataUrl = canvas.toDataURL('image/png');
      setPhoto(dataUrl);
    }
  };

  const downloadPhoto = () => {
    if (!photo) return;
    const a = document.createElement('a');
    a.href = photo;
    a.download = `y2k_photobooth_${Date.now()}.png`;
    a.click();
  };

  const printPhoto = () => {
    if (!photo) return;
    const newPhoto: PrintedPhoto = {
      id: Math.random().toString(36).substr(2, 9),
      src: photo,
      x: window.innerWidth / 2 - 125 + (Math.random() * 100 - 50),
      y: window.innerHeight / 2 - 150 + (Math.random() * 100 - 50),
      rotate: Math.random() * 20 - 10,
    };
    setPrintedPhotos([...printedPhotos, newPhoto]);
    setPhoto(null);
    setIsOpen(false);
  };

  // Only render trigger button in light mode
  if (theme !== 'light') return <></>;

  return (
    <>
      <motion.button 
        className={styles.triggerBtn}
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={styles.btnIcon}>📸</span> Y2K Booth
      </motion.button>

      {/* Render Printed Draggable Photos */}
      {printedPhotos.map((p) => (
        <motion.div
          key={p.id}
          className={styles.printedPhoto}
          drag
          dragMomentum={false}
          initial={{ x: p.x, y: window.innerHeight + 200, rotate: p.rotate, scale: 0.5 }}
          animate={{ x: p.x, y: p.y, rotate: p.rotate, scale: 1 }}
          whileHover={{ scale: 1.05, zIndex: 3000 }}
          whileDrag={{ scale: 1.1, zIndex: 3100, cursor: 'grabbing' }}
        >
          <img src={p.src} alt="Printed" draggable={false} />
        </motion.div>
      ))}

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modal}
              initial={{ scale: 0.8, y: 50, rotateX: 20 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.8, y: 50, rotateX: -20 }}
              style={{ perspective: 1000 }}
            >
              <div className={styles.header}>
                <span>✨ WebCam.exe ✨</span>
                <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✖</button>
              </div>

              <div className={styles.content}>
                {isFlashing && <div className={styles.flash} />}
                
                <div className={styles.cameraView} style={{ display: photo ? 'none' : 'flex' }}>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={styles.video}
                  />
                  {hasPermission === false && (
                    <div className={styles.error}>Please allow camera access! 🔒</div>
                  )}
                </div>
                
                {photo && (
                  <div className={styles.photoView}>
                    <img src={photo} alt="Captured" className={styles.capturedImg} />
                  </div>
                )}
                
                <canvas ref={canvasRef} style={{ display: 'none' }} />
              </div>

              <div className={styles.controls}>
                {!photo ? (
                  <button className={styles.actionBtn} onClick={takePhoto}>
                    📸 Snap!
                  </button>
                ) : (
                  <>
                    <button className={styles.actionBtn} onClick={() => setPhoto(null)}>
                      🔄 Retake
                    </button>
                    <button className={`${styles.actionBtn} ${styles.primaryBtn}`} onClick={printPhoto}>
                      🖨️ Print
                    </button>
                    <button className={styles.actionBtn} onClick={downloadPhoto}>
                      💾 Save
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
