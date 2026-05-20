'use client';

import { useState } from 'react';
import type { GameBlock } from '@/types';
import SpinWheel from '@/components/games/SpinWheel';

export default function GameBlockView({
  block,
  accentColor,
}: {
  block: GameBlock;
  accentColor: string;
}) {
  const { gameType, title, description, entryCondition, rewards } = block.data;
  const [email, setEmail] = useState('');
  const [gateOpen, setGateOpen] = useState(entryCondition === 'free');

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setGateOpen(true);
  }

  if (!gateOpen) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-bold text-white text-lg">{title}</h3>
        {description && <p className="text-white/50 text-sm mt-1">{description}</p>}
        {entryCondition === 'email' && (
          <form onSubmit={handleEmailSubmit} className="mt-4 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email to play"
              className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none text-white placeholder-white/30"
            />
            <button
              type="submit"
              style={{ background: accentColor }}
              className="px-5 py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90"
            >
              Play
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="font-bold text-white text-lg text-center mb-4">{title}</h3>
      {gameType === 'spin_wheel' && (
        <SpinWheel rewards={rewards} accentColor={accentColor} />
      )}
      {gameType !== 'spin_wheel' && (
        <p className="text-white/40 text-sm text-center">Game coming soon!</p>
      )}
    </div>
  );
}
