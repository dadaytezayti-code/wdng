import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, UserCheck, Sparkles, MessageSquareHeart, Search, Filter, AlertCircle, RefreshCw } from "lucide-react";
import { RSVP } from "../types";

export default function GuestRegistry() {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchRegistry = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/rsvps");
      if (res.ok) {
        const data = await res.json();
        setRsvps(data);
      } else {
        setErrorMsg("Could not load the guest directory.");
      }
    } catch (err) {
      setErrorMsg("Failed to connect to guest directory services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistry();
  }, []);

  // Helper numbers calculations
  const totalSubmissions = rsvps.length;
  const attendingCount = rsvps.filter((r) => r.attendance === "yes").length;
  const tentativeCount = rsvps.filter((r) => r.attendance === "tentative").length;
  const declinedCount = rsvps.filter((r) => r.attendance === "no").length;

  const totalHeadsExpected = rsvps
    .filter((r) => r.attendance === "yes")
    .reduce((sum, r) => sum + 1 + (Number(r.plusOneCount) || 0), 0);

  const filteredRsvps = rsvps.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (r.note && r.note.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.plusOneNames && r.plusOneNames.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && r.attendance === statusFilter;
  });

  return (
    <section id="guest-list-section" className="py-24 px-4 bg-white border-t border-[#ece4db] select-none">
      <div className="max-w-5xl mx-auto">
        {/* Title block */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="text-xxs uppercase tracking-[0.25em] text-[#bf9c85] font-semibold flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sharing the Joy</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-3xl md:text-5xl font-bold text-[#3d3129] mt-3"
          >
            Guestbook &amp; Wishes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm text-[#8a7261] mt-3 max-w-lg mx-auto leading-relaxed"
          >
            A beautiful, live wall of who is attending and their heartwarming congratulatory messages. Feel free to find your invitation card here.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-16 h-0.5 bg-[#eddccb] mx-auto mt-6"
          />
        </div>

        {/* Wedding Stats Cards with Scroll animations */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-12"
        >
          {[
            { title: "Guests Expected", count: totalHeadsExpected, icon: Users, color: "text-[#bf9c85] bg-[#bf9c85]/10 border-[#bf9c85]/20" },
            { title: "Acceptances", count: attendingCount, icon: UserCheck, color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
            { title: "Tentative", count: tentativeCount, icon: AlertCircle, color: "text-orange-700 bg-orange-50/60 border-orange-100" },
            { title: "Regretfully Decline", count: declinedCount, icon: MessageSquareHeart, color: "text-neutral-500 bg-neutral-50 border-neutral-200" },
          ].map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl border border-[#ece4db] bg-[#fafaf8] flex flex-col items-center justify-center shadow-xs"
              >
                <div className={`p-2 rounded-full ${stat.color} mb-3`}>
                  <StatIcon className="w-4 h-4" />
                </div>
                <span className="block font-display text-2xl md:text-3xl font-bold text-[#3d3129] mb-1">
                  {loading ? "..." : stat.count}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8a7261]">
                  {stat.title}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filters and Utilities with Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 mb-8 items-center bg-[#faf6f0] border border-[#ece4db] px-5 py-4 rounded-2xl justify-between"
        >
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7261]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by registered guest name..."
              className="w-full bg-white border border-[#ece4db] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#3d3129] placeholder-neutral-400 focus:outline-hidden focus:border-[#bf9c85]"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto items-stretch">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-[#ece4db] rounded-xl px-3 py-2 text-xs text-[#3d3129] focus:outline-hidden focus:border-[#bf9c85] grow appearance-none pr-8 relative cursor-pointer"
            >
              <option value="all">show all responses</option>
              <option value="yes">Joyfully Attending</option>
              <option value="tentative">Unsure/Tentative</option>
              <option value="no">Declined</option>
            </select>

            <button
              onClick={fetchRegistry}
              disabled={loading}
              className="px-3.5 bg-white hover:bg-neutral-50 border border-[#ece4db] rounded-xl flex items-center justify-center transition-colors hover:text-[#bf9c85]"
              title="Refresh messages wall"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#bf9c85]" : "text-neutral-500"}`} />
            </button>
          </div>
        </motion.div>

        {/* Guestbook Cards Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#bf9c85] mx-auto mb-4" />
              <p className="text-xs text-[#8a7261] italic">Scribbling in the guestbook...</p>
            </div>
          ) : errorMsg ? (
            <div className="text-center py-12 text-rose-600 bg-rose-50 rounded-2xl p-4 max-w-md mx-auto">
              <AlertCircle className="w-5 h-5 mx-auto mb-2 text-rose-500" />
              <p className="text-xs font-semibold">{errorMsg}</p>
            </div>
          ) : filteredRsvps.length === 0 ? (
            <div className="text-center py-16 bg-[#faf6f0] border border-[#ece4db] border-dashed rounded-3xl p-8 max-w-xl mx-auto">
              <MessageSquareHeart className="w-8 h-8 text-[#bf9c85] mx-auto mb-3 opacity-60" />
              <p className="text-sm font-semibold text-[#3d3129]">No stories written here yet</p>
              <p className="text-xs text-[#8a7261] mt-1.5 leading-relaxed">
                Be the first to submit your RSVP and write a custom warm message or congratulations! It will be instantly featured here.
              </p>
            </div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredRsvps.map((rsvp) => {
                const colors = {
                  yes: "border-[#bf9c85] bg-[#fffcf9]",
                  tentative: "border-[#dca3a3] bg-white",
                  no: "border-neutral-200 bg-slate-50/40",
                };

                const badges = {
                  yes: "bg-[#bf9c85]/15 text-[#8d705c]",
                  tentative: "bg-[#dca3a3]/20 text-[#a67474]",
                  no: "bg-neutral-100 text-neutral-500",
                };

                return (
                  <motion.div
                    key={rsvp.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`p-6 md:p-8 rounded-3xl border shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between ${
                      colors[rsvp.attendance] || "border-[#ece4db] bg-white"
                    }`}
                  >
                    <div>
                      {/* Badge / Status */}
                      <div className="flex justify-between items-start mb-4 gap-2">
                        <div>
                          <strong className="font-display text-lg md:text-xl text-[#3d3129] block leading-tight">
                            {rsvp.name}
                          </strong>
                          {rsvp.attendance === "yes" && rsvp.plusOneCount > 0 && (
                            <span className="text-xxs text-[#8a7261] mt-1 block">
                              and {rsvp.plusOneCount} guest{rsvp.plusOneCount > 1 ? "s" : ""} ({rsvp.plusOneNames})
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] md:text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${badges[rsvp.attendance]}`}>
                          {rsvp.attendance === "yes" ? "Attending" : rsvp.attendance === "tentative" ? "Tentative" : "Decline"}
                        </span>
                      </div>

                      {/* Guest Wish Message */}
                      <div className="relative mt-4 mb-4">
                        <span className="font-display text-4xl text-[#bf9c85]/20 absolute -top-5 -left-1 select-none">“</span>
                        <p className="font-serif italic text-sm text-[#5c4e43] leading-relaxed relative pl-4 pt-1 break-words">
                          {rsvp.note && rsvp.note.trim() ? rsvp.note : "Sent their love and digital RSVP card! Can't wait for September."}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-neutral-400 mt-4 pt-4 border-t border-[#f3e9dc]/60">
                      <span>Live Response Registry</span>
                      <span>
                        {rsvp.updatedAt ? new Date(rsvp.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
