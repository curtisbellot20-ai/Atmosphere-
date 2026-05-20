'use client';

import type { Block } from '@/types';

interface Props {
  block: Block;
  onUpdate: (data: Partial<Block['data']>) => void;
}

export default function BlockEditForm({ block, onUpdate }: Props) {
  switch (block.type) {
    case 'link':
      return (
        <div className="space-y-3">
          <Field
            label="Title"
            value={block.data.title}
            onChange={(v) => onUpdate({ title: v })}
          />
          <Field
            label="URL"
            value={block.data.url}
            onChange={(v) => onUpdate({ url: v })}
            placeholder="https://"
          />
          <div>
            <label className="text-xs text-white/50 block mb-1">Style</label>
            <select
              value={block.data.style}
              onChange={(e) => onUpdate({ style: e.target.value as 'button' | 'card' })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="button">Button</option>
              <option value="card">Card</option>
            </select>
          </div>
        </div>
      );

    case 'text':
      return (
        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/50 block mb-1">Content</label>
            <textarea
              value={block.data.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none resize-none"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-white/50 block mb-1">Align</label>
              <select
                value={block.data.align}
                onChange={(e) => onUpdate({ align: e.target.value as 'left' | 'center' | 'right' })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs text-white/50 block mb-1">Size</label>
              <select
                value={block.data.size}
                onChange={(e) => onUpdate({ size: e.target.value as 'sm' | 'md' | 'lg' })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
          </div>
        </div>
      );

    case 'music':
      return (
        <div className="space-y-3">
          <Field label="Track title" value={block.data.title} onChange={(v) => onUpdate({ title: v })} />
          <Field label="Artist" value={block.data.artist} onChange={(v) => onUpdate({ artist: v })} />
          <Field label="Audio URL" value={block.data.audioUrl} onChange={(v) => onUpdate({ audioUrl: v })} placeholder="https://…" />
          <Field label="Cover image URL (optional)" value={block.data.coverUrl ?? ''} onChange={(v) => onUpdate({ coverUrl: v })} />
        </div>
      );

    case 'store':
      return (
        <div className="space-y-3">
          <Field label="Product name" value={block.data.title} onChange={(v) => onUpdate({ title: v })} />
          <Field label="Description" value={block.data.description} onChange={(v) => onUpdate({ description: v })} />
          <Field label="Price (USD)" value={String(block.data.price)} onChange={(v) => onUpdate({ price: parseFloat(v) || 0 })} />
          <Field label="Checkout URL" value={block.data.checkoutUrl ?? ''} onChange={(v) => onUpdate({ checkoutUrl: v })} placeholder="https://…" />
        </div>
      );

    case 'lead_capture':
      return (
        <div className="space-y-3">
          <Field label="Headline" value={block.data.headline} onChange={(v) => onUpdate({ headline: v })} />
          <Field label="Subtext" value={block.data.subtext} onChange={(v) => onUpdate({ subtext: v })} />
          <Field label="Button text" value={block.data.ctaText} onChange={(v) => onUpdate({ ctaText: v })} />
          <Field label="Success message" value={block.data.successMessage} onChange={(v) => onUpdate({ successMessage: v })} />
        </div>
      );

    case 'booking':
      return (
        <div className="space-y-3">
          <Field label="Title" value={block.data.title} onChange={(v) => onUpdate({ title: v })} />
          <Field label="Description" value={block.data.description} onChange={(v) => onUpdate({ description: v })} />
          <Field label="Calendar URL (Calendly/Cal.com)" value={block.data.calendarUrl} onChange={(v) => onUpdate({ calendarUrl: v })} placeholder="https://calendly.com/…" />
        </div>
      );

    case 'game':
      return (
        <div className="space-y-3">
          <Field label="Title" value={block.data.title} onChange={(v) => onUpdate({ title: v })} />
          <Field label="Description" value={block.data.description} onChange={(v) => onUpdate({ description: v })} />
          <div>
            <label className="text-xs text-white/50 block mb-1">Game type</label>
            <select
              value={block.data.gameType}
              onChange={(e) => onUpdate({ gameType: e.target.value as 'spin_wheel' | 'scratch_card' | 'quiz' })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="spin_wheel">Spin Wheel</option>
              <option value="scratch_card">Scratch Card</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1">Entry condition</label>
            <select
              value={block.data.entryCondition}
              onChange={(e) => onUpdate({ entryCondition: e.target.value as 'free' | 'email' | 'payment' })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="free">Free to play</option>
              <option value="email">Requires email</option>
              <option value="payment">Pay to play</option>
            </select>
          </div>
        </div>
      );

    default:
      return <p className="text-xs text-white/30">No settings for this block yet.</p>;
  }
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs text-white/50 block mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500 transition-colors"
      />
    </div>
  );
}
