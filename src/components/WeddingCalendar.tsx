import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, Heart, MapPin, Sparkles, Clock, Compass } from "lucide-react";

export default function WeddingCalendar() {
  // Target Wedding Date: September 19, 2026 at 15:30
  const targetDate = new Date("2026-09-19T15:30:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    ended: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, ended: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // September 2026 starts on a Tuesday (1st is Tuesday)
  // September has 30 days
  // 19th is Saturday (Wedding Day)
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Blank days before Sept 1 (Tuesday) = 1 blank cell (Monday is empty)
  const blankDays = Array(1).fill(null);
  const calendarDays = Array.from({ length: 30 }, (_, idx) => idx + 1);

  return (
    <section id="calendar-section" className="py-24 px-4 bg-gradient-to-b from-[#faf6f0] to-[#fcfaf7] border-y border-[#ece4db] select-none text-[#2c2523]">
      <div className="max-w-5xl mx-auto">
        {/* Title Marker */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xxs uppercase tracking-[0.25em] text-[#bf9c85] font-bold flex items-center justify-center gap-2"
          >
            <CalendarIcon className="w-4 h-4 text-[#bf9c85]" />
            <span>Mark Your Calendar</span>
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-extrabold text-[#3d3129] mt-3"
          >
            The Ceremony Date
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-[#8a7261] mt-3 max-w-md mx-auto leading-relaxed font-sans"
          >
            Join us for words of love, fine Tuscan wine, and a beautiful night we will remember forever.
          </motion.p>
          <div className="w-16 h-0.5 bg-[#eddccb] mx-auto mt-6" />
        </div>

        {/* Calendar and Schedule Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT COLUMN: Beautiful Calendar layout */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="bg-white rounded-3xl border border-[#ece4db] p-6 md:p-8 shadow-xl max-w-sm mx-auto w-full relative"
          >
            {/* Soft decorative background leaf illustration markers */}
            <div className="absolute -top-6 -right-6 text-[#bf9c85]/10 font-serif text-9xl pointer-events-none select-none italic font-normal">
              09
            </div>

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#f3e9dc]">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#3d3129]">September</h3>
                <p className="text-xs text-[#bf9c85] font-semibold tracking-wider font-sans mt-0.5">Year 2026</p>
              </div>
              <div className="flex gap-1.5 items-center bg-[#faf6f0] border border-[#ece4db] px-3.5 py-1.5 rounded-full text-xxs text-[#8a7261] font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#bf9c85]" />
                <span>Florence, IT</span>
              </div>
            </div>

            {/* Weekdays names */}
            <div className="grid grid-cols-7 gap-y-2 text-center text-xxs tracking-wider uppercase text-[#bf9c85] font-bold mb-4">
              {weekdays.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-y-1.5 text-center items-center">
              {blankDays.map((_, idx) => (
                <div key={`blank-${idx}`} className="h-9 w-9" />
              ))}

              {calendarDays.map((day) => {
                const isWeddingDay = day === 19;
                
                if (isWeddingDay) {
                  return (
                    <div key={day} className="relative flex items-center justify-center h-10 w-10 mx-auto">
                      {/* Heart Highlighter container */}
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer text-rose-500 hover:text-rose-600 drop-shadow-md"
                        title="Wedding Day! September 19"
                      >
                        <Heart className="w-10 h-10 fill-rose-500 text-rose-500 stroke-[1.5]" />
                        <span className="absolute text-white font-display text-xs font-bold pt-0.5 z-10 select-none">
                          19
                        </span>
                      </motion.div>
                      
                      {/* Floating romantic indicator */}
                      <span className="absolute -top-1 -right-1 bg-yellow-400 w-2.5 h-2.5 rounded-full border border-white animate-ping" />
                    </div>
                  );
                }

                // Ordinary days
                return (
                  <div
                    key={day}
                    className="font-sans text-xs md:text-sm font-semibold text-[#5c4e43] hover:bg-[#faf6f0] rounded-xl h-9 w-9 flex items-center justify-center transition-colors mx-auto cursor-default"
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Beautiful, Compact Countdown in the Calendar Footer */}
            <div className="mt-6 pt-4 border-t border-[#f5ece2]/80 flex flex-col items-center justify-center gap-2">
              {!timeLeft.ended ? (
                <>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#bf9c85] font-extrabold">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0 animate-pulse" />
                    <span>Countdown to Say "I Do"</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 w-full mt-1">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Mins", value: timeLeft.minutes },
                      { label: "Secs", value: timeLeft.seconds },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="bg-[#faf6f0] border border-[#ece4db] py-1.5 px-1 rounded-xl flex flex-col items-center justify-center shadow-xs"
                      >
                        <span className="font-display text-xs md:text-sm text-[#3d3129] font-black leading-none">
                          {unit.value.toString().padStart(2, "0")}
                        </span>
                        <span className="text-[8px] uppercase tracking-wider text-[#8a7261] mt-0.5 font-bold">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 text-xxs text-[#8a7261] font-semibold tracking-wide">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
                  <span>The celebration has begun!</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive High-Quality detailed timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.15 }}
            className="space-y-6 md:pl-4"
          >
            <div className="p-1 rounded-2xl bg-[#bf9c85]/10 border border-[#bf9c85]/20 w-fit">
              <span className="text-xxs uppercase tracking-widest font-bold text-[#8d705c] px-3.5 py-1 block">
                Official Timing
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#3d3129] leading-tight">
              A Day Filled with Beautiful Memories
            </h3>

            <p className="text-sm text-[#5c4e43]/90 leading-relaxed font-sans">
              To help you plan your travel and accommodation, here is the official schedule for our celebration on the 19th of September.
            </p>

            {/* Time schedule items */}
            <div className="relative border-l border-dashed border-[#ecdccb] pl-6 ml-2.5 space-y-8 py-2">
              {[
                {
                  time: "15:30",
                  title: "The Holy Ceremony",
                  venue: "San Miniato al Monte, Florence",
                  desc: "Blessing of vows and ring ceremony. Guests are kindly requested to arrive at 15:15.",
                  icon: Sparkles
                },
                {
                  time: "17:00",
                  title: "Aperitifs & Portrait Sessions",
                  venue: "Villa di Maiano, Terraces",
                  desc: "Live harp melodies, fresh local prosecco, and group photographs under the setting sun.",
                  icon: Compass
                },
                {
                  time: "19:00",
                  title: "Wedding Banquet",
                  venue: "The Fairy-Lit Al Fresco Lawn",
                  desc: "Four-course traditional Italian dinner crafted by local chefs, followed by romantic toasts.",
                  icon: Clock
                }
              ].map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative group"
                  >
                    {/* Ring timeline bullet */}
                    <div className="absolute -left-10 top-1.5 w-7 h-7 bg-white border-2 border-[#bf9c85] rounded-full flex items-center justify-center text-[#bf9c85] shadow-xs group-hover:scale-110 transition-transform duration-300">
                      <ItemIcon className="w-3.5 h-3.5" />
                    </div>

                    <div>
                      <div className="flex gap-3 items-center mb-1">
                        <span className="font-sans text-xs font-bold text-[#bf9c85] tracking-wide uppercase">
                          {item.time}
                        </span>
                        <div className="w-1.5 h-1.5 bg-[#bf9c85]/40 rounded-full" />
                        <h4 className="font-display font-black text-sm md:text-base text-[#3d3129]">
                          {item.title}
                        </h4>
                      </div>
                      
                      <p className="text-xxs uppercase tracking-wider text-[#8a7261] font-bold flex items-center gap-1.5 mb-1.5">
                        <MapPin className="w-3 h-3 shrink-0" />
                        <span>{item.venue}</span>
                      </p>

                      <p className="text-xs text-[#5c4e43]/95 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
