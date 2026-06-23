import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon, Heart, MapPin, Sparkles, Clock, Compass } from "lucide-react";

// Beautiful custom hand-crafted fine-line vector illustrations for wedding events
const HouseIllustration = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#bf9c85]" fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
    {/* Botanic leafy vibes in background */}
    <path d="M12,82 C8,70 8,50 18,35 C23,45 18,65 12,82 Z" fill="currentColor" fillOpacity="0.04" stroke="none" />
    <path d="M88,82 C92,70 92,50 82,35 C77,45 82,65 88,82 Z" fill="currentColor" fillOpacity="0.04" stroke="none" />
    {/* Villa Mansion Structure */}
    <rect x="24" y="44" width="52" height="38" rx="4" fill="currentColor" fillOpacity="0.02" />
    {/* Elegant pitched roof */}
    <path d="M18,44 L50,18 L82,44" strokeLinecap="round" strokeLinejoin="round" />
    {/* Chimney with delicate heart smoke */}
    <line x1="70" y1="28" x2="70" y2="35" strokeLinecap="round" />
    <path d="M68,20 C68,16 64,14 68,10 C72,14 68,16 68,20 Z" fill="#f43f5e" stroke="none" transform="scale(0.85) translate(11, 2)" />
    {/* Grand Arch Doorway */}
    <path d="M42,82 L42,63 C42,58 58,58 58,63 L58,82" strokeLinecap="round" />
    {/* Rose window */}
    <circle cx="50" cy="34" r="5" />
    <circle cx="50" cy="34" r="2.5" />
    {/* Classic segmented windows */}
    <rect x="31" y="52" width="9" height="12" rx="1" />
    <line x1="35.5" y1="52" x2="35.5" y2="64" />
    <line x1="31" y1="58" x2="40" y2="58" />

    <rect x="60" y="52" width="9" height="12" rx="1" />
    <line x1="64.5" y1="52" x2="64.5" y2="64" />
    <line x1="60" y1="58" x2="69" y2="58" />
    {/* Steps leading up */}
    <line x1="14" y1="82" x2="86" y2="82" strokeLinecap="round" />
  </svg>
);

const ChurchIllustration = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#bf9c85]" fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
    {/* Golden background aura */}
    <circle cx="50" cy="50" r="38" strokeDasharray="3 3" className="text-[#bf9c85]/30" />
    {/* Traditional Armenian stone architecture base */}
    <rect x="30" y="55" width="40" height="30" rx="2" fill="currentColor" fillOpacity="0.02" />
    <path d="M20,85 L20,65 L30,65" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M80,85 L80,65 L70,65" strokeLinecap="round" strokeLinejoin="round" />

    {/* Classical Conical Cupola Dome */}
    <path d="M34,44 L50,15 L66,44 Z" fill="currentColor" fillOpacity="0.04" strokeLinejoin="round" />
    <rect x="38" y="44" width="24" height="11" />
    {/* Narrow lancet windows on the drum */}
    <line x1="44" y1="44" x2="44" y2="55" />
    <line x1="50" y1="44" x2="50" y2="55" />
    <line x1="56" y1="44" x2="56" y2="55" />

    {/* Elegant stone archway portal */}
    <path d="M43,85 L43,69 C43,64 57,64 57,69 L57,85" strokeLinecap="round" />
    <path d="M39,85 L39,66 C39,59 61,59 61,66 L61,85" strokeLinecap="round" className="text-[#bf9c85]/55" />

    {/* Tiny window above portal */}
    <circle cx="50" cy="40" r="1.5" fill="currentColor" />

    {/* Holy Cross at the pinnacle */}
    <line x1="50" y1="4" x2="50" y2="15" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="45" y1="7" x2="55" y2="7" strokeWidth="1.6" strokeLinecap="round" />

    <line x1="10" y1="85" x2="90" y2="85" strokeLinecap="round" />
  </svg>
);

