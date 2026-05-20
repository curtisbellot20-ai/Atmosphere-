'use client';

import type { Block } from '@/types';
import LinkBlockView from './views/LinkBlockView';
import TextBlockView from './views/TextBlockView';
import MusicBlockView from './views/MusicBlockView';
import StoreBlockView from './views/StoreBlockView';
import LeadCaptureBlockView from './views/LeadCaptureBlockView';
import BookingBlockView from './views/BookingBlockView';
import GameBlockView from './views/GameBlockView';

interface Props {
  block: Block;
  accentColor: string;
}

export default function BlockRenderer({ block, accentColor }: Props) {
  switch (block.type) {
    case 'link':         return <LinkBlockView block={block} accentColor={accentColor} />;
    case 'text':         return <TextBlockView block={block} />;
    case 'music':        return <MusicBlockView block={block} accentColor={accentColor} />;
    case 'store':        return <StoreBlockView block={block} accentColor={accentColor} />;
    case 'lead_capture': return <LeadCaptureBlockView block={block} accentColor={accentColor} />;
    case 'booking':      return <BookingBlockView block={block} accentColor={accentColor} />;
    case 'game':         return <GameBlockView block={block} accentColor={accentColor} />;
    default:             return null;
  }
}
