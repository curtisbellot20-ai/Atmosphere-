'use client';

import type { LinkBlock } from '@/types';

export default function LinkBlockView({
  block,
  accentColor,
}: {
  block: LinkBlock;
  accentColor: string;
}) {
  const { title, url, description, style } = block.data;

  if (style === 'card') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <p className="font-semibold text-white">{title}</p>
        {description && <p className="text-white/50 text-sm mt-1">{description}</p>}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ background: accentColor }}
      className="block w-full text-center py-3.5 rounded-2xl font-semibold text-white hover:opacity-90 transition-opacity"
    >
      {title}
    </a>
  );
}
