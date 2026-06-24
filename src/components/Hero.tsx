import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import heroImage from "../assets/images/IMG_8981.jpg";

interface HeroProps {
  onRsvpClick: () => void;
}

export default function Hero({ onRsvpClick }: HeroProps) {
  // Steps state: 1 is "Emma & Arthur Names", 2 is "You are Invited to our Wedding!"
  const [heroStep, setHeroStep] = useState<1 | 2>(1);
  const [showNames, setShowNames] = useState(true);

  useEffect(() => {
    // Automatically transition to step 2 after 2.6 seconds
    const timerStep = setTimeout(() => {
      setHeroStep(2);
    }, 2600);

    // Make names appear on load, then disappear after 4.2 seconds to reveal faces clearly
    const timerNames = setTimeout(() => {
      setShowNames(false);
    }, 4200);

    return () => {
      clearTimeout(timerStep);
      clearTimeout(timerNames);
    };
  }, []);

  return (
    <section className="relative h-[calc(100dvh-60px)] min-h-[calc(100dvh-60px)] max-h-[calc(100dvh-60px)] flex flex-row items-stretch select-none text-[#2c2523] bg-[#fdfbf7] overflow-hidden">
      {/* LEFT COLUMN: Wide cinematic image of the couple (Full screen h-full on mobile, split screen on desktop) */}
      <div className="relative w-full md:w-1/2 h-full overflow-hidden bg-[#2c2523] flex-shrink-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          src={heroImage}
          alt="Tigran & Anna Wedding Portrait"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Rich elegant linear overlay gradient for high readability of text */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/45 to-black/10 md:to-transparent pointer-events-none z-20" />

        {/* Dynamic Static Title for the Image side on Desktop */}
        <div className="hidden md:block absolute bottom-12 left-12 right-12 text-white p-2 z-30">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-2 mb-2"
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
            <span className="text-xxs uppercase tracking-[0.25em] font-extrabold text-[#ffffff] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">Հուլիսի 26, 2026</span>
          </motion.div>
        </div>

        {/* MOBILE ONLY OVERLAY - Styled with high contrast and no layout shift */}
        <div className="md:hidden absolute inset-0 flex flex-col justify-between items-center px-6 py-9 z-30 text-white text-center">

          {/* Upper Info: Date and Monogram icon strictly kept above */}
          <div className="flex flex-col items-center gap-1 mt-1 z-30">
            <div className="mx-auto w-11 h-11 rounded-full border border-white/30 flex items-center justify-center bg-black/40 backdrop-blur-md mb-1.5 shadow-md">
              <span className="font-display text-sm font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Տ&amp;Ա</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-white flex items-center gap-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
              <span>Հուլիսի 26, 2026</span>
            </span>
          </div>

          {/* Middle Names Area: Appears on load, then disappears after 4.2 seconds to reveal faces clearly */}
          <div className="w-full max-w-sm h-[80px] min-h-[80px] max-h-[80px] flex items-center justify-center relative overflow-hidden z-30">
            <AnimatePresence>
              {showNames && (
                <motion.div
                  key="mob-hero-names"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="w-full text-center"
                >
                  <h2 className="font-display text-3xl font-black tracking-tight text-white drop-shadow-[0_3px_14px_rgba(0,0,0,1)]">
                    Տիգրան &amp; Աննա
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: Interactive cream-colored split section with zero-layout-shift auto text transition (ONLY Desktop) */}
      <div className="hidden md:flex md:w-1/2 p-8 lg:p-12 py-12 lg:py-16 flex-col justify-between items-center text-center bg-gradient-to-b from-[#fdfbf9] to-[#faf6f0] border-l border-[#ece4db] h-full flex-shrink-0">

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
                    <span className="font-display text-xl font-bold text-[#8a7261]">Տ&amp;Ա</span>
                  </div>

                  <h1 className="font-display text-4xl lg:text-5xl font-black text-[#3d3129] tracking-tight leading-tight">
                    Տիգրան &amp; Աննա
                  </h1>

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
                  <span className="uppercase tracking-[0.2em] text-[#bf9c85] font-extrabold block">
                    Սիրով հրավիրում ենք
                  </span>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
