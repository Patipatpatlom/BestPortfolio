import { useEffect, useRef } from 'react';
import styles from './Bubbles.module.css';

interface Bubble {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  color: string;
  driftPhase: number;
  driftSpeed: number;
}

export default function Bubbles(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const bubbles: Bubble[] = [];
    const NUM_BUBBLES = 50;

    const colors = [
      'rgba(255, 105, 180, 0.4)', // Pink
      'rgba(0, 245, 255, 0.4)',   // Cyan
      'rgba(200, 160, 255, 0.4)', // Lavender
      'rgba(184, 255, 87, 0.4)',  // Lime green
    ];

    for (let i = 0; i < NUM_BUBBLES; i++) {
      // Exponentiated random for more small bubbles, fewer giant ones (Range: 8 to ~70)
      const r = Math.pow(Math.random(), 2) * 60 + 8;

      // Base rising speed
      const vy = -(Math.random() * 0.8 + 0.4) * (20 / Math.max(r, 15));

      bubbles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r,
        vx: 0,
        vy,
        baseVx: 0,
        baseVy: vy,
        color: colors[Math.floor(Math.random() * colors.length)],
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.015 + 0.005,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const b of bubbles) {
        // Apply smooth horizontal drift
        b.driftPhase += b.driftSpeed;
        const driftX = Math.sin(b.driftPhase) * 0.6;

        // Apply velocity + drift
        b.x += b.vx + driftX;
        b.y += b.vy;

        // Smooth Repel from mouse
        const dx = b.x - mouseX;
        const dy = b.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 250; // Larger repel area for smoother push

        if (dist < repelRadius) {
          // Quadratic falloff for smoother, less jerky force
          const force = Math.pow((repelRadius - dist) / repelRadius, 2);
          b.vx += (dx / dist) * force * 0.5;
          b.vy += (dy / dist) * force * 0.5;
        }

        // Air drag / friction to smooth out movements
        b.vx *= 0.94;
        b.vy = b.vy * 0.95 + b.baseVy * 0.05; // Smoothly ease back to rising speed

        // Wrap around screen
        if (b.y < -b.r * 2) {
          b.y = H + b.r * 2;
          b.x = Math.random() * W;
        }
        if (b.x < -b.r * 2) b.x = W + b.r * 2;
        if (b.x > W + b.r * 2) b.x = -b.r * 2;

        // Calculate organic wobble based on time and position
        const time = Date.now() / 1000;
        const wobbleX = Math.sin(time * 3 + b.x) * (b.r * 0.05);
        const wobbleY = Math.cos(time * 2 + b.y) * (b.r * 0.05);

        ctx.save();
        ctx.translate(b.x, b.y);
        // Apply wobble deformation and slight stretch based on velocity
        const stretchX = 1 + Math.abs(b.vx) * 0.02 + wobbleX / b.r;
        const stretchY = 1 + Math.abs(b.vy) * 0.02 + wobbleY / b.r;
        ctx.scale(stretchX, stretchY);

        // 1. Transparent core with soft tinted edge glow
        const bgGradient = ctx.createRadialGradient(0, 0, b.r * 0.5, 0, 0, b.r);
        bgGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        bgGradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.05)');
        bgGradient.addColorStop(1, b.color);

        ctx.beginPath();
        ctx.arc(0, 0, b.r, 0, Math.PI * 2);
        ctx.fillStyle = bgGradient;
        ctx.fill();

        // 2. Iridescent thin-film interference edges
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)'; // Cyan outer
        ctx.beginPath(); ctx.arc(0, 0, b.r - 1, 0, Math.PI * 2); ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 0, 255, 0.4)'; // Magenta middle
        ctx.beginPath(); ctx.arc(0, 0, b.r - 2.5, 0, Math.PI * 2); ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 0, 0.3)'; // Yellow inner
        ctx.beginPath(); ctx.arc(0, 0, b.r - 4, 0, Math.PI * 2); ctx.stroke();

        // 3. Crisp white outer rim
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath(); ctx.arc(0, 0, b.r, 0, Math.PI * 2); ctx.stroke();

        // 4. Primary specular highlight (Curved window reflection)
        ctx.beginPath();
        ctx.arc(0, 0, b.r - b.r * 0.15, Math.PI * 1.15, Math.PI * 1.45);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = b.r * 0.12;
        ctx.lineCap = 'round';
        ctx.stroke();

        // 5. Secondary soft highlight reflection (bottom right)
        ctx.beginPath();
        ctx.arc(0, 0, b.r - b.r * 0.1, Math.PI * 0.25, Math.PI * 0.45);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = b.r * 0.06;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
