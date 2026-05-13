import { useEffect, useRef } from 'react';
import styles from './StarField.module.css';

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  drift: number;
  driftSpeed: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface DustParticle {
  x: number;
  y: number;
  r: number;
  alpha: number;
  vy: number;     // drift upward
  vx: number;
  life: number;
  maxLife: number;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
  delay: number;
}

const NUM_STARS = 220;
const NUM_DUST = 55;
const NUM_SHOOTING_STARS = 3;

function randomBetween(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let animId: number;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();

    // ---- Stars ----
    const stars: Star[] = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: randomBetween(0.3, 1.8),
      alpha: randomBetween(0.2, 1),
      speed: randomBetween(0.02, 0.1),
      drift: 0,
      driftSpeed: randomBetween(0.0002, 0.001),
      twinkleSpeed: randomBetween(0.005, 0.025),
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // ---- Dust ----
    const makeDust = (): DustParticle => ({
      x: Math.random() * W,
      y: randomBetween(H * 0.3, H),
      r: randomBetween(0.8, 3),
      alpha: randomBetween(0.04, 0.18),
      vy: -randomBetween(0.08, 0.35),
      vx: randomBetween(-0.12, 0.12),
      life: 0,
      maxLife: randomBetween(180, 600),
    });

    const dust: DustParticle[] = Array.from({ length: NUM_DUST }, makeDust);

    // ---- Shooting Stars ----
    const resetShootingStar = (): ShootingStar => ({
      x: randomBetween(W * 0.2, W + 200),
      y: randomBetween(-200, H * 0.3),
      len: randomBetween(100, 300),
      speed: randomBetween(15, 25),
      angle: Math.PI / 4, // 45 degrees
      opacity: 0,
      active: false,
      delay: randomBetween(100, 500), // frames to wait before firing
    });

    const shootingStars: ShootingStar[] = Array.from({ length: NUM_SHOOTING_STARS }, resetShootingStar);

    let frame = 0;

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Draw stars and dust over transparent background (body background shows through)

      // --- Draw stars ---
      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed;
        const alpha = s.alpha * (0.6 + 0.4 * Math.sin(s.twinklePhase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${alpha})`;
        ctx.fill();

        // Glow for brighter stars
        if (s.r > 1.2) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          g.addColorStop(0, `rgba(150,200,255,${alpha * 0.4})`);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }

      // --- Draw shooting stars ---
      for (let i = 0; i < shootingStars.length; i++) {
        const ss = shootingStars[i];
        
        if (ss.active) {
          ss.x -= ss.speed * Math.cos(ss.angle);
          ss.y += ss.speed * Math.sin(ss.angle);
          
          // Fade in and out
          if (ss.opacity < 1 && ss.y < H / 3) {
            ss.opacity += 0.05;
          } else if (ss.y > H / 2) {
            ss.opacity -= 0.05;
          }

          if (ss.opacity <= 0 || ss.x < -ss.len || ss.y > H + ss.len) {
            shootingStars[i] = resetShootingStar();
          } else {
            // Draw shooting star
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(
              ss.x, ss.y,
              ss.x + ss.len * Math.cos(ss.angle),
              ss.y - ss.len * Math.sin(ss.angle)
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
            gradient.addColorStop(0.2, `rgba(0, 245, 255, ${ss.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(
              ss.x + ss.len * Math.cos(ss.angle),
              ss.y - ss.len * Math.sin(ss.angle)
            );
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.stroke();
            
            // Bright head
            ctx.beginPath();
            ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${ss.opacity})`;
            ctx.fill();
          }
        } else {
          ss.delay--;
          if (ss.delay <= 0) {
            ss.active = true;
          }
        }
      }

      // --- Draw dust ---
      for (let i = 0; i < dust.length; i++) {
        const d = dust[i];
        d.life++;
        d.x += d.vx;
        d.y += d.vy;

        const lifeRatio = d.life / d.maxLife;
        const fadeAlpha = lifeRatio < 0.2
          ? (lifeRatio / 0.2) * d.alpha
          : lifeRatio > 0.8
          ? ((1 - lifeRatio) / 0.2) * d.alpha
          : d.alpha;

        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3);
        g.addColorStop(0, `rgba(0,245,255,${fadeAlpha})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        if (d.life >= d.maxLife || d.y < -20) {
          dust[i] = makeDust();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
