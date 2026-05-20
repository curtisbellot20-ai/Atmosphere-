'use client';

import { useState } from 'react';
import type { LeadCaptureBlock } from '@/types';
import { saveLead } from '@/lib/db';

export default function LeadCaptureBlockView({
  block,
  accentColor,
}: {
  block: LeadCaptureBlock;
  accentColor: string;
}) {
  const { headline, subtext, collectEmail, collectPhone, ctaText, successMessage } = block.data;
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await saveLead({
        profileId: '',  // filled at runtime from profile context
        blockId: block.id,
        email: collectEmail ? email : undefined,
        phone: collectPhone ? phone : undefined,
        capturedAt: Date.now(),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-white font-semibold">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="font-bold text-white text-lg">{headline}</h3>
      {subtext && <p className="text-white/50 text-sm mt-1">{subtext}</p>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        {collectEmail && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 text-white placeholder-white/30"
          />
        )}
        {collectPhone && (
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/30 text-white placeholder-white/30"
          />
        )}
        <button
          type="submit"
          disabled={loading}
          style={{ background: accentColor }}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? 'Submitting…' : ctaText}
        </button>
      </form>
    </div>
  );
}
