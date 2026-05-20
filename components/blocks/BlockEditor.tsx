'use client';

import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import type { UserProfile, Block, BlockType } from '@/types';
import { useProfile } from '@/hooks/useProfile';
import SortableBlockItem from './SortableBlockItem';
import AddBlockModal from './AddBlockModal';

export default function BlockEditor({ profile }: { profile: UserProfile }) {
  const { saveBlocks, saving } = useProfile();
  const [blocks, setBlocks] = useState<Block[]>(
    [...profile.blocks].sort((a, b) => a.order - b.order)
  );
  const [showModal, setShowModal] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    const reordered = arrayMove(blocks, oldIndex, newIndex).map((b, i) => ({
      ...b,
      order: i,
    }));
    setBlocks(reordered);
    saveBlocks(reordered);
  }

  function addBlock(type: BlockType) {
    const newBlock = createDefaultBlock(type, blocks.length);
    const updated = [...blocks, newBlock];
    setBlocks(updated);
    saveBlocks(updated);
    setShowModal(false);
  }

  function deleteBlock(id: string) {
    const updated = blocks.filter((b) => b.id !== id).map((b, i) => ({ ...b, order: i }));
    setBlocks(updated);
    saveBlocks(updated);
  }

  function toggleBlock(id: string) {
    const updated = blocks.map((b) =>
      b.id === id ? { ...b, visible: !b.visible } : b
    );
    setBlocks(updated);
    saveBlocks(updated);
  }

  function updateBlock(id: string, data: Partial<Block['data']>) {
    const updated = blocks.map((b) =>
      b.id === id ? { ...b, data: { ...b.data, ...data } } : b
    ) as Block[];
    setBlocks(updated);
    saveBlocks(updated);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg">Your Blocks</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-brand text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Add block
        </button>
      </div>

      {blocks.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-white/40 text-sm">No blocks yet. Add your first block!</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {blocks.map((block) => (
                <SortableBlockItem
                  key={block.id}
                  block={block}
                  onDelete={deleteBlock}
                  onToggle={toggleBlock}
                  onUpdate={updateBlock}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showModal && (
        <AddBlockModal onAdd={addBlock} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

function createDefaultBlock(type: BlockType, order: number): Block {
  const base = { id: uuid(), order, visible: true, createdAt: Date.now() };
  switch (type) {
    case 'link':
      return { ...base, type: 'link', data: { title: 'My Link', url: 'https://', style: 'button' } };
    case 'text':
      return { ...base, type: 'text', data: { content: 'Add some text here…', align: 'center', size: 'md' } };
    case 'music':
      return { ...base, type: 'music', data: { title: 'My Track', artist: '', audioUrl: '' } };
    case 'store':
      return { ...base, type: 'store', data: { title: 'Product', description: '', price: 0, currency: 'USD' } };
    case 'booking':
      return { ...base, type: 'booking', data: { title: 'Book a session', description: '', calendarUrl: '' } };
    case 'lead_capture':
      return { ...base, type: 'lead_capture', data: { headline: 'Stay in touch', subtext: '', collectEmail: true, collectPhone: false, ctaText: 'Subscribe', successMessage: 'Thank you!' } };
    case 'game':
      return { ...base, type: 'game', data: { gameType: 'spin_wheel', title: 'Spin to Win!', description: 'Try your luck', entryCondition: 'free', rewards: [] } };
  }
}
