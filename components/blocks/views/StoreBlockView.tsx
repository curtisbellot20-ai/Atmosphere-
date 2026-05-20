import type { StoreBlock } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function StoreBlockView({
  block,
  accentColor,
}: {
  block: StoreBlock;
  accentColor: string;
}) {
  const { title, description, price, currency, imageUrl, checkoutUrl } = block.data;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      {imageUrl && (
        <div className="w-full h-40 bg-white/5">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-white">{title}</p>
            {description && <p className="text-white/50 text-sm mt-1">{description}</p>}
          </div>
          <p className="font-bold text-lg flex-shrink-0" style={{ color: accentColor }}>
            {formatPrice(price, currency)}
          </p>
        </div>
        {checkoutUrl && (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: accentColor }}
            className="mt-4 block w-full text-center py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-opacity"
          >
            Buy now
          </a>
        )}
      </div>
    </div>
  );
}
