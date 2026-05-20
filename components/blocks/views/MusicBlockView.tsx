'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import type { MusicBlock } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function MusicBlockView({
  block,
  accentColor,
}: {
  block: MusicBlock;
  accentColor: string;
}) {
  const { title, artist, audioUrl, coverUrl, price } = block.data;
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function togglePlay() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5">
      {coverUrl ? (
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
          <Image src={coverUrl} alt={title} width={56} height={56} className="object-cover w-full h-full" />
        </div>
      ) : (
        <div
          className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl"
          style={{ background: accentColor + '33' }}
        >
          🎵
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white truncate">{title}</p>
        {artist && <p className="text-white/50 text-sm">{artist}</p>}
        {price && price > 0 && (
          <p className="text-xs mt-1" style={{ color: accentColor }}>
            {formatPrice(price)}
          </p>
        )}
      </div>

      {audioUrl && (
        <button
          onClick={togglePlay}
          style={{ background: accentColor }}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          {playing ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
        </button>
      )}

      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setPlaying(false)}
        />
      )}
    </div>
  );
}
