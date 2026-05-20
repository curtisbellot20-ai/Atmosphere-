'use client';

import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Block } from '@/types';
import BlockEditForm from './BlockEditForm';

interface Props {
  block: Block;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, data: Partial<Block['data']>) => void;
}

export default function SortableBlockItem({ block, onDelete, onToggle, onUpdate }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const BLOCK_ICONS: Record<Block['type'], string> = {
    link: '🔗',
    text: '📝',
    music: '🎵',
    store: '🛍️',
    booking: '📅',
    lead_capture: '📩',
    game: '🎮',
  };

  const BLOCK_LABELS: Record<Block['type'], string> = {
    link: 'Link',
    text: 'Text',
    music: 'Music',
    store: 'Store',
    booking: 'Booking',
    lead_capture: 'Lead Capture',
    game: 'Game',
  };

  return (
    <div ref={setNodeRef} style={style} className="glass rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-white/30 hover:text-white/60 cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={18} />
        </button>

        {/* Icon + label */}
        <span className="text-lg">{BLOCK_ICONS[block.type]}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{BLOCK_LABELS[block.type]}</p>
          <p className="text-xs text-white/40 truncate">
            {'title' in block.data ? block.data.title : block.data.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggle(block.id)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
            title={block.visible ? 'Hide' : 'Show'}
          >
            {block.visible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={() => onDelete(block.id)}
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-white/5 pt-3">
          <BlockEditForm block={block} onUpdate={(data) => onUpdate(block.id, data)} />
        </div>
      )}
    </div>
  );
}
