import { motion } from "motion/react";
import { Building2, Church, Utensils, MapPin, Clock, ExternalLink } from "lucide-react";
import brideHouseImg from "../assets/images/bride_house_1781429832477.jpg";
import churchImg from "../assets/images/nork_church_v2_1782248501443.jpg";
import restaurantImg from "../assets/images/voske_tsiran_banquet_v2_1782155413948.jpg";

interface DetailCardProps {
  type: "house" | "church" | "restaurant";
  title: string;
  time: string;
  address: string;
  mapLink: string;
  image: string;
  index: number;
  imagePosition?: string;
  key?: string | number;
}

function DetailCard({
  type,
  title,
  time,
  address,
  mapLink,
  image,
  index,
  imagePosition = "object-center",
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      transition={{ type: "spring", stiffness: 50, damping: 15 }}
      className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-[#ece4db]/70 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-all duration-300"
    >
      {/* Large beautiful Image Block on top */}
      <div className="w-full relative h-[240px] sm:h-[400px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover ${imagePosition} transition-transform duration-700 hover:scale-102`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a3b32]/15 to-transparent pointer-events-none" />
      </div>

      {/* Information stacked directly underneath */}
      <div className="w-full p-6 sm:p-8 flex flex-col justify-between bg-white text-[#4a3b32]">
        <div className="flex flex-col gap-4">
          {/* Header/Name - Not Bold, styled elegantly with an icon background */}
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-[#faf6f0] rounded-xl text-[#bf9c85] shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-sans text-sm sm:text-base md:text-lg font-normal text-[#4a3b32] leading-tight">
                {title}
              </h3>
            </div>
          </div>

          {/* Time - cleanly stacked with identical layout and backgrounds */}
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-[#faf6f0] rounded-xl text-[#bf9c85] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm sm:text-base md:text-lg font-normal text-[#4a3b32] leading-tight">{time}</span>
            </div>
          </div>

          {/* Location - cleanly stacked with identical layout and backgrounds */}
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-[#faf6f0] rounded-xl text-[#bf9c85] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm sm:text-base md:text-lg font-normal text-[#4a3b32] leading-tight">{address}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-4 border-t border-[#fdfbf7] flex justify-end">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xxs font-extrabold tracking-widest uppercase bg-[#bf9c85] hover:bg-[#8d705c] text-white py-2.5 px-5 rounded-full transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>Բացել Քարտեզը</span>
            <ExternalLink className="w-3 h-3" />
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
      title: "Հարսի Տուն",
      time: "11:00",
      address: "Արաբկիր, ք․ Երևան",
      mapLink: "https://maps.google.com/?q=Yerevan+Arabkir",
      image: brideHouseImg,
    },
    {
      id: "church",
      type: "church" as const,
      title: "Պսակադրություն",
      time: "14:30",
      address: "Սուրբ Աստվածածին եկեղեցի, Արմենակ Արմենակյան 225",
      mapLink: "https://www.google.com/maps/place/%D0%A6%D0%B5%D1%80%D0%BA%D0%BE%D0%B2%D1%8C+%D0%A1%D0%B2%D1%8F%D1%82%D0%BE%D0%B9+%D0%91%D0%BE%D0%B3%D0%BE%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8+(%D0%90%D1%81%D1%82%D0%B2%D0%B0%D1%86%D0%B0%D1%86%D0%B8%D0%BD)/@40.2488979,44.498597,12z/data=!4m10!1m2!2m1!1sHoly+Mother+of+God+Church+Nork+Marash+Yerevan!3m6!1s0x406abdc910d0cde3:0x607b5f901e5912da!8m2!3d40.1868101!4d44.5409983!15sCi1Ib2x5IE1vdGhlciBvZiBHb2QgQ2h1cmNoIE5vcmsgTWFyYXNoIFllcmV2YW6SAQ9hcm1lbmlhbl9jaHVyY2jgAQA!16s%2Fg%2F11clt0sdmh?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D",
      image: churchImg,
      imagePosition: "object-[center_15%]",
    },
    {
      id: "restaurant",
      type: "restaurant" as const,
      title: "Հարսանեկան Խնջույք",
      time: "17:30 — դիմավորում, 18:00 — սկիզբ",
      address: "«Ոսկե Ծիրան Պրեմիում Հոլլ», ք. Արտաշատ, Աբովյան 91",
      mapLink: "https://www.google.com/maps/place/%D5%88%D5%BD%D5%AF%D5%A5+%D4%BE%D5%AB%D6%80%D5%A1%D5%B6+%D5%8A%D6%80%D5%A5%D5%B4%D5%AB%D5%B8%D6%82%D5%B4+%D5%80%D5%B8%D5%AC%D5%AC,+Voske+Tsiran+Premium+Hall/@40.2484595,44.2513537,10z/data=!4m10!1m2!2m1!1sVoske+Tsiran+Restaurant+Armenia!3m6!1s0x406acb50fb6f21d9:0xc39bc444499a18f1!8m2!3d39.9729824!4d44.5409704!15sCh9Wb3NrZSBUc2lyYW4gUmVzdGF1cmFudCBBcm1lbmlhWiEiH3Zvc2tlIHRzaXJhbiByZXN0YXVyYW50IGFybWVuaWGSAQpyZXN0YXVyYW50mgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDI1U2VHSkRNVWRTUlRneVRqSmFhVkpyVmtWVU0xcG9WR3hHV2swell4QULgAQD6AQQIYRAd!16s%2Fg%2F11x8t403w5?entry=ttu&g_ep=EgoyMDI2MDYyMS4wIKXMDSoASAFQAw%3D%3D",
      image: restaurantImg,
    },
  ];

  return (
    <section id="details-section" className="py-16 px-4 bg-gradient-to-b from-[#fcfaf7] to-[#fdfbf7]">
      <div className="max-w-4xl mx-auto">
        {/* Title block */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#8a7261] mt-3 max-w-md mx-auto leading-relaxed font-sans"
          >
            Սիրով ներկայացնում ենք մեր տոնակատարության վայրերը, որպեսզի հեշտությամբ գտնեք ձեր ճանապարհը։
          </motion.p>
          <div className="w-16 h-0.5 bg-[#eddccb] mx-auto mt-6" />
        </div>

        {/* Main vertical sequence of events */}
        <div className="space-y-12">
          {blocks.map((block, idx) => (
            <DetailCard
              key={block.id}
              type={block.type}
              title={block.title}
              time={block.time}
              address={block.address}
              mapLink={block.mapLink}
              image={block.image}
              imagePosition={block.imagePosition}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

