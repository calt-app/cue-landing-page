import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Play, 
  MapPin, 
  Calendar, 
  Users, 
  Mail, 
  FileSpreadsheet, 
  Clock, 
  ArrowRight,
  Download,
  Menu,
  X,
  Star,
  Zap,
  ShieldCheck,
  Building2,
  ChevronDown,
  Layout,
  Search,
  Check
} from 'lucide-react';

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

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
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

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/50 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white relative overflow-hidden group-hover:rotate-3 transition-transform">
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute w-2 h-2 bg-sky-400 rounded-sm top-1 right-1" />
              <span className="relative font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Cue</span>
          </a>

          {/* Desktop Nav & CTA Grouped */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">How it works</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Pricing</a>
            </div>

            <div className="flex items-center gap-4">
              {/* <a href="#" className="text-sm font-semibold text-slate-900 hover:text-sky-600">Login</a> */}
              <Button className="px-5 py-2 text-sm">Get Early Access</Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden absolute w-full"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col items-start shadow-xl">
              <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 w-full p-2 hover:bg-slate-50 rounded-lg">How it works</a>
              <a href="#features" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 w-full p-2 hover:bg-slate-50 rounded-lg">Features</a>
              <a href="#pricing" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-900 w-full p-2 hover:bg-slate-50 rounded-lg">Pricing</a>
              <div className="w-full h-px bg-slate-100 my-2"></div>
              <Button className="w-full justify-center">Get Early Access</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const WaitlistForm = ({ id = "hero-form" }: { id?: string }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative">
      <input
        type="email"
        placeholder="Enter your work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-6 py-3.5 rounded-full border border-slate-200 bg-white shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition-all text-slate-900 placeholder:text-slate-400"
        required
      />
      <Button type="submit" disabled={status === 'loading'} className="whitespace-nowrap shadow-xl shadow-sky-500/20">
        {status === 'loading' ? 'Joining...' : 'Get Early Access'}
      </Button>
    </form>
  );
};

