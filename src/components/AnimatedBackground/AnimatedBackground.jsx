import { useEffect, useRef, useState } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({ activeBackgroundIndex = 0 }) => {
  const canvasRef = useRef(null);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    if (activeBackgroundIndex === 0) {
      setColors([
        '#60a5fa',
        '#3b82f6',
        '#2563eb',
        '#1d4ed8',
        '#93c5fd',
        '#dbeafe',
      ]);
    } else {
      setColors([
        '#f472b6',
        '#ec4899',
        '#db2777',
        '#be185d',
        '#f9a8d4',
        '#fce7f3',
      ]);
    }
  }, [activeBackgroundIndex]);

  const colorsRef = useRef(colors);

  useEffect(() => {
    colorsRef.current = colors;
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || colors.length === 0) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 200;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        const edge = Math.random();
        if (edge < 0.25) {
          this.x = -10;
          this.y = Math.random() * canvas.height;
          this.speedX = Math.random() * 4 + 2;
          this.speedY = (Math.random() - 0.5) * 2;
        } else if (edge < 0.5) {
          this.x = canvas.width + 10;
          this.y = Math.random() * canvas.height;
          this.speedX = -(Math.random() * 4 + 2);
          this.speedY = (Math.random() - 0.5) * 2;
        } else if (edge < 0.75) {
          this.x = Math.random() * canvas.width;
          this.y = -10;
          this.speedX = (Math.random() - 0.5) * 2;
          this.speedY = Math.random() * 4 + 2;
        } else {
          this.x = Math.random() * canvas.width;
          this.y = canvas.height + 10;
          this.speedX = (Math.random() - 0.5) * 2;
          this.speedY = -(Math.random() * 4 + 2);
        }
        
        this.size = Math.random() * 1.5 + 1;
        this.color = colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)];
        this.opacity = Math.random() * 0.5 + 0.7;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < -50 || this.x > canvas.width + 50 ||
            this.y < -50 || this.y > canvas.height + 50) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors]);

  return (
    <>
      <div className="animated-background-base"></div>
      <canvas ref={canvasRef} className="animated-background-canvas" />
    </>
  );
};

export default AnimatedBackground;
