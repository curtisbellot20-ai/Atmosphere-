import type { TextBlock } from '@/types';

export default function TextBlockView({ block }: { block: TextBlock }) {
  const sizeClass = { sm: 'text-sm', md: 'text-base', lg: 'text-xl' }[block.data.size];
  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }[block.data.align];

  return (
    <p className={`text-white/80 ${sizeClass} ${alignClass} whitespace-pre-wrap`}>
      {block.data.content}
    </p>
  );
}
