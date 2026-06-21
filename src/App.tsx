import { useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { Heart, Compass, Gift, ChevronDown, Sparkles } from "lucide-react";
import Hero from "./components/Hero";
import DetailsBlock from "./components/DetailsBlock";
import WeddingCalendar from "./components/WeddingCalendar";
import RSVPForm from "./components/RSVPForm";

export default function App() {
  const rsvpRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // High performance, compositor-driven, lag-free scroll progress tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToRsvp = () => {
    if (rsvpRef.current) {
      rsvpRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2c2523] selection:bg-[#efdfcf]/70 select-none">
      {/* Lag-Free, GPU-Accelerated Scroll Progress Bar (Highly Visible & Responsive) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[4px] bg-[#bf9c85] z-[9999] origin-left" 
        style={{ scaleX }}
      />

      {/* Floating minimalist Header */}
      <header className="sticky top-0 left-0 right-0 z-50 h-[60px] bg-[#fdfbf7]/85 backdrop-blur-md border-b border-[#ece4db]/60 transition-all duration-300">
        <div className="max-w-6xl mx-auto h-full px-6 flex justify-between items-center gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0 font-display text-lg md:text-xl font-bold tracking-wider text-[#3d3129]"
          >
            E <span className="text-[#bf9c85] font-light">&amp;</span> A
          </motion.div>

          <nav className="flex items-center gap-4 md:gap-8 text-[11px] md:text-xxs uppercase tracking-widest font-semibold text-[#8a7261] overflow-x-auto whitespace-nowrap scrollbar-none max-w-[calc(100vw-120px)] md:max-w-none pr-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-[#bf9c85] transition-colors cursor-pointer"
            >
              Top
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("details-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-[#bf9c85] transition-colors cursor-pointer"
            >
              Invitation
            </button>
            <button
              onClick={scrollToCalendar}
              className="hover:text-[#bf9c85] transition-colors cursor-pointer"
            >
              Calendar
            </button>
            <button
              onClick={scrollToRsvp}
              className="hover:text-[#bf9c85] transition-colors cursor-pointer"
            >
              RSVP
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <Hero onRsvpClick={scrollToRsvp} />

      {/* Decorative floral quote banner block */}
      <section className="py-24 px-6 text-center bg-[#faf6f0] border-y border-[#ece4db]/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#efdfcf]/5 opacity-30 -z-10" />
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="text-[#bf9c85]"
          >
            <Sparkles className="w-6 h-6 mx-auto animate-pulse" />
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-xl md:text-2xl italic text-[#5c4e43] leading-relaxed font-light"
          >
            "Two souls with but a single thought, two hearts that beat as one."
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xxs uppercase tracking-[0.25em] text-[#8a7261] font-bold"
          >
            — Friedrich Halm
          </motion.p>
        </div>
      </section>

      {/* Wedding date & beautiful customized heart calendar highlighted */}
      <div ref={calendarRef} className="scroll-mt-16">
        <WeddingCalendar />
      </div>

      {/* Wedding detail cards (Bride House, Church, Restaurant) */}
      <DetailsBlock />

      {/* Guest interactive Form block */}
      <div ref={rsvpRef} className="scroll-mt-16">
        <RSVPForm />
      </div>

      {/* Footer element */}
      <footer className="py-12 px-6 text-center bg-[#2c2523] text-[#efdfcf]/90 border-t border-neutral-800">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="font-display text-2xl font-semibold tracking-wide text-white">
            Emma &amp; Arthur
          </div>
          <div className="flex justify-center gap-2.5 text-[#bf9c85]">
            <Heart className="w-4 h-4" fill="#bf9c85" />
            <span className="text-xs uppercase tracking-widest font-semibold">September 19, 2026</span>
            <Heart className="w-4 h-4" fill="#bf9c85" />
          </div>
          
          <div className="w-12 h-[1px] bg-neutral-700 mx-auto" />
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-4 text-[11px] text-neutral-400 gap-4">
            <p>&copy; 2026 Emma &amp; Arthur Wedding Organizers. All Rights Reserved.</p>
            <button
              onClick={scrollToRsvp}
              className="text-[#bf9c85] hover:text-white transition-colors cursor-pointer text-xs font-semibold tracking-wider uppercase bg-neutral-800 hover:bg-neutral-700 px-4 py-1.5 rounded-full border border-neutral-700/60"
            >
              RSVP Online Now
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
