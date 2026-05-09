import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  ShieldCheck,
  ChevronDown,
  Check,
  Sparkles,
  Mail,
  Clock,
  Database,
  MapPin,
  Send,
  Inbox,
  Target,
  BarChart3,
  Handshake,
  Calendar,
  TrendingUp,
  Wallet,
  Building2,
  FileText,
  Coins,
  Users,
} from 'lucide-react';

// --- Mode (Organizer / Sponsor) ---

type Mode = 'organizer' | 'sponsor';

const ModeContext = createContext<{ mode: Mode; setMode: (m: Mode) => void }>({
  mode: 'organizer',
  setMode: () => {},
});

const useMode = () => useContext(ModeContext);

const STORAGE_KEY = 'cue.mode';
const QUERY_KEY = 'as';

const readInitialMode = (): Mode => {
  if (typeof window === 'undefined') return 'organizer';
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get(QUERY_KEY);
  if (fromQuery === 'sponsor' || fromQuery === 'organizer') return fromQuery;
  const fromStorage = window.localStorage.getItem(STORAGE_KEY);
  if (fromStorage === 'sponsor' || fromStorage === 'organizer') return fromStorage;
  return 'organizer';
};

// --- Shared Components ---

const PuzzlePiece = ({ color, className, rotation = 0, delay = 0 }: { color: string, className?: string, rotation?: number, delay?: number }) => (
  <motion.svg
    viewBox="0 0 100 100"
    initial={{ y: 0 }}
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute opacity-10 pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
    width="80"
    height="80"
  >
    <path
      d="M35,35 H20 A10,10 0 0,0 20,55 A10,10 0 0,1 20,75 H35 V90 A10,10 0 0,0 55,90 A10,10 0 0,1 75,90 V75 H90 A10,10 0 0,0 90,55 A10,10 0 0,1 90,35 H75 V20 A10,10 0 0,0 55,20 A10,10 0 0,1 35,20 Z"
      fill={color}
    />
  </motion.svg>
);

const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const baseStyle = "inline-flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/30 rounded-full px-6 py-3",
    secondary: "bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm hover:shadow-md rounded-full px-6 py-3",
    ghost: "text-slate-600 hover:text-sky-600 bg-transparent px-4 py-2",
    outline: "border-2 border-slate-200 text-slate-700 hover:border-sky-500 hover:text-sky-500 rounded-full px-6 py-3"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

type FadeInProps = { children: React.ReactNode; delay?: number; className?: string };
const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

// --- Mode Toggle (segmented control) ---