const BanquetIllustration = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#bf9c85]" fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
    {/* Sparkle background elements */}
    <path d="M8,18 C13,18 18,13 18,8 C18,13 23,18 28,18 C23,18 18,23 18,28 C18,23 13,18 8,18" fill="currentColor" fillOpacity="0.08" stroke="none" />
    <path d="M72,22 C75,22 77,19 77,16 C77,19 79,22 82,22 C79,22 77,24 77,27 C77,24 75,22 72,22" fill="currentColor" fillOpacity="0.08" stroke="none" />

    {/* 3-Tier Luxury Wedding Cake */}
    <rect x="24" y="64" width="52" height="17" rx="3" fill="currentColor" fillOpacity="0.03" />
    <rect x="32" y="47" width="36" height="17" rx="2.5" fill="currentColor" fillOpacity="0.05" />
    <rect x="40" y="30" width="20" height="17" rx="2" fill="currentColor" fillOpacity="0.07" />

    {/* Intricate decorative draped icing swags */}
    <path d="M24,71 Q37,77 50,71 Q63,77 76,71" strokeLinecap="round" />
    <path d="M32,53 Q50,59 68,53" strokeLinecap="round" />
    <path d="M40,35 Q50,40 60,35" strokeLinecap="round" />

    {/* Delicate icing flowers detailing */}
    <circle cx="28" cy="64" r="2.5" fill="#f43f5e" stroke="none" />
    <circle cx="72" cy="64" r="2.5" fill="#f43f5e" stroke="none" />
    <circle cx="35" cy="47" r="2" fill="#f43f5e" stroke="none" />
    <circle cx="65" cy="47" r="2" fill="#f43f5e" stroke="none" />
    <circle cx="50" cy="30" r="3.2" fill="#f43f5e" stroke="none" /> {/* Floral Topper */}

    {/* Single elegant top candle with flame */}
    <line x1="50" y1="20" x2="50" y2="27" strokeLinecap="round" />
    <path d="M50,15 C51,17 50,19 50,20 C49,19 49,17 50,15 Z" fill="#eab308" stroke="none" />

    {/* Grand classical serving cake stand */}
    <line x1="16" y1="81" x2="84" y2="81" strokeLinecap="round" strokeWidth="1.5" />
    <path d="M34,81 L39,94 L61,94 L66,81" strokeLinecap="round" />
  </svg>
);

const WelcomeIllustration = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#bf9c85]" fill="none" stroke="currentColor" strokeWidth="1.2" xmlns="http://www.w3.org/2000/svg">
    {/* Festive sparkles */}
    <circle cx="50" cy="22" r="1.5" fill="#eab308" stroke="none" />
    <path d="M48,12 L50,8 L52,12 L56,14 L52,16 L50,20 L48,16 L44,14 Z" fill="currentColor" fillOpacity="0.08" stroke="none" />
    {/* Clinking Champagne Glasses */}
    {/* Left Glass */}
    <g transform="translate(10, 0) rotate(-12, 40, 50)">
      {/* Bowl */}
      <path d="M32,25 L48,25 L45,52 C44,58 36,58 35,52 Z" fill="currentColor" fillOpacity="0.03" />
      {/* Stem */}
      <line x1="40" y1="56" x2="40" y2="78" strokeLinecap="round" />
      {/* Foot */}
      <path d="M30,78 L50,78" strokeLinecap="round" strokeWidth="1.5" />
      {/* Liquid level */}
      <line x1="34" y1="36" x2="46" y2="36" strokeOpacity="0.4" />
    </g>
    {/* Right Glass */}
    <g transform="translate(-10, 0) rotate(12, 60, 50)">
      {/* Bowl */}
      <path d="M52,25 L68,25 L65,52 C64,58 56,58 55,52 Z" fill="currentColor" fillOpacity="0.03" />
      {/* Stem */}
      <line x1="60" y1="56" x2="60" y2="78" strokeLinecap="round" />
      {/* Foot */}
      <path d="M50,78 L70,78" strokeLinecap="round" strokeWidth="1.5" />
      {/* Liquid level */}
      <line x1="54" y1="36" x2="66" y2="36" strokeOpacity="0.4" />
    </g>
    {/* Clinking spark bubble */}
    <circle cx="50" cy="30" r="3" fill="#f43f5e" stroke="none" />
  </svg>
);

