'use client';

import { X } from 'lucide-react';
import type { BlockType } from '@/types';

const BLOCK_OPTIONS: { type: BlockType; icon: string; label: string; description: string }[] = [
  { type: 'link', icon: '🔗', label: 'Link', description: 'Add a button or card link' },
  { type: 'text', icon: '📝', label: 'Text', description: 'Add a text section' },
  { type: 'music', icon: '🎵', label: 'Music', description: 'Upload and play music' },
  { type: 'store', icon: '🛍️', label: 'Store Item', description: 'Sell a product or service' },
  { type: 'booking', icon: '📅', label: 'Booking', description: 'Let visitors book time' },
  { type: 'lead_capture', icon: '📩', label: 'Lead Capture', description: 'Collect emails and leads' },
  { type: 'game', icon: '🎮', label: 'Game', description: 'Add a spin wheel or quiz' },
];

interface Props {
  onAdd: (type: BlockType) => void;
  onClose: () => void;
}

export default function AddBlockModal({ onAdd, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="font-semibold text-lg">Add a block</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-4 grid grid-cols-1 gap-2">
          {BLOCK_OPTIONS.map((opt) => (
            <button
              key={opt.type}
              onClick={() => onAdd(opt.type)}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <span className="text-2xl">{opt.icon}</span>
              <div>
                <p className="font-medium text-sm">{opt.label}</p>
                <p className="text-xs text-white/40">{opt.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