const ModeToggle = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const { mode, setMode } = useMode();
  const sizes = {
    sm: 'text-xs px-3 py-1',
    md: 'text-sm px-4 py-1.5',
  };
  const items: { key: Mode; label: string }[] = [
    { key: 'organizer', label: 'Organizers' },
    { key: 'sponsor', label: 'Sponsors' },
  ];
  return (
    <div className="relative inline-flex bg-slate-100 rounded-full p-1 border border-slate-200">
      {items.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setMode(key)}
          aria-pressed={mode === key}
          className={`relative ${sizes[size]} font-semibold rounded-full transition-colors z-10 ${mode === key ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
        >
          {mode === key && (
            <motion.div
              layoutId="modeIndicator"
              className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-200"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">{label}</span>
        </button>
      ))}
    </div>
  );
};

// --- Navbar ---

const Logo = () => (
  <button
    type="button"
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    aria-label="CUE by Calt — back to top"
    className="flex items-center gap-2 group cursor-pointer"
  >
    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white relative overflow-hidden group-hover:rotate-3 transition-transform">
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute w-2 h-2 bg-sky-400 rounded-sm top-1 right-1" />
      <span className="relative font-bold text-lg">C</span>
    </div>
    <div className="leading-none text-left">
      <div className="font-extrabold text-xl tracking-tight text-slate-900">CUE</div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold mt-0.5">by Calt</div>
    </div>
  </button>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const scrollToSignup = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/50 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <ModeToggle />
            <div className="flex items-center gap-6">
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">How it works</a>
              <a href="#why-cue" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Why CUE</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Pricing</a>
            </div>
            <Button className="!px-5 !py-2 text-sm" onClick={scrollToSignup}>Get Early Access</Button>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden absolute w-full"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-start shadow-xl">
              <div className="w-full pb-2">
                <ModeToggle />
              </div>
              <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 w-full p-2 hover:bg-slate-50 rounded-lg">How it works</a>
              <a href="#why-cue" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 w-full p-2 hover:bg-slate-50 rounded-lg">Why CUE</a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 w-full p-2 hover:bg-slate-50 rounded-lg">Pricing</a>
              <div className="w-full h-px bg-slate-100 my-2"></div>
              <Button className="w-full justify-center" onClick={() => { setIsOpen(false); scrollToSignup(); }}>Get Early Access</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Waitlist Form (carries role) ---

const WaitlistForm = ({ id = "hero-form", placeholder, ctaLabel }: { id?: string; placeholder: string; ctaLabel: string }) => {
  const { mode } = useMode();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz5d82rUwIq7hoLdeQVdE0ofL0ZNF94LGWIo7Ia-VwA_0UDI0Kya2knXQMMHvKs3DpgcA/exec';

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('role', mode);

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
        setStatus('success');
        setEmail('');
      } else if (result.status === 'duplicate') {
        setStatus('duplicate');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 text-green-700 px-6 py-4 rounded-xl flex items-center gap-3 border border-green-200 w-full max-w-md shadow-sm"
      >
        <CheckCircle className="text-green-500 fill-current bg-white rounded-full shrink-0" size={24} />
        <div>
          <p className="font-bold">You're on the list!</p>
          <p className="text-sm text-green-600">We'll be in touch soon.</p>
        </div>
      </motion.div>
    );
  }

  const getButtonText = () => {
    switch (status) {
      case 'loading': return 'Joining...';
      case 'duplicate': return 'Already Joined!';
      case 'error': return 'Error - Try Again';
      default: return ctaLabel;
    }
  };

  const getButtonClass = () => {
    switch (status) {
      case 'duplicate': return '!bg-amber-500 hover:!bg-amber-600 !shadow-amber-500/30 !text-white !border-amber-500';
      case 'error': return '!bg-red-500 hover:!bg-red-600 !shadow-red-500/30 !text-white !border-red-500';
      default: return '';
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative">
      <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
      <input
        id={`${id}-email`}
        type="email"
        name="email"
        autoComplete="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-6 py-3.5 rounded-full border border-slate-200 bg-white shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all text-slate-900 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
        required
        disabled={status === 'loading'}
      />
      <Button
        type="submit"
        disabled={status === 'loading'}
        className={`whitespace-nowrap shadow-xl shadow-sky-500/20 ${getButtonClass()}`}
      >
        {getButtonText()}
      </Button>
    </form>
  );
};

// --- Hero Visuals ---

const OrganizerHeroVisual = () => (
  <div className="relative w-full aspect-[4/3] max-w-lg mx-auto lg:ml-auto perspective-1000 mt-12 lg:mt-0">
    <div className="absolute -top-20 -right-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob" />
    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-rose-200/40 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />

    {/* Brief card (left, faded) */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-6 left-0 sm:left-2 w-56 bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-4 z-10"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
          <FileText size={14} className="text-sky-600" />
        </div>
        <div className="text-xs font-bold text-slate-900">Your brief</div>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between"><span className="text-slate-400">Event</span><span className="font-semibold text-slate-700">Tech Mixer Athens</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Audience</span><span className="font-semibold text-slate-700">22–35, tech</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Ask</span><span className="font-semibold text-slate-700">€5,000</span></div>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-sky-600">
        <Send size={10} /> Submitted · 2h ago
      </div>
    </motion.div>

    {/* Connecting bridge */}
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="absolute top-[40%] left-[40%] right-[40%] h-0.5 origin-left z-0"
      style={{ background: 'linear-gradient(90deg, #38bdf8, #c4b5fd)' }}
    >
      <motion.div
        animate={{ x: ['-10%', '110%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1.5 w-3 h-3 rounded-full bg-white shadow-md border border-sky-300"
      />
    </motion.div>

    {/* Sponsor confirmation card (right, prominent) */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="absolute top-10 right-0 sm:right-2 w-64 sm:w-72 bg-white rounded-3xl shadow-2xl shadow-sky-900/10 border border-white/50 z-20 overflow-hidden"
    >
      <div className="h-28 relative bg-gradient-to-br from-sky-500 to-blue-600">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, white 0, transparent 50%), radial-gradient(circle at 80% 70%, white 0, transparent 50%)' }} />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-green-700 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Matched
        </div>
        <div className="absolute bottom-3 left-4 text-white flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Building2 size={18} className="text-white" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider opacity-80">Sponsor</div>
            <h3 className="font-bold text-base leading-tight">Confirmed</h3>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center pb-3 border-b border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs">96%</div>
            <div className="text-xs text-slate-500 font-medium">Audience match</div>
          </div>
          <div className="text-sm font-bold text-slate-900">€5,000</div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Sparkles size={12} className="text-slate-400" />
          <span className="text-slate-500">Funding ready</span>
          <span className="font-bold text-slate-900 ml-auto">to deploy</span>
        </div>
      </div>
    </motion.div>

    {/* Floating badge */}
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-6 -left-2 sm:left-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30"
    >
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
        <Coins size={18} strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-[10px] text-slate-500 font-medium">No deal</div>
        <div className="text-sm font-bold text-slate-900">No fee</div>
      </div>
    </motion.div>
  </div>
);

const SponsorHeroVisual = () => (
  <div className="relative w-full aspect-[4/3] max-w-lg mx-auto lg:ml-auto perspective-1000 mt-12 lg:mt-0">
    <div className="absolute -top-20 -right-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob" />
    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />

    {/* Criteria card (left) */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-8 left-0 sm:left-2 w-60 bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 p-4 z-20"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
          <Target size={14} className="text-purple-600" />
        </div>
        <div className="text-xs font-bold text-slate-900">Your criteria</div>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between"><span className="text-slate-400">Audience</span><span className="font-semibold text-slate-700">25–40, tech</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Vibe</span><span className="font-semibold text-slate-700">Modern, urban</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Budget/yr</span><span className="font-semibold text-slate-700">€30,000</span></div>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-purple-600">
        <BarChart3 size={10} /> 12 events match
      </div>
    </motion.div>

    {/* Brief stack (right) */}
    <div className="absolute top-4 right-0 sm:right-2 w-64 sm:w-72 z-10">
      {[
        { name: 'Tech Mixer Athens', meta: '200 pax · €5k', match: '96%', delay: 0.2 },
        { name: 'Athens Design Week', meta: '1.2k pax · €12k', match: '91%', delay: 0.35 },
        { name: 'Startup Pitch Night', meta: '180 pax · €4k', match: '88%', delay: 0.5 },
      ].map((b, i) => (
        <motion.div
          key={b.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: b.delay }}
          className="bg-white rounded-2xl shadow-lg shadow-slate-900/5 border border-slate-100 p-4 mb-3 relative"
          style={{ marginLeft: i * 12 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                <FileText size={14} className="text-sky-600" />
              </div>
              <div className="text-xs font-bold text-slate-900 truncate">{b.name}</div>
            </div>
            <div className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">{b.match}</div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <MapPin size={10} /> Athens · <Users size={10} className="ml-0.5" /> {b.meta}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Connecting line */}
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="absolute top-[42%] left-[35%] right-[55%] h-0.5 origin-left z-0"
      style={{ background: 'linear-gradient(90deg, #c4b5fd, #38bdf8)' }}
    />

    {/* Floating badge */}
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      className="absolute bottom-2 -left-2 sm:left-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30"
    >
      <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
        <Database size={18} strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-[10px] text-slate-500 font-medium">Audience data</div>
        <div className="text-sm font-bold text-slate-900">From Calt</div>
      </div>
    </motion.div>
  </div>
);

// --- Hero ---

const HERO_COPY = {
  organizer: {
    eyebrow: 'For event organizers',
    body: 'Submit a one-page brief. CUE matches you to companies actively funding Athens’ cultural scene — no cold emails, no inside contacts.',
    placeholder: 'Your work email',
    cta: 'Join the organizer waitlist',
    note: <>From the makers of <strong>Calt</strong> — built in Athens.</>,
  },
  sponsor: {
    eyebrow: 'For corporate sponsors',
    body: 'Set your audience criteria once. Get pre-qualified Athens cultural events ranked on real attendance data — not whichever sponsorship deck landed first.',
    placeholder: 'Your work email',
    cta: 'Request sponsor access',
    note: <>Backed by partners across Athens’ cultural scene.</>,
  },
};

const Hero = () => {
  const { mode } = useMode();
  const copy = HERO_COPY[mode];

  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
      <PuzzlePiece color="#38bdf8" className="top-20 left-[10%] rotate-12" delay={0} />
      <PuzzlePiece color="#f43f5e" className="bottom-20 right-[5%] -rotate-12" delay={2} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-left max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`eyebrow-${mode}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Badge className="bg-sky-50 text-sky-700 border border-sky-100 mb-5">
                  <Sparkles size={12} className="mr-1.5" /> {copy.eyebrow}
                </Badge>
              </motion.div>
            </AnimatePresence>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.05]">
              Athens’ cultural <br className="hidden sm:block" /><span className="text-sky-500">sponsorship marketplace</span>.
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={`body-${mode}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg"
              >
                {copy.body}
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-col gap-6 items-start">
              <WaitlistForm placeholder={copy.placeholder} ctaLabel={copy.cta} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`note-${mode}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full"
                >
                  {copy.note}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                {mode === 'organizer' ? <OrganizerHeroVisual /> : <SponsorHeroVisual />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Problem ---

const PROBLEMS = {
  organizer: {
    headline: 'Funding shouldn’t depend on who you know.',
    sub: 'Most Athenian cultural events run on cold outreach, personal favors, and luck. The events that need it most rarely close the gap.',
    items: [
      { icon: <Mail className="text-red-500" size={22} />, title: 'Cold-email roulette', desc: 'Weeks of unanswered emails to people you’re not even sure hold the budget.' },
      { icon: <Building2 className="text-yellow-500" size={22} />, title: 'Closed doors', desc: 'Sponsorship in Athens is a relationship game. If you don’t know the right person, you don’t get the meeting.' },
      { icon: <Wallet className="text-blue-500" size={22} />, title: 'Opaque budgets', desc: 'No way to know which companies are actually allocating cultural budget this quarter.' },
    ],
  },
  sponsor: {
    headline: 'Cultural sponsorship shouldn’t be a gut call.',
    sub: 'Companies allocate real budget to culture every year, then spend it on whatever inbound request happens to land first. The good events stay invisible.',
    items: [
      { icon: <Inbox className="text-red-500" size={22} />, title: 'Inbound chaos', desc: '37 unsolicited proposals a month. None match your audience. None come with data.' },
      { icon: <BarChart3 className="text-yellow-500" size={22} />, title: 'No measurable ROI', desc: 'Decisions made on a deck and a logo placement. No sense of who actually shows up.' },
      { icon: <Handshake className="text-blue-500" size={22} />, title: 'Network bias', desc: 'The best events go to whoever has the right contact — not whoever fits your brand best.' },
    ],
  },
};

const Problem = () => {
  const { mode } = useMode();
  const block = PROBLEMS[mode];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{block.headline}</h2>
              <p className="text-lg text-slate-600">{block.sub}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {block.items.map((p, i) => (
                <FadeIn key={`${mode}-${i}`} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 h-full"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                      {p.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{p.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{p.desc}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- How It Works ---

const STEPS = {
  organizer: {
    headline: 'From brief to matched sponsor.',
    sub: 'No cold emails. No fee unless your deal closes.',
    items: [
      { icon: <FileText size={22} />, title: 'Submit a brief', desc: 'One page: your event, audience, ask, and dates. Takes 10 minutes.' },
      { icon: <Sparkles size={22} />, title: 'Get matched in 48h', desc: 'CUE surfaces your brief to sponsors whose audience criteria fit your event.' },
      { icon: <Handshake size={22} />, title: 'Close the deal', desc: 'Talk directly with the sponsor, sign, and run your event. CUE only earns when you do.' },
    ],
  },
  sponsor: {
    headline: 'From criteria to closed sponsorship.',
    sub: 'No more vetting random decks from your inbox.',
    items: [
      { icon: <Target size={22} />, title: 'Set your criteria', desc: 'Audience, vibe, budget range, geography. Tell CUE what an ideal event looks like for your brand.' },
      { icon: <Inbox size={22} />, title: 'Receive matched briefs', desc: 'Pre-qualified events delivered within 48 hours, ranked by audience fit and backed by Calt data.' },
      { icon: <TrendingUp size={22} />, title: 'Sponsor & measure', desc: 'Approve the match, deploy budget, and track real-world reach through your portfolio dashboard.' },
    ],
  },
};

const HowItWorks = () => {
  const { mode } = useMode();
  const block = STEPS[mode];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50/60 relative overflow-hidden">
      <PuzzlePiece color="#0ea5e9" className="top-20 right-[8%] -rotate-12 opacity-[0.07]" delay={1} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="bg-white text-slate-600 border border-slate-200 mb-4">
                <Clock size={12} className="mr-1.5" /> How it works
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{block.headline}</h2>
              <p className="text-lg text-slate-600">{block.sub}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
              {/* Connector line (desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200" />

              {block.items.map((s, i) => (
                <FadeIn key={`${mode}-step-${i}`} delay={i * 0.1}>
                  <div className="relative bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-sky-900/5 transition-all h-full">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30">
                        {s.icon}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Step 0{i + 1}</div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- Why CUE: Calt data layer + Athens credibility ---

const WHY_COPY = {
  organizer: {
    title: 'Sponsors come to you pre-qualified.',
    body: 'Your brief is shown to companies whose audience criteria match your event. They’re not browsing — they’re actively looking for events like yours, with real budget allocated.',
    bullets: [
      'No cold outreach to companies that may not have budget',
      'Audience match scores backed by Calt attendance data',
      'Direct line to decision-makers, not gatekeepers',
    ],
  },
  sponsor: {
    title: 'Match decisions backed by real audience data.',
    body: 'CUE sits on top of Calt — Athens’ #1 cultural-event discovery app. Every match is informed by who actually shows up to which events, what they engage with, and how communities respond.',
    bullets: [
      'Backed by a 5,000+ Athens audience and 8,000+ events hosted in the last year',
      'Audience demographics & engagement signals per event',
      'Portfolio analytics across all your sponsorships',
    ],
  },
};

const WhyCue = () => {
  const { mode } = useMode();
  const copy = WHY_COPY[mode];

  return (
    <section id="why-cue" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <Badge className="bg-purple-50 text-purple-700 border border-purple-100 mb-5">
              <Database size={12} className="mr-1.5" /> The Calt data layer
            </Badge>
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5">{copy.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">{copy.body}</p>
                <ul className="space-y-3 text-slate-700">
                  {copy.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-sky-500 mt-1 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </FadeIn>

          <FadeIn delay={0.2}>
            <CaltDataMockup />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const CaltDataMockup = () => (
  <div className="relative w-full max-w-md mx-auto">
    <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl opacity-60" />
    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-sky-200/40 rounded-full blur-3xl opacity-60" />

    <div className="relative bg-white rounded-3xl p-6 shadow-2xl shadow-slate-900/5 border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Audience overlap</div>
          <div className="text-lg font-bold text-slate-900">Tech Mixer Athens</div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
          <Database size={18} className="text-sky-400" />
        </div>
      </div>

      {/* Audience bars */}
      <div className="space-y-3 mb-5">
        {[
          { label: '22–35', value: 78, color: 'bg-sky-500' },
          { label: 'Tech / fintech', value: 64, color: 'bg-purple-500' },
          { label: 'Athens metro', value: 91, color: 'bg-emerald-500' },
        ].map((b, i) => (
          <div key={b.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-500 font-medium">{b.label}</span>
              <span className="font-bold text-slate-900">{b.value}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${b.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
                className={`h-full ${b.color} rounded-full`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
        <div className="flex -space-x-2">
          {['bg-sky-200', 'bg-purple-200', 'bg-emerald-200', 'bg-rose-200'].map((c, i) => (
            <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white`} />
          ))}
        </div>
        <div className="text-xs text-slate-500"><span className="font-bold text-slate-900">214 attendees</span> · last 6 months</div>
      </div>
    </div>

    {/* Floating credibility badge */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
    >
      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
        <ShieldCheck size={18} strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-[10px] text-slate-500 font-medium">GDPR-native</div>
        <div className="text-sm font-bold text-slate-900">EU-built</div>
      </div>
    </motion.div>
  </div>
);

// --- Athens credibility / partners strip ---

const PARTNER_LOGOS = [
  { src: '/partners/snfcc.png', alt: 'SNFCC' },
  { src: '/partners/onassis.png', alt: 'Onassis Foundation' },
  { src: '/partners/thisisathens.png', alt: 'This is Athens' },
  { src: '/partners/adidas.png', alt: 'Adidas' },
];

const PartnersCarousel = () => {
  const loop = [...PARTNER_LOGOS, ...PARTNER_LOGOS];
  return (
    <div
      className="overflow-hidden"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      }}
    >
      <div className="flex gap-16 sm:gap-24 animate-partners-scroll items-center">
        {loop.map((p, i) => (
          <img
            key={`${p.alt}-${i}`}
            src={p.src}
            alt={p.alt}
            className="h-14 sm:h-16 w-auto flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        ))}
      </div>
    </div>
  );
};

const Athens = () => (
  <section className="py-20 bg-slate-900 relative overflow-hidden">
    <PuzzlePiece color="#0ea5e9" className="top-10 left-10 opacity-20" rotation={45} />
    <PuzzlePiece color="#f59e0b" className="bottom-10 right-20 opacity-20" rotation={-15} />

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <FadeIn>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs font-bold text-white mb-6">
            <Star size={12} className="text-yellow-400 fill-current" />
            Built in Athens. For Athens.
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 max-w-3xl mx-auto leading-tight">
            Backed by the institutions powering Athens’ cultural scene.
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            CUE launches on top of Calt’s existing partnerships — the same network that already powers cultural discovery across the city.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <PartnersCarousel />
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-14 pt-10 border-t border-white/10">
          {[
            { v: '5,000+', l: 'total audience' },
            { v: '8,000+', l: 'events hosted last year' },
            { v: '€0', l: 'fee until you close' },
          ].map((s) => (
            <div key={s.l} className="text-white text-center">
              <div className="text-2xl sm:text-3xl font-extrabold mb-1">{s.v}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

// --- Pricing ---

const PRICING = {
  organizer: {
    headline: 'Free to brief. Pay only when you close.',
    sub: 'CUE earns a fee on the deal value — only when your sponsorship is signed and confirmed.',
    plans: [
      {
        tier: 'Brief',
        price: 'Free',
        priceSub: 'forever',
        desc: 'Submit unlimited briefs. No platform cost.',
        features: ['Unlimited briefs', '48h sponsor matching', 'Direct sponsor messaging', 'No fee unless you close'],
        cta: 'Submit a brief',
        recommended: true,
      },
      {
        tier: 'Featured',
        price: 'Coming 2026',
        priceSub: '',
        desc: 'Premium placement for high-profile events.',
        features: ['Priority in sponsor inboxes', 'Featured listing on Calt', 'Press & PR support', 'Custom audience reports'],
        cta: 'Join waitlist',
        recommended: false,
      },
    ],
  },
  sponsor: {
    headline: 'Pay per match. Or scale with Pro.',
    sub: 'Browse and post criteria for free. CUE takes a small fee on closed deals — no deal, no fee.',
    plans: [
      {
        tier: 'Pay-per-match',
        price: 'Variable',
        priceSub: 'transaction fee on closed deals — talk to us',
        desc: 'For occasional sponsors testing the waters.',
        features: ['Free criteria setup', 'Up to 4 sponsorships / year', 'Audience match scores', 'No deal, no fee'],
        cta: 'Request sponsor access',
        recommended: false,
      },
      {
        tier: 'Pro',
        price: 'Custom',
        priceSub: 'for high-volume sponsors',
        desc: 'For brands running 4+ sponsorships per year.',
        features: ['Reduced transaction fee', 'Priority matching', 'Portfolio analytics dashboard', 'Dedicated account manager'],
        cta: 'Talk to sales',
        recommended: true,
      },
    ],
  },
};

const Pricing = () => {
  const { mode } = useMode();
  const block = PRICING[mode];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{block.headline}</h2>
              <p className="text-slate-600 text-lg">{block.sub}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {block.plans.map((plan) => (
                <div
                  key={plan.tier}
                  className={`rounded-3xl p-8 flex flex-col relative ${plan.recommended ? 'border-2 border-sky-500 shadow-xl shadow-sky-500/10 bg-white md:-translate-y-2' : 'border border-slate-200 hover:border-sky-300 transition-colors'}`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">RECOMMENDED</div>
                  )}
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{plan.tier}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="text-4xl font-extrabold text-slate-900">{plan.price}</div>
                    {plan.priceSub && <div className="text-sm text-slate-500">{plan.priceSub}</div>}
                  </div>
                  <p className="text-sm text-slate-500 mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle size={16} className="text-sky-500 mt-0.5 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  {plan.cta === 'Talk to sales' ? (
                    <a
                      href="mailto:hello@calt.gr?subject=CUE%20Pro%20enquiry"
                      className={`inline-flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-200 w-full rounded-full px-6 py-3 ${plan.recommended ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/30' : 'border-2 border-slate-200 text-slate-700 hover:border-sky-500 hover:text-sky-500'}`}
                    >
                      {plan.cta}
                    </a>
                  ) : (
                    <Button
                      variant={plan.recommended ? 'primary' : 'outline'}
                      className="w-full"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      {plan.cta}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- FAQ ---

const FAQS = {
  organizer: [
    { q: 'When does CUE take a fee?', a: 'Only when your sponsorship deal is signed and confirmed. No deal, no fee. Browsing, briefing, and matching are all free.' },
    { q: 'What kinds of events qualify?', a: 'Cultural events of any size based in Athens — music, theatre, design, art, film, community, food, festivals, niche meetups. If it’s a public-facing cultural moment, it qualifies.' },
    { q: 'How do sponsors decide?', a: 'They set audience criteria (demographics, vibe, geography, budget). Your brief gets ranked against those criteria using real attendance data from the Calt app, then surfaced to sponsors who fit.' },
    { q: 'Do I have to use Calt as the ticketing platform?', a: 'No. CUE works regardless of how you sell tickets. Connecting your event to Calt amplifies discovery and improves your audience match score, but it’s never required.' },
    { q: 'Is my event data private?', a: 'Yes. CUE is GDPR-native and EU-built. Your brief is only shown to sponsors whose criteria match — never published publicly without your consent.' },
  ],
  sponsor: [
    { q: 'How is your audience data sourced?', a: 'From Calt, our consumer-facing event-discovery app, with a 5,000+ strong Athens audience and 8,000+ events hosted in the last year. We anonymize and aggregate attendance signals, then surface them as audience demographics, vibes, and engagement metrics per event.' },
    { q: 'How do payments work?', a: 'You pay the event organizer directly. CUE charges a transaction fee on the closed deal value — invoiced separately. No payment processing markup.' },
    { q: 'What’s the difference between Pay-per-match and Pro?', a: 'Pay-per-match suits occasional sponsors (under 4 deals / year). Pro gives high-volume sponsors a reduced transaction fee, priority matching, portfolio analytics, and a dedicated account manager.' },
    { q: 'Is this only Athens?', a: 'Athens first. Thessaloniki and Nicosia are next on the roadmap. The data layer expands city-by-city as Calt’s user base grows.' },
    { q: 'Is sponsor data secure?', a: 'Yes. Your criteria, budget, and portfolio are private and encrypted. We never share sponsor identity with organizers until you decide to engage.' },
  ],
};

const FAQ = () => {
  const { mode } = useMode();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = FAQS[mode];

  // Reset accordion when switching modes
  useEffect(() => { setOpenIndex(0); }, [mode]);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently asked questions</h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} size={20} />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- Final CTA ---

const FINAL_CTA = {
  organizer: {
    title: 'Stop chasing sponsors. Start matching with them.',
    sub: 'Submit your first brief in under 10 minutes. Get matched in 48 hours. Pay nothing unless you close.',
    cta: 'Join the organizer waitlist',
    placeholder: 'Your work email',
  },
  sponsor: {
    title: 'Deploy your cultural budget where it actually lands.',
    sub: 'Set your criteria once. Receive pre-qualified Athens events, every week, backed by real audience data.',
    cta: 'Request sponsor access',
    placeholder: 'Your work email',
  },
};

const FinalCta = () => {
  const { mode } = useMode();
  const copy = FINAL_CTA[mode];
  return (
    <section className="py-24 bg-gradient-to-br from-sky-50 via-white to-purple-50 relative overflow-hidden">
      <PuzzlePiece color="#38bdf8" className="top-10 left-[5%] rotate-12 opacity-[0.08]" delay={0} />
      <PuzzlePiece color="#a855f7" className="bottom-10 right-[5%] -rotate-12 opacity-[0.08]" delay={1.5} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight leading-[1.1]">{copy.title}</h2>
              <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto">{copy.sub}</p>
              <div className="flex justify-center">
                <WaitlistForm id="final-cta-form" placeholder={copy.placeholder} ctaLabel={copy.cta} />
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
};

// --- Footer ---

const Footer = () => {
  const { setMode } = useMode();

  const goToTopAs = (m: Mode) => {
    setMode(m);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToId = (m: Mode, id: string) => {
    setMode(m);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm text-slate-500 mb-4 max-w-xs">
              The cultural sponsorship marketplace for Athens. Built on Calt’s audience data.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">For organizers</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button type="button" onClick={() => scrollToId('organizer', 'how-it-works')} className="hover:text-sky-600 text-left">
                  How it works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId('organizer', 'pricing')} className="hover:text-sky-600 text-left">
                  Pricing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToTopAs('organizer')} className="hover:text-sky-600 text-left">
                  Submit a brief
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">For sponsors</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button type="button" onClick={() => scrollToId('sponsor', 'why-cue')} className="hover:text-sky-600 text-left">
                  Calt data layer
                </button>
              </li>
              <li>
                <button type="button" onClick={() => scrollToId('sponsor', 'pricing')} className="hover:text-sky-600 text-left">
                  Pricing
                </button>
              </li>
              <li>
                <button type="button" onClick={() => goToTopAs('sponsor')} className="hover:text-sky-600 text-left">
                  Get access
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="https://calt.gr" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600">
                  About Calt
                </a>
              </li>
              <li>
                <a href="mailto:hello@calt.gr" className="hover:text-sky-600">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Calt Technologies. CUE is operated by Calt. Built in Athens.</p>
        </div>
      </div>
    </footer>
  );
};

// --- App ---

const App = () => {
  const [mode, setModeState] = useState<Mode>(readInitialMode);

  const setMode = (m: Mode) => {
    setModeState(m);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, m);
      const url = new URL(window.location.href);
      url.searchParams.set(QUERY_KEY, m);
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <div className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-sky-200 selection:text-sky-900">
        <Navbar />
        <Hero />
        <Problem />
        <HowItWorks />
        <WhyCue />
        <Athens />
        <Pricing />
        <FAQ />
        <FinalCta />
        <Footer />
      </div>
    </ModeContext.Provider>
  );
};

export default App;
