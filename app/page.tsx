import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <span className="text-xl font-bold gradient-text">Atmosphere</span>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-sm px-4 py-2 rounded-full gradient-brand text-white font-medium hover:opacity-90 transition-opacity"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Now in early access
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your digital identity,{' '}
            <span className="gradient-text">amplified</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            One link. Your website, store, music, games, and more — all in one
            customizable profile built to convert visitors into customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-full gradient-brand text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            >
              Build your profile →
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              See a demo
            </Link>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="px-6 py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need in one profile
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10 text-center text-sm text-white/30">
        © {new Date().getFullYear()} Atmosphere. All rights reserved.
      </footer>
    </main>
  );
}

const FEATURES = [
  {
    icon: '🔗',
    title: 'Smart Links',
    desc: 'Add unlimited links styled as buttons or cards to drive traffic anywhere.',
  },
  {
    icon: '🛍️',
    title: 'Built-in Store',
    desc: 'Sell products, services, or digital downloads directly from your profile.',
  },
  {
    icon: '🎵',
    title: 'Music Player',
    desc: 'Upload and sell your music. Let fans play it right on your profile.',
  },
  {
    icon: '🎮',
    title: 'Game Blocks',
    desc: 'Add spin wheels, quizzes, and scratch cards to capture leads and reward fans.',
  },
  {
    icon: '📅',
    title: 'Bookings',
    desc: 'Let visitors book time with you without leaving your profile.',
  },
  {
    icon: '📩',
    title: 'Lead Capture',
    desc: 'Collect emails and phone numbers with beautiful embedded forms.',
  },
];
