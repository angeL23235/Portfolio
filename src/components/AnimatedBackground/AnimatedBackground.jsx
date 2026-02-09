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
    const particleCount = 180;

    const footerHeight = 200;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
        this.initialY = 0;
        this.maxHeight = 0;
      }

      reset(initialDistribution = false) {
        const maxY = canvas.height - footerHeight;
        const margin = canvas.width * 0.02;
        const footerTop = canvas.height - footerHeight;
        
        this.x = margin + Math.random() * (canvas.width - margin * 2);
        this.initialX = this.x;
        
        if (initialDistribution) {
          this.y = Math.random() * footerTop;
        } else {
          this.y = footerTop - 20 + Math.random() * 30;
        }
        this.initialY = this.y;
        
        this.speedY = -(Math.random() * 0.6 + 0.4);
        this.size = Math.random() * 1.5 + 1;
        this.color = colorsRef.current[Math.floor(Math.random() * colorsRef.current.length)];
        this.opacity = Math.random() * 0.3 + 0.6;
        this.serpentTime = Math.random() * Math.PI * 2;
        this.serpentAmplitude = Math.random() * 8 + 5;
        this.serpentSpeed = Math.random() * 0.015 + 0.01;
      }

      update() {
        this.serpentTime += this.serpentSpeed;
        const distanceTraveled = this.initialY - this.y;
        const serpentOffset = Math.sin(this.serpentTime) * this.serpentAmplitude * (1 + distanceTraveled * 0.001);
        
        this.x = this.initialX + serpentOffset;
        this.y += this.speedY;
        this.speedY *= 0.9998;

        const footerTop = canvas.height - footerHeight;
        if (this.y < -50) {
          this.y = footerTop - 20 + Math.random() * 30;
          this.initialY = this.y;
          this.initialX = this.x;
        }
      }

      draw() {
        if (this.opacity <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const particle = new Particle();
      particle.reset(true);
      particles.push(particle);
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
