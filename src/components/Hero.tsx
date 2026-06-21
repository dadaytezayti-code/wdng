import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, ChevronDown, Sparkles } from "lucide-react";
import heroImage from "../assets/images/wedding_hero_1781429815653.jpg";

interface HeroProps {
  onRsvpClick: () => void;
}

export default function Hero({ onRsvpClick }: HeroProps) {
  // Steps state: 1 is "Emma & Arthur Names", 2 is "You are Invited to our Wedding!"
  const [heroStep, setHeroStep] = useState<1 | 2>(1);

  useEffect(() => {
    // Automatically transition to step 2 after 2.6 seconds
    const timer = setTimeout(() => {
      setHeroStep(2);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[calc(100dvh-60px)] min-h-[calc(100dvh-60px)] max-h-[calc(100dvh-60px)] flex flex-row items-stretch select-none text-[#2c2523] bg-[#fdfbf7] overflow-hidden">
      {/* Decorative Blur Drops */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#efdfcf]/25 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-[#f0e4d7]/20 rounded-full filter blur-3xl -z-10" />

      {/* LEFT COLUMN: Wide cinematic image of the couple (Full screen h-full on mobile, split screen on desktop) */}
      <div className="relative w-full md:w-1/2 h-full overflow-hidden bg-[#2c2523] flex-shrink-0">
        <motion.img
          initial={{ scale: 1.15, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          src={heroImage}
          alt="Emma & Arthur Wedding Portrait"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Soft elegant linear overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/35 to-transparent pointer-events-none" />

        {/* Dynamic Static Title for the Image side on Desktop */}
        <div className="hidden md:block absolute bottom-12 left-12 right-12 text-white p-2">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-2 mb-1.5"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
            <span className="text-xxs uppercase tracking-[0.2em] font-bold text-[#e8ded1]">September 19, 2026</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-display text-4xl lg:text-5xl font-black tracking-tight"
          >
            Emma &amp; Arthur
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xs text-neutral-300 italic font-serif mt-1"
          >
            In the heart of magical Florence, Tuscany
          </motion.p>
        </div>

        {/* MOBILE ONLY OVERLAY - Styled with high contrast and no layout shift */}
        <div className="md:hidden absolute inset-0 flex flex-col justify-between items-center px-6 py-9 z-10 text-white text-center">
          
          {/* Upper Info */}
          <div className="flex flex-col items-center gap-1 mt-1">
            <div className="mx-auto w-11 h-11 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md mb-1 shadow-sm">
              <span className="font-display text-sm font-bold text-[#e8ded1]">E&amp;A</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#e8ded1] flex items-center gap-1.5">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
              <span>September 19, 2026</span>
            </span>
          </div>

          {/* Middle text transition card with strictly static height to yield a zero layout-shift crossfade */}
          <div className="w-full max-w-sm h-[160px] min-h-[160px] max-h-[160px] flex items-center justify-center relative overflow-hidden">
            <div className="grid grid-cols-1 grid-rows-1 w-full items-center">
              <AnimatePresence mode="wait">
                {heroStep === 1 ? (
                  <motion.div
                    key="mob-step-names"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="col-start-1 row-start-1 w-full space-y-2 text-center"
                  >
                    <h2 className="font-display text-3xl font-black tracking-tight text-white">
                      Emma &amp; Arthur
                    </h2>
                    <p className="text-xs text-neutral-200 mt-1 italic font-serif leading-relaxed max-w-xs mx-auto">
                      "Celebrating the beginning of our eternal love journey in Florence, Tuscany."
                    </p>
                    <div className="w-10 h-0.5 bg-[#bf9c85]/60 mx-auto mt-2" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="mob-step-invited"
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="col-start-1 row-start-1 w-full space-y-2 text-center"
                  >
                    <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-rose-300">
                      You Are Sincerely Invited
                    </span>
                    <h2 className="font-display text-2xl font-black tracking-tight text-white">
                      Our Wedding Day
                    </h2>
                    <p className="text-xs text-neutral-200 mt-1 italic font-serif leading-relaxed max-w-xs mx-auto">
                      "We would be honored to celebrate our sacred vows with you."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full max-w-[240px] space-y-3">
            <button
              onClick={onRsvpClick}
              className="w-full bg-[#bf9c85] hover:bg-[#8d705c] text-white py-3 px-6 rounded-full font-sans tracking-widest text-[11px] uppercase transition-all duration-300 font-extrabold shadow-md active:scale-95 cursor-pointer"
            >
              RSVP Online
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("calendar-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xxs uppercase tracking-widest font-extrabold text-[#e8ded1] flex items-center justify-center gap-1 mx-auto py-1"
            >
              <span>Scroll to Details</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-[#e8ded1]" />
            </button>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: Interactive cream-colored split section with zero-layout-shift auto text transition (ONLY Desktop) */}
      <div className="hidden md:flex md:w-1/2 p-8 lg:p-12 py-12 lg:py-16 flex-col justify-between items-center text-center bg-gradient-to-b from-[#fdfbf9] to-[#faf6f0] border-l border-[#ece4db] h-full flex-shrink-0">
        
        {/* Elegant top tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xxs uppercase tracking-[0.25em] text-[#bf9c85] font-bold py-1.5 px-4 bg-[#bf9c85]/10 rounded-full mt-2 z-10 animate-fade-in"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>We are getting married</span>
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>

        {/* Desktop Dynamic Transition Area (Fixed height optimized to eliminate visual layout shift & prevent overlapping) */}
        <div className="w-full max-w-md relative overflow-hidden h-[300px] min-h-[300px] max-h-[300px] flex items-center justify-center my-auto">
          <div className="grid grid-cols-1 grid-rows-1 w-full items-center">
            <AnimatePresence mode="wait">
              {heroStep === 1 ? (
                <motion.div
                  key="desk-step-names"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="col-start-1 row-start-1 w-full space-y-4"
                >
                  {/* Monogram */}
                  <div className="mx-auto w-16 h-16 rounded-full border-2 border-[#eddccb] flex items-center justify-center bg-white shadow-xs mb-3">
                    <span className="font-display text-xl font-bold text-[#8a7261]">E&amp;A</span>
                  </div>
                  
                  <h1 className="font-display text-4xl lg:text-5xl font-black text-[#3d3129] tracking-tight leading-tight">
                    Emma &amp; Arthur
                  </h1>
                  
                  <p className="italic font-serif text-[#8a7261] text-sm leading-relaxed">
                    "Celebrating the beginning of our eternal love journey."
                  </p>
                  
                  <div className="w-12 h-0.5 bg-[#bf9c85]/40 mx-auto mt-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="desk-step-invited"
                  initial={{ opacity: 0, scale: 0.96, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="col-start-1 row-start-1 w-full space-y-4"
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-2 shadow-xs">
                    <Heart className="w-6 h-6 fill-rose-400 stroke-[1.5] text-rose-500 animate-pulse" />
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#bf9c85] font-extrabold block">
                    You Are Sincerely Invited
                  </span>

                  <h1 className="font-display text-3xl lg:text-4xl font-extrabold text-[#3d3129] tracking-tight leading-snug">
                    Please Join Our <br />Wedding Celebration
                  </h1>

                  <p className="font-serif italic text-xs lg:text-sm text-[#5c4e43] leading-relaxed max-w-sm mx-auto">
                    "Your constant friendship, warmth, and laughter have brought the ultimate beauty to our lives. We would be honored to celebrate our vows with you."
                  </p>

                  <div className="w-12 h-0.5 bg-[#eddccb] mx-auto mt-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Lower CTA & Scroll Guide */}
        <div className="w-full flex flex-col items-center gap-4 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-2.5 w-full max-w-[280px]"
          >
            <button
              onClick={onRsvpClick}
              id="hero-rsvp-btn"
              className="w-full bg-[#bf9c85] hover:bg-[#8d705c] hover:shadow-md text-white py-3 px-8 rounded-full font-sans tracking-widest text-xs uppercase transition-all duration-300 font-extrabold shadow-sm transform active:scale-95 cursor-pointer"
            >
              RSVP Online
            </button>

            <button
              onClick={() => {
                const el = document.getElementById("calendar-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center justify-center gap-1 text-xxs text-[#8a7261] hover:text-[#3d3129] tracking-widest uppercase font-extrabold py-1.5 transition-colors cursor-pointer"
            >
              <span>Scroll to Details</span>
              <ChevronDown className="w-3 h-3 animate-bounce text-[#bf9c85]" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
