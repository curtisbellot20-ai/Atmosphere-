'use client';

import { useState, useRef } from 'react';
import type { GameReward } from '@/types';

const DEFAULT_REWARDS: GameReward[] = [
  { id: '1', label: '10% Off', type: 'discount', value: 'SAVE10', probability: 30, color: '#8b5cf6' },
  { id: '2', label: '20% Off', type: 'discount', value: 'SAVE20', probability: 20, color: '#ec4899' },
  { id: '3', label: 'Free Gift', type: 'prize', value: 'FREEGIFT', probability: 10, color: '#f59e0b' },
  { id: '4', label: 'Try Again', type: 'none', probability: 40, color: '#374151' },
];

export default function SpinWheel({
  rewards,
  accentColor,
}: {
  rewards: GameReward[];
  accentColor: string;
}) {
  const segments = rewards.length > 0 ? rewards : DEFAULT_REWARDS;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<GameReward | null>(null);
  const currentRotation = useRef(0);

  function drawWheel(rotation: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = cx - 10;
    const sliceAngle = (2 * Math.PI) / segments.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    segments.forEach((seg, i) => {
      const startAngle = rotation + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color ?? accentColor;
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(seg.label, radius - 10, 4);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const totalSpins = 5 + Math.random() * 5;
    const targetRotation =
      currentRotation.current + totalSpins * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const duration = 4000;
    const start = performance.now();
    const startRot = currentRotation.current;

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const rot = startRot + (targetRotation - startRot) * eased;

      drawWheel(rot);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        currentRotation.current = targetRotation % (2 * Math.PI);
        // Determine result
        const sliceAngle = (2 * Math.PI) / segments.length;
        // Pointer is at top (π * 1.5), find which segment it's in
        const normalised = ((2 * Math.PI - (currentRotation.current % (2 * Math.PI))) + Math.PI / 2) % (2 * Math.PI);
        const index = Math.floor(normalised / sliceAngle) % segments.length;
        setResult(segments[index]);
        setSpinning(false);
      }
    }

    // Initial draw
    drawWheel(currentRotation.current);
    requestAnimationFrame(animate);
  }

  // Draw on mount
  if (typeof window !== 'undefined') {
    setTimeout(() => drawWheel(currentRotation.current), 0);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Pointer */}
      <div className="relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 z-10"
          style={{
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: `20px solid ${accentColor}`,
          }}
        />
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="rounded-full"
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        style={{ background: spinning ? '#374151' : accentColor }}
        className="px-8 py-3 rounded-full font-bold text-white text-sm hover:opacity-90 transition-all disabled:cursor-not-allowed"
      >
        {spinning ? 'Spinning…' : 'SPIN!'}
      </button>

      {result && (
        <div className="text-center glass rounded-2xl p-4 w-full">
          <p className="text-white/50 text-xs uppercase tracking-widest mb-1">You got</p>
          <p className="text-2xl font-bold text-white">{result.label}</p>
          {result.value && (
            <p className="text-sm mt-2" style={{ color: accentColor }}>
              Code: <span className="font-mono font-bold">{result.value}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
