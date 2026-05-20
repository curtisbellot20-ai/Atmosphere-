import type { BookingBlock } from '@/types';

export default function BookingBlockView({
  block,
  accentColor,
}: {
  block: BookingBlock;
  accentColor: string;
}) {
  const { title, description, calendarUrl } = block.data;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      {description && <p className="text-white/50 text-sm mt-1">{description}</p>}
      {calendarUrl ? (
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: accentColor }}
          className="mt-4 block w-full text-center py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-opacity"
        >
          Book now
        </a>
      ) : (
        <p className="text-xs text-white/30 mt-3">No booking link set yet.</p>
      )}
    </div>
  );
}