export default function WeddingCalendar() {
  // Target Wedding Date: July 26, 2026 at 15:30
  const targetDate = new Date("2026-07-26T15:30:00").getTime();
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

  // July 2026 starts on a Wednesday (1st is Wednesday)
  // July has 31 days
  // 26th is Sunday (Wedding Day)
  const weekdays = ["Երկ", "Երք", "Չոր", "Հնգ", "Ուր", "Շբ", "Կիր"];

  // Blank days before July 1 (Wednesday) = 2 blank cells (Monday & Tuesday are empty)
  const blankDays = Array(2).fill(null);
  const calendarDays = Array.from({ length: 31 }, (_, idx) => idx + 1);

  return (
    <section id="calendar-section" className="py-16 px-4 bg-gradient-to-b from-[#faf6f0] to-[#fcfaf7] border-y border-[#ece4db] select-none text-[#2c2523]">
      <div className="max-w-5xl mx-auto">
        {/* Title Marker */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#8a7261] mt-3 max-w-md mx-auto leading-relaxed font-sans"
          >
            Սիրելի՜ հյուրեր,
            Սիրով հրավիրում ենք ձեզ մասնակցելու մեր հարսանյաց արարողությանը և մեզ հետ կիսելու մեր կյանքի ամենահիշարժան օրերից մեկը։
          </motion.p>
          <div className="w-16 h-0.5 bg-[#eddccb] mx-auto mt-6" />
        </div>

        {/* Calendar and Schedule Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:items-stretch">

          {/* LEFT COLUMN: Beautiful Calendar layout */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="bg-white rounded-3xl border border-[#ece4db] p-6 md:p-8 shadow-xl max-w-sm mx-auto w-full relative flex flex-col justify-between h-full min-h-[380px]"
          >
            {/* Soft decorative background leaf illustration markers */}
            <div className="absolute -top-6 -right-6 text-[#bf9c85]/10 font-serif text-9xl pointer-events-none select-none italic font-normal">
              07
            </div>

            {/* Elegant Month and Year Header */}
            <div className="mb-5 border-b border-[#f5ece2]/60 pb-3 flex items-center justify-between z-10">
              <span className="font-display text-lg md:text-xl font-extrabold text-[#3d3129] tracking-wide">
                Հուլիս 2026
              </span>
            </div>

            <div className="flex-grow flex flex-col justify-center">
              {/* Weekdays names */}
              <div className="grid grid-cols-7 gap-y-2 text-center text-[10px] md:text-xxs tracking-tight uppercase text-[#bf9c85] font-extrabold mb-4">
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
                  const isWeddingDay = day === 26;

                  if (isWeddingDay) {
                    return (
                      <div key={day} className="relative flex items-center justify-center h-10 w-10 mx-auto">
                        {/* Heart Highlighter container */}
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          className="absolute inset-0 flex items-center justify-center cursor-pointer text-rose-500 hover:text-rose-600 drop-shadow-md"
                          title="Հարսանեկան օր՝ Հուլիսի 26"
                        >
                          <Heart className="w-10 h-10 fill-rose-500 text-rose-500 stroke-[1.5]" />
                          <span className="absolute text-white font-display text-xs font-bold -translate-y-[2px] pb-0.5 z-10 select-none">
                            26
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
            </div>

            {/* Beautiful, Compact Countdown in the Calendar Footer */}
            <div className="mt-6 pt-4 border-t border-[#f5ece2]/80 flex flex-col items-center justify-center gap-2">
              {!timeLeft.ended ? (
                <>
                  <div className="grid grid-cols-4 gap-1.5 w-full mt-1">
                    {[
                      { label: "Օր", value: timeLeft.days },
                      { label: "Ժամ", value: timeLeft.hours },
                      { label: "Րոպե", value: timeLeft.minutes },
                      { label: "Վրկ", value: timeLeft.seconds },
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
                  <span>Տոնակատարությունը սկսվել է:</span>
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
            <h3 className="font-display text-2xl md:hidden font-extrabold text-[#3d3129] leading-tight">
              Ժամանակացույց
            </h3>
            <div className="space-y-5 pt-2">
              {[
                {
                  time: "11:00",
                  title: "Հարսի տուն",
                  illustration: HouseIllustration
                },
                {
                  time: "14:30",
                  title: "Պսակադրություն",
                  illustration: ChurchIllustration
                },
                {
                  time: "17:30",
                  title: "Հյուրերի դիմավորում",
                  illustration: WelcomeIllustration
                },
                {
                  time: "18:00",
                  title: "Հարսանեկան Խնջույք",
                  illustration: BanquetIllustration
                }
              ].map((item, index) => {
                const IllustrationComponent = item.illustration;
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className={`group bg-white/75 backdrop-blur-xs border border-[#eddccb]/60 rounded-3xl p-5 hover:shadow-md hover:border-[#bf9c85]/50 hover:bg-white transition-all duration-500 flex flex-row items-center gap-5 sm:gap-6 ${isEven ? "flex-row" : "sm:flex-row-reverse"
                      }`}
                  >
                    {/* Illustration Frame */}
                    <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white to-[#faf8f5] border border-[#eddccb]/50 rounded-2xl flex items-center justify-center p-2.5 shadow-2xs group-hover:border-[#bf9c85]/60 group-hover:scale-105 transition-all duration-500">
                      <IllustrationComponent />
                    </div>

                    {/* Event Info Details */}
                    <div className={`flex flex-col flex-1 ${isEven ? "items-start text-left" : "items-start sm:items-end text-left sm:text-right"
                      }`}>
                      <span className="font-sans text-xs font-bold text-[#bf9c85] tracking-[0.1em] uppercase mb-0.5 sm:mb-1">
                        Ժամը {item.time}
                      </span>
                      <h4 className="font-display font-black text-sm sm:text-base md:text-lg text-[#3d3129] leading-tight">
                        {item.title}
                      </h4>
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
