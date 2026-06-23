import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
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
    <div className="min-h-screen bg-[#fdfbf7] text-[#2c2523] selection:bg-[#efdfcf]/70 select-none overflow-x-hidden w-full">
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
            Տ <span className="text-[#bf9c85] font-light">&amp;</span> Ա
          </motion.div>

          <nav className="flex items-center gap-4 md:gap-8 text-[11px] md:text-xxs uppercase tracking-widest font-semibold text-[#8a7261] overflow-x-auto whitespace-nowrap scrollbar-none max-w-[calc(100vw-120px)] md:max-w-none pr-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-[#bf9c85] transition-colors cursor-pointer"
            >
              Սկիզբ
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("details-section");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-[#bf9c85] transition-colors cursor-pointer"
            >
              Հրավեր
            </button>
            <button
              onClick={scrollToCalendar}
              className="hover:text-[#bf9c85] transition-colors cursor-pointer"
            >
              Օրացույց
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
            Տիգրան &amp; Աննա
          </div>
          <div className="flex justify-center gap-2.5 text-[#bf9c85]">
            <Heart className="w-4 h-4" fill="#bf9c85" />
            <span className="text-xs uppercase tracking-widest font-semibold">Հուլիսի 26, 2026</span>
            <Heart className="w-4 h-4" fill="#bf9c85" />
          </div>
        </div>
      </footer>
    </div>
  );
}