const HeroVisual = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-lg mx-auto lg:ml-auto perspective-1000 mt-12 lg:mt-0">
      {/* Background Decorative Blobs */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl mix-blend-multiply filter opacity-70 animate-blob animation-delay-2000" />
      
      {/* Messy Before State - "Old Way" */}
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [-6, -9, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-0 sm:left-4 w-48 h-36 bg-slate-50 rounded-xl border border-slate-200 shadow-lg flex flex-col items-center justify-center gap-2 z-0 opacity-60 backdrop-blur-sm"
      >
        <Mail className="w-8 h-8 text-slate-400" />
        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">37 Unread Threads</span>
      </motion.div>
     
      <motion.div 
        animate={{ y: [0, 8, 0], rotate: [6, 9, 6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-28 -left-4 sm:left-0 w-48 h-36 bg-slate-50 rounded-xl border border-slate-200 shadow-lg flex flex-col items-center justify-center gap-2 z-10 opacity-70 backdrop-blur-sm"
      >
        <FileSpreadsheet className="w-8 h-8 text-slate-400" />
        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">Budget_v12_FINAL.xlsx</span>
      </motion.div>

      {/* Clean After State - "Cue Way" */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-12 right-0 sm:right-4 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl shadow-sky-900/10 border border-white/50 z-20 overflow-hidden"
      >
        {/* Card Header Image */}
        <div className="h-40 bg-slate-100 relative group">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800" 
            alt="Venue" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 text-white">
            <h3 className="font-bold text-lg leading-tight">The Foundry</h3>
            <p className="text-xs text-white/80">Athens, Greece</p>
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-green-700 shadow-sm">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Booked
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-50">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-bold text-xs">94%</div>
                <div className="text-xs text-slate-500 font-medium">Match Score</div>
             </div>
             <div className="text-xs font-semibold text-slate-900">€2,400 est.</div>
          </div>
          
          <div className="space-y-3">
             <div className="flex items-start gap-3">
                <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-slate-300 relative top-1.5" />
                <div className="flex-1 bg-slate-50 rounded p-2 text-xs">
                  <div className="font-semibold text-slate-700">09:00 - Welcome Coffee</div>
                  <div className="text-slate-400">Lobby Area</div>
                </div>
             </div>
             <div className="flex items-start gap-3">
                <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-sky-400 relative top-1.5" />
                <div className="flex-1 bg-sky-50 rounded p-2 text-xs border border-sky-100">
                  <div className="font-semibold text-sky-900">10:00 - Q3 Strategy Workshop</div>
                  <div className="text-sky-600">Main Hall • 45 pax</div>
                </div>
             </div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating Badge */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-30"
      >
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
          <Check size={20} strokeWidth={3} />
        </div>
        <div>
          <div className="text-xs text-slate-500 font-medium">All vendors</div>
          <div className="text-sm font-bold text-slate-900">Confirmed</div>
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <PuzzlePiece color="#38bdf8" className="top-20 left-[10%] rotate-12" delay={0} />
      <PuzzlePiece color="#f43f5e" className="bottom-20 right-[5%] -rotate-12" delay={2} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-left max-w-2xl">
            <FadeIn>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
                From event brief to <span className="text-sky-500">booked venue</span> in 48 hours.
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                AI-powered venue discovery and agenda planning for corporate teams who don’t have time to waste on RFPs and spreadsheets.
              </p>
              
              <div className="flex flex-col gap-6 items-start">
                <WaitlistForm />
                <div className="flex items-center gap-6">
                  <div className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    From the makers of <strong>Calt</strong>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          
          <FadeIn delay={0.2} className="w-full">
            <HeroVisual />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  const problems = [
    {
      icon: <Mail className="text-red-500" size={24} />,
      title: "Weeks wasted",
      desc: "Sending 37 emails just to get one venue quote that fits your budget."
    },
    {
      icon: <FileSpreadsheet className="text-yellow-500" size={24} />,
      title: "Spreadsheet hell",
      desc: "Manually tracking capacity, costs, and availability across 5 different tabs."
    },
    {
      icon: <Layout className="text-blue-500" size={24} />,
      title: "Agenda chaos",
      desc: "Struggling to build a schedule that flows well with the venue's layout."
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Event planning shouldn't feel like a full-time job.</h2>
          <p className="text-lg text-slate-600">Most teams spend 80% of their time on logistics and only 20% on the experience.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
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
      </div>
    </section>
  );
};

const FeatureSection = () => {
  return (
    <section id="features" className="py-24 overflow-hidden bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Feature 1 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-900/5 border border-slate-100 relative">
               <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">AI Analysis</div>
               <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" className="rounded-2xl w-full h-64 object-cover mb-6 opacity-90" alt="Meeting room" />
               <div className="flex justify-between items-end">
                 <div>
                   <div className="text-sm text-slate-500 mb-1">Compatibility</div>
                   <div className="text-3xl font-bold text-slate-900">98%</div>
                 </div>
                 <div className="space-y-2 text-right">
                   <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded inline-block">Within Budget</div>
                   <div className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-1 rounded inline-block ml-2">Vibe Match</div>
                 </div>
               </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6">
              <Search size={24} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Smart Venue Matching</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Tell us your vibe, budget, and size. Cue’s AI scans thousands of venues (using real reviews and data) to find your top 3 matches instantly.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-sky-500" /> <span>Real-time availability checking</span></li>
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-sky-500" /> <span>Hidden gem discovery</span></li>
              <li className="flex items-center gap-3"><CheckCircle size={18} className="text-sky-500" /> <span>Direct price negotiation</span></li>
            </ul>
          </FadeIn>
        </div>

        {/* Feature 2 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn className="order-1">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
              <Layout size={24} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Instant Agenda Scaffolding</h3>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Don’t start from scratch. Cue generates a first-draft agenda based on your event type and venue layout, optimizing flow and breaks.
            </p>
            <Button variant="outline" className="gap-2">
               Try generating agenda <ArrowRight size={16} />
            </Button>
          </FadeIn>
          <FadeIn delay={0.2} className="order-2">
             <div className="bg-white rounded-3xl p-6 shadow-xl shadow-purple-900/5 border border-slate-100 relative overflow-hidden">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-3 h-3 rounded-full bg-red-400" />
                 <div className="w-3 h-3 rounded-full bg-yellow-400" />
                 <div className="w-3 h-3 rounded-full bg-green-400" />
               </div>
               <div className="space-y-3">
                 {[1, 2, 3].map((i) => (
                   <motion.div 
                    key={i}
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100"
                   >
                     <div className="text-xs font-bold text-slate-400 w-12">{9 + i}:00</div>
                     <div className="h-8 w-1 bg-purple-200 rounded-full" />
                     <div className="flex-1">
                       <div className="h-2 w-24 bg-slate-200 rounded mb-2" />
                       <div className="h-2 w-16 bg-slate-100 rounded" />
                     </div>
                     <Menu size={16} className="text-slate-300" />
                   </motion.div>
                 ))}
               </div>
             </div>
          </FadeIn>
        </div>

        {/* Feature 3 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn className="order-2 lg:order-1">
             <div className="bg-slate-900 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10 flex flex-col h-64 justify-center items-center text-center">
                 <FileSpreadsheet size={48} className="mb-4 text-sky-400" />
                 <h4 className="text-xl font-bold mb-2">Q3_Offsite_Proposal.pdf</h4>
                 <p className="text-slate-400 text-sm mb-6">Ready for stakeholder review</p>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2"
                 >
                   <Download size={16} /> Download Proposal
                 </motion.button>
               </div>
             </div>
          </FadeIn>
          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Stakeholder-Ready Exports</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Get internal buy-in faster. Export professional PDF decks with budget breakdowns, venue options, and comparisons in one click.
            </p>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

const CaltAdvantage = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background patterns */}
      <PuzzlePiece color="#0ea5e9" className="top-10 left-10 opacity-20" rotation={45} />
      <PuzzlePiece color="#f59e0b" className="bottom-10 right-20 opacity-20" rotation={-15} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs font-bold text-white mb-6">
              <Star size={12} className="text-yellow-400 fill-current" />
              The Calt Advantage
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Public event? <br/>Reach thousands on Calt.
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Cue is connected to Calt, the #1 event discovery app. Publish your event, and we automatically list it to thousands of locals in your city—for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                   <Users size={20} className="text-sky-400" />
                </div>
                <div>
                  <div className="font-bold">Instant Audience</div>
                  <div className="text-xs text-slate-400">Access 50k+ local users</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                   <Zap size={20} className="text-yellow-400" />
                </div>
                <div>
                  <div className="font-bold">Zero Friction</div>
                  <div className="text-xs text-slate-400">Syncs in one click</div>
                </div>
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="flex justify-center lg:justify-end">
             <div className="relative w-64 h-[500px] bg-slate-800 rounded-[3rem] border-8 border-slate-700 shadow-2xl overflow-hidden">
               {/* Phone Notch */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-700 rounded-b-xl z-20" />
               
               {/* Screen Content */}
               <div className="w-full h-full bg-white relative">
                 {/* App Header */}
                 <div className="h-16 bg-slate-50 border-b border-slate-100 pt-8 px-4 flex justify-between items-center">
                    <span className="font-bold text-slate-900">Calt</span>
                    <div className="w-6 h-6 rounded-full bg-slate-200" />
                 </div>
                 {/* Feed Item (Our Event) */}
                 <div className="p-4 space-y-4">
                   <div className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                      <div className="h-24 bg-sky-500 relative">
                        <div className="absolute top-2 right-2 bg-white/20 backdrop-blur px-2 py-0.5 rounded text-[10px] text-white font-bold">Featured</div>
                      </div>
                      <div className="p-3">
                        <div className="text-xs font-bold text-sky-600 mb-1">TOMORROW</div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Tech Mixer Athens</h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500">
                           <MapPin size={10} /> The Foundry
                        </div>
                      </div>
                   </div>
                   {/* Dummy Items */}
                   <div className="h-24 bg-slate-100 rounded-xl" />
                   <div className="h-24 bg-slate-100 rounded-xl" />
                 </div>
                 
                 {/* Bottom Nav */}
                 <div className="absolute bottom-0 w-full h-14 bg-white border-t border-slate-100 flex justify-around items-center px-4">
                    <div className="w-6 h-6 bg-slate-900 rounded-full" />
                    <div className="w-6 h-6 bg-slate-200 rounded-full" />
                    <div className="w-6 h-6 bg-slate-200 rounded-full" />
                 </div>
               </div>
             </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Simple per-seat pricing.</h2>
          <p className="text-slate-600">Start for free, upgrade when you scale.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <div className="border border-slate-200 rounded-3xl p-8 hover:border-sky-300 transition-colors flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Free</h3>
            <div className="text-4xl font-extrabold text-slate-900 mb-2">€0<span className="text-base font-normal text-slate-500">/mo</span></div>
            <p className="text-sm text-slate-500 mb-6">Testing.</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle size={16} className="text-sky-500" /> 1 Event</li>
              <li className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle size={16} className="text-sky-500" /> Basic Venue Matching</li>
              <li className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle size={16} className="text-sky-500" /> Standard Support</li>
            </ul>
            <Button variant="outline" className="w-full">Start Free</Button>
          </div>

          {/* Pro */}
          <div className="border-2 border-sky-500 rounded-3xl p-8 relative shadow-xl shadow-sky-500/10 bg-white transform md:-translate-y-4 flex flex-col">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">MOST POPULAR</div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Pro</h3>
            <div className="text-4xl font-extrabold text-slate-900 mb-2">€49<span className="text-base font-normal text-slate-500">/seat/mo</span></div>
            <p className="text-sm text-slate-500 mb-6">Small Teams.</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle size={16} className="text-sky-500" /> Unlimited Events</li>
              <li className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle size={16} className="text-sky-500" /> Unlimited Guest Viewers (Read-only)</li>
              <li className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle size={16} className="text-sky-500" /> AI Agenda Builder</li>
            </ul>
            <Button variant="primary" className="w-full">Get Started</Button>
          </div>

          {/* Team */}
          <div className="border border-slate-200 rounded-3xl p-8 hover:border-sky-300 transition-colors flex flex-col">
            <h3 className="font-bold text-slate-900 text-lg mb-2">Team</h3>
            <div className="text-4xl font-extrabold text-slate-900 mb-2">€89<span className="text-base font-normal text-slate-500">/seat/mo</span></div>
            <p className="text-sm text-slate-500 mb-6">Agencies.</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle size={16} className="text-sky-500" /> White-label Exports</li>
              <li className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle size={16} className="text-sky-500" /> Client Portals</li>
              <li className="flex items-center gap-3 text-sm text-slate-700"><CheckCircle size={16} className="text-sky-500" /> Priority Support</li>
            </ul>
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    { 
      q: "Which cities does Cue cover?", 
      a: "Cue is launching with coverage in major European hubs. Our AI-driven venue discovery engine works globally by leveraging extensive online data, but our curated ‘Verified Venue’ network is rolling out city-by-city across Europe. You can use our planning and agenda tools for an event anywhere in the world." 
    },
    { 
      q: "Do I pay the venues through Cue?", 
      a: "Not yet. Cue streamlines the discovery and planning process. When you’re ready to book, we connect you directly with the venue to handle contracts and payments. This ensures you get direct pricing without middleman markups." 
    },
    { 
      q: "How does the AI know which venues are ‘good’?", 
      a: "Our engine analyzes thousands of public data points—including reviews, photos, and descriptions—to understand the vibe, not just the specs. It looks for patterns in feedback (e.g., ‘great for workshops’ vs. ‘noisy at night’) to give you recommendations that actually match your brief." 
    },
    { 
      q: "Is my event data secure? (GDPR)", 
      a: "Yes. We are a European company built on strict GDPR standards. Your internal event data, budgets, and stakeholder lists are encrypted and private. We never share your data with venues until you decide to make an inquiry." 
    },
    { 
      q: "Can I invite stakeholders who don’t have a seat?", 
      a: "Yes. We believe in barrier-free collaboration. Your paid seat allows you to create and edit, but you can invite unlimited guests (clients, bosses, colleagues) to view and comment on your plans for free." 
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
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
                     animate={{ height: "auto", opacity: 1 }}
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
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white relative overflow-hidden group-hover:rotate-3 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute w-2 h-2 bg-sky-400 rounded-sm top-1 right-1" />
                <span className="relative font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">Cue</span>
            </a>
            <p className="text-sm text-slate-500 mb-4">
              Making event planning as simple as booking a flight.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-sky-500"><span className="sr-only">Twitter</span><svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
              <a href="#" className="text-slate-400 hover:text-sky-500"><span className="sr-only">LinkedIn</span><svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-sky-600">Features</a></li>
              <li><a href="#" className="hover:text-sky-600">Pricing</a></li>
              <li><a href="#" className="hover:text-sky-600">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-sky-600">About Calt</a></li>
              <li><a href="#" className="hover:text-sky-600">Careers</a></li>
              <li><a href="#" className="hover:text-sky-600">Blog</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
             <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-sky-600">Privacy</a></li>
              <li><a href="#" className="hover:text-sky-600">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Calt Technologies. Built in Athens with ❤️.</p>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden selection:bg-sky-200 selection:text-sky-900">
      <Navbar />
      <Hero />
      <Problem />
      <FeatureSection />
      {/* <CaltAdvantage /> */}
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default App;
