import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";

import heroImg from "../assets/images/wedding_hero_1781429815653.jpg";
import houseImg from "../assets/images/bride_house_1781429832477.jpg";
import churchImg from "../assets/images/wedding_church_1781429848718.jpg";
import restaurantImg from "../assets/images/wedding_restaurant_1781429864364.jpg";
import ringsImg from "../assets/images/wedding_rings_1781430857358.jpg";
import coupleImg from "../assets/images/wedding_couple_1781430873361.jpg";
import danceImg from "../assets/images/wedding_dance_1781430888456.jpg";
import cakeImg from "../assets/images/wedding_cake_1781430902411.jpg";

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  description: string;
}

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 1,
    src: heroImg,
    title: "Bridal Wreath & Flowers",
    category: "Details",
    description: "A gorgeous array of fresh lilies, pastel roses, and eucalyptus curated especially for the wedding ceremony backdrop."
  },
  {
    id: 2,
    src: ringsImg,
    title: "The Golden Promise",
    category: "Precious",
    description: "Two timeless golden bands waiting to carry their eternal vows upon clean white rose petals and fine silk."
  },
  {
    id: 3,
    src: houseImg,
    title: "Bridal Preparation Suite",
    category: "Morning",
    description: "Serene morning hours of laughter, warm tea, and bridal gown fittings overlooking the panoramic hills of Fiesole."
  },
  {
    id: 4,
    src: churchImg,
    title: "Timeless Cathedral Altar",
    category: "Ceremony",
    description: "The sunbeams filtering through the ancient Romanesque mosaic windows of San Miniato al Monte, creating a holy atmosphere."
  },
  {
    id: 5,
    src: coupleImg,
    title: "Walking Into Forever",
    category: "Love",
    description: "Emma and Arthur holding hands in a gentle afternoon Tuscan sun on their way to the beautiful reception gardens."
  },
  {
    id: 6,
    src: restaurantImg,
    title: "The Fairy-Lit Banquet",
    category: "Reception",
    description: "Long banqueting tables set up with fine crystal, warm candles, olive branches, and thousands of ambient lights."
  },
  {
    id: 7,
    src: cakeImg,
    title: "Elegance in Every Layer",
    category: "Details",
    description: "A magnificent three-tiered wedding cake styled with fresh sugar roses, vintage golden brushes, and vanilla frosting."
  },
  {
    id: 8,
    src: danceImg,
    title: "Under a Sky of Stars",
    category: "Love",
    description: "The magical first dance of the wedding couple surrounded by friends, sparkles, under rustic olive trees."
  }
];

export default function PhotoGallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "Morning", "Ceremony", "Love", "Reception", "Details"];

  const filteredPhotos = selectedCategory === "all"
    ? GALLERY_DATA
    : GALLERY_DATA.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activePhotoIndex === null) return;
    const nextIdx = (activePhotoIndex + 1) % filteredPhotos.length;
    setActivePhotoIndex(nextIdx);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activePhotoIndex === null) return;
    const prevIdx = (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhotoIndex(prevIdx);
  };

  const currentPhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <section id="gallery-section" className="py-24 px-4 bg-[#fdfbf9] border-t border-[#ece4db] select-none">
      <div className="max-w-6xl mx-auto">
        {/* Title Group */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="text-xxs uppercase tracking-[0.25em] text-[#bf9c85] font-semibold flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-[#bf9c85]" />
            <span>Captured Moments</span>
            <Sparkles className="w-4 h-4 text-[#bf9c85]" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-3xl md:text-5xl font-bold text-[#3d3129] mt-3"
          >
            Wedding Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm text-[#8a7261] mt-3 max-w-md mx-auto leading-relaxed"
          >
            Take a visual tour through our romantic wedding day chapters, from the morning whispers to the evening celebration.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-16 h-0.5 bg-[#eddccb] mx-auto mt-6"
          />
        </div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActivePhotoIndex(null);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide capitalize transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#bf9c85] text-white shadow-xs"
                  : "bg-white hover:bg-[#faf6f0] text-[#5c4e43] border border-[#ece4db]"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-3xl border border-[#ece4db] overflow-hidden shadow-xs hover:shadow-md cursor-pointer aspect-4/3"
                onClick={() => setActivePhotoIndex(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Accent Hover overlay */}
                <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />
                
                {/* Frame & Icon */}
                <div className="absolute inset-0 p-4 border-2 border-transparent group-hover:border-white/20 rounded-3xl transition-all duration-300 pointer-events-none" />
                
                <div className="absolute top-4 right-4 bg-white/75 backdrop-blur-md rounded-full p-2.5 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-3.5 h-3.5 text-[#3d3129]" />
                </div>

                {/* Caption Block */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-[#ece4db]/60 transition-transform duration-300 group-hover:-translate-y-1 block shadow-xs">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#bf9c85] block mb-0.5">
                    {photo.category}
                  </span>
                  <p className="font-display font-bold text-xs text-[#3d3129] leading-tight">
                    {photo.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 select-none"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Bar on Lightbox */}
            <div className="flex justify-between items-center w-full text-white pb-4 z-10 max-w-7xl mx-auto">
              <div className="text-left font-sans">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#bf9c85] block mb-0.5">
                  Collection Gallery ({activePhotoIndex + 1} / {filteredPhotos.length})
                </span>
                <span className="font-display font-extrabold text-sm md:text-lg text-white">
                  {currentPhoto.title}
                </span>
              </div>

              <button
                onClick={() => setActivePhotoIndex(null)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors flex items-center justify-center border border-white/10 cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Lightbox Frame */}
            <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full group">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 z-10 p-4 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors border border-white/10 cursor-pointer text-white flex items-center justify-center"
                title="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Active Image container */}
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-h-[60vh] md:max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.title}
                  className="max-h-[60vh] md:max-h-[70vh] object-contain w-auto h-auto rounded-xl mx-auto"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 z-10 p-4 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors border border-white/10 cursor-pointer text-white flex items-center justify-center"
                title="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Bottom Bar Details Description */}
            <div
              className="text-center text-white/90 max-w-2xl mx-auto pt-6 pb-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-serif italic text-xs md:text-sm leading-relaxed text-zinc-300">
                "{currentPhoto.description}"
              </p>
              <div className="flex items-center justify-center gap-1.5 mt-3.5 text-[10px] text-[#bf9c85] font-bold uppercase tracking-widest">
                <Heart className="w-3.5 h-3.5 fill-[#bf9c85]" />
                <span>Emma &amp; Arthur — September 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
