import { motion } from "motion/react";
import { Building2, Church, Utensils, MapPin, Clock, ExternalLink } from "lucide-react";
import brideHouseImg from "../assets/images/bride_house_1781429832477.jpg";
import churchImg from "../assets/images/wedding_church_1781429848718.jpg";
import restaurantImg from "../assets/images/wedding_restaurant_1781429864364.jpg";

interface DetailCardProps {
  id: string;
  type: "house" | "church" | "restaurant";
  title: string;
  subtitle: string;
  time: string;
  address: string;
  mapLink: string;
  image: string;
  caption: string;
  description: string;
  index: number;
  key?: string | number;
}

function DetailCard({
  type,
  title,
  subtitle,
  time,
  address,
  mapLink,
  image,
  caption,
  description,
  index,
}: DetailCardProps) {
  const IconMap = {
    house: Building2,
    church: Church,
    restaurant: Utensils,
  };

  const Icon = IconMap[type] || Building2;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 30 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.3 } }}
      transition={{ type: "spring", stiffness: 45, damping: 14, mass: 1.1 }}
      className="w-full max-w-3xl mx-auto bg-white rounded-3xl border border-[#ece4db] shadow-md overflow-hidden flex flex-col mb-16 select-none"
    >
      {/* Large beautiful Image Block on top */}
      <div className="w-full relative h-[320px] md:h-[450px] overflow-hidden">
        <img
          src={image}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c2523]/70 via-[#2c2523]/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-6 left-6 right-6 text-white text-xs tracking-wider italic font-display bg-[#3d3129]/75 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 w-fit">
          {caption}
        </div>
      </div>

      {/* Information stacked directly underneath */}
      <div className="w-full p-8 md:p-12 flex flex-col justify-between bg-[#fffefe]">
        <div>
          {/* Section Marker */}
          <div className="flex items-center gap-2 text-xxs uppercase tracking-[0.2em] text-[#bf9c85] font-semibold mb-4">
            <Icon className="w-4 h-4 text-[#bf9c85]" />
            <span>{subtitle}</span>
          </div>

          <h3 className="font-display text-3xl md:text-4xl font-bold text-[#3d3129] leading-tight mb-5">
            {title}
          </h3>

          <p className="font-sans text-sm md:text-base text-[#5c4e43]/90 leading-relaxed mb-8">
            {description}
          </p>

          {/* Logistics Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#f3e9dc] pt-8">
            <div className="flex items-start gap-3.5 text-sm text-[#3d3129]">
              <div className="p-2.5 bg-[#faf6f0] rounded-xl text-[#bf9c85]">
                <Clock className="w-4.5 h-4.5 shrink-0" />
              </div>
              <div>
                <span className="font-semibold block text-[#8a7261] text-xxs uppercase tracking-wider mb-0.5">Time Schedule</span>
                <span className="font-sans text-sm font-medium">{time}</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-sm text-[#3d3129]">
              <div className="p-2.5 bg-[#faf6f0] rounded-xl text-[#bf9c85]">
                <MapPin className="w-4.5 h-4.5 shrink-0" />
              </div>
              <div>
                <span className="font-semibold block text-[#8a7261] text-xxs uppercase tracking-wider mb-0.5">Location Address</span>
                <span className="font-sans text-sm font-medium leading-relaxed">{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-neutral-100/80 flex justify-end">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-[#bf9c85] hover:bg-[#8d705c] text-white py-3 px-6 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function DetailsBlock() {
  const blocks = [
    {
      id: "house",
      type: "house" as const,
      title: "Bride's Preparation House",
      subtitle: "The Morning Preparations",
      time: "11:00 AM — Family traditional greeting & light bites",
      address: "Villa di Maiano, Via del Salviatino, 1, 50137 Fiesole FI, Italy",
      mapLink: "https://maps.google.com/?q=Villa+di+Maiano+Fiesole+Italy",
      image: brideHouseImg,
      caption: "Bridal Suite & Gardens",
      description: "Our wedding morning begins at the elegant Villa di Maiano. Complete with cherry orchards and sweeping valleys, this is where the bride will prepare along with close relatives, welcoming the groom and early arrivals with traditional Tuscan lemonade and local pastries.",
    },
    {
      id: "church",
      type: "church" as const,
      title: "The Holy Matrimony",
      subtitle: "The Sacred Vows",
      time: "02:30 PM — Ceremony starts promptly",
      address: "Basilica di San Miniato al Monte, Via delle Porte Sante, 34, 50125 Firenze FI, Italy",
      mapLink: "https://maps.google.com/?q=Basilica+di+San+Miniato+al+Monte+Florence+Italy",
      image: churchImg,
      caption: "San Miniato Chapel overlooking Florence",
      description: "We will exchange our sacred wedding vows inside the timeless 11th-century Basilica di San Miniato al Monte. Let the serene beauty, classical choral pieces, and golden mosaics bear witness to our lifetime covenant. Guest seating begins at 2:00 PM.",
    },
    {
      id: "restaurant",
      type: "restaurant" as const,
      title: "The Celebration Banquet",
      subtitle: "Cocktails, Dining & Dancing",
      time: "05:30 PM — Cocktails, dinner served at 07:00 PM",
      address: "Villa Cora Hotel & estate, Viale Machiavelli, 18, 50125 Firenze FI, Italy",
      mapLink: "https://maps.google.com/?q=Villa+Cora+Florence+Italy",
      image: restaurantImg,
      caption: "Fairy-lit wedding garden reception table",
      description: "A short shuttle ride will transport guests to the majestic Villa Cora, where we will salute the sunset with aperitivos before dining inside the beautiful, fairy-lit gardens. Prepare for fine wine, artisan food, and endless dancing!",
    },
  ];

  return (
    <section id="details-section" className="py-20 px-4 max-w-5xl mx-auto">
      {/* Title block */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-xxs uppercase tracking-[0.25em] text-[#bf9c85] font-semibold"
        >
          Special Day Details
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl font-bold text-[#3d3129] mt-3"
        >
          Where &amp; When
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-16 h-0.5 bg-[#eddccb] mx-auto mt-6"
        />
      </div>

      {/* Main vertical sequence of events */}
      <div className="flex flex-col gap-2">
        {blocks.map((block, idx) => (
          <DetailCard
            key={block.id}
            id={block.id}
            type={block.type}
            title={block.title}
            subtitle={block.subtitle}
            time={block.time}
            address={block.address}
            mapLink={block.mapLink}
            image={block.image}
            caption={block.caption}
            description={block.description}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
