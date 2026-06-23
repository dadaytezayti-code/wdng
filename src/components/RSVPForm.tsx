import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Users, Check, CheckCircle2, RotateCcw, AlertCircle, Sparkles, Music, Database, Terminal, Copy, ExternalLink, HelpCircle } from "lucide-react";
import { RSVP } from "../types";

const SHEETS_WEBAPP_URL = (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBAPP_URL || "";

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVP>({
    name: "",
    attendance: "yes",
    side: "bride",
    musicSuggestions: "",
    plusOneCount: 0,
    arrivalLocations: [],
  });

  const [loading, setLoading] = useState(false);
  const [checkingRecord, setCheckingRecord] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [rsvpId, setRsvpId] = useState<string | null>(null);
  const [savedRecord, setSavedRecord] = useState<RSVP | null>(null);
  const [mockEmailSentDetails, setMockEmailSentDetails] = useState<{ to: string; subject: string; bodySummary: string; simulatedAt: string } | null>(null);
  
  // Custom Google Sheets Setup Guidance States
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [checkingConfig, setCheckingConfig] = useState<boolean>(true);
  const [showSetupGuide, setShowSetupGuide] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const LOCAL_STORAGE_KEY = "emma_arthur_rsvp_id";

  // Check on component load if Google Sheet integration is configured
  useEffect(() => {
    const initData = async () => {
      // Fetch config status from environment or local proxy
      let sheetsConfigured = !!SHEETS_WEBAPP_URL;
      if (!sheetsConfigured) {
        try {
          const configRes = await fetch("/api/sheets-config");
          if (configRes.ok) {
            const configData = await configRes.json();
            sheetsConfigured = configData.configured;
          }
        } catch (err) {
          console.error("Failed to fetch sheets configuration:", err);
        }
      }
      setIsConfigured(sheetsConfigured);
      setCheckingConfig(false);
    };

    initData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "plusOneCount" ? Math.max(0, Number(value)) : value,
    }));
  };

  const handleAttendanceChange = (val: "yes" | "no" | "tentative") => {
    setFormData((prev) => ({
      ...prev,
      attendance: val,
      plusOneCount: val === "no" ? 0 : prev.plusOneCount,
      arrivalLocations: val === "no" ? [] : prev.arrivalLocations,
      musicSuggestions: val === "no" ? "" : prev.musicSuggestions,
    }));
  };

  const handleSideChange = (val: "bride" | "spouse") => {
    setFormData((prev) => ({ ...prev, side: val }));
  };

  const handleLocationToggle = (location: string) => {
    setFormData((prev) => {
      const current = prev.arrivalLocations || [];
      const updated = current.includes(location)
        ? current.filter((l) => l !== location)
        : [...current, location];
      return { ...prev, arrivalLocations: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!formData.name.trim()) {
      setErrorMsg("Խնդրում ենք լրացնել Ձեր անունը, ազգանունը։");
      setLoading(false);
      return;
    }

    if (formData.attendance === "yes") {
      if (!formData.arrivalLocations || formData.arrivalLocations.length === 0) {
        setErrorMsg("Խնդրում ենք ընտրել առնվազն մեկ արարողություն, որին մասնակցելու եք։");
        setLoading(false);
        return;
      }
    }

    try {
      const payload = {
        ...formData,
        id: rsvpId || "rsvp_" + Math.random().toString(36).substring(2, 11),
      };

      let result;
      let ok = false;
      let triedLocal = false;

      // Try local full-stack Express API route first to completely bypass browser CORS policies!
      try {
        const res = await fetch("/api/rsvps", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          result = await res.json();
          ok = true;
          triedLocal = true;
        } else if (res.status === 404) {
          // If 404, we are in a purely static client environment and need to fall back
          triedLocal = false;
        } else {
          triedLocal = true;
          const errData = await res.json().catch(() => ({}));
          setErrorMsg(errData.error || "Something went wrong. Please try again.");
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Local API endpoint not available, falling back to direct Sheets client-side fetch...", err);
      }

      // Fallback to direct client-side Google Sheets submit if local Express server is not available
      if (!ok && !triedLocal && SHEETS_WEBAPP_URL) {
        const res = await fetch(SHEETS_WEBAPP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain", // Use text/plain to bypass CORS preflight checks in standard Google Apps Script
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const text = await res.text();
          let json: any = {};
          try {
            json = JSON.parse(text);
          } catch (e) {
            json = { status: "success" };
          }

          if (json.status === "error") {
            setErrorMsg(json.error || "Google Sheets script returned an error.");
          } else {
            ok = true;
            result = {
              record: payload,
              emailNotificationMock: {
                to: "emma.arthur.wedding2026@gmail.com",
                subject: `🔔 Wedding RSVP Update (Serverless Sheets): ${payload.name}`,
                bodySummary: `Dear Emma & Arthur, ${payload.name} responded as ${payload.attendance}.`,
                simulatedAt: new Date().toISOString()
              }
            };
          }
        } else {
          setErrorMsg("Could not store RSVP to Google Sheets Web App. Please check the network.");
        }
      }

      if (ok && result) {
        setSuccess(true);
      }
    } catch (err) {
      setErrorMsg("Network error occurred. Please check your internet connection.");
      console.error("RSVP submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setSuccess(false);
    setErrorMsg("");
  };

  if (checkingRecord) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#bf9c85]" />
        <span className="text-sm text-[#8a7261] mt-4 font-medium italic">Loading your invitation...</span>
      </div>
    );
  }

  return (
    <section id="rsvp-section" className="py-16 px-4 bg-[#faf6f0] border-t border-[#ece4db] select-none">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-xxs uppercase tracking-[0.25em] text-[#bf9c85] font-bold mx-auto w-fit">
            <Sparkles className="w-4 h-4 text-[#bf9c85] shrink-0" />
            <span>Միացեք մեր տոնին</span>
          </div>
          <p className="text-sm text-[#8a7261] mt-3 max-w-md mx-auto leading-relaxed font-sans">
            Խնդրում ենք հաստատել մասնակցությունը մինչև 2026թ․ Հուլիսի 10-ը
          </p>
          <div className="w-16 h-0.5 bg-[#eddccb] mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 45, damping: 13, delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#ece4db] shadow-xl p-6 md:p-10 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-sm border border-emerald-100">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#3d3129] mb-3">
                  Շնորհակալություն պատասխանի համար:
                </h3>
                <p className="text-sm text-[#5c4e43] max-w-sm mx-auto leading-relaxed">
                  {formData.attendance === "yes"
                    ? "Մենք անչափ ուրախ ենք, որ միանալու եք մեզ՝ միասին տոնելու մեր կյանքի կարևորագույն օրը։ Ձեր պատասխանը հաջողությամբ պահպանվել է։"
                    : "Ձեր պատասխանը հաջողությամբ պահպանվել է։ Թեև կտխրենք ձեր բացակայության համար, բայց անչափ շնորհակալ ենք տեղեկացնելու համար։"}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="rsvp-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Form Error Message */}
                {errorMsg && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <div>
                      <p className="font-semibold">Սխալ հաստատման ժամանակ</p>
                      <p className="mt-0.5 leading-relaxed">{errorMsg}</p>
                    </div>
                  </div>
                )}

                {/* Primary Guest Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                    Ձեր Անունը, Ազգանունը
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bf9c85]" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="օրինակ՝ Արամ Կարապետյան"
                      disabled={loading || !!rsvpId}
                      required
                      className="w-full bg-white border border-[#ece4db] disabled:bg-[#fbf9f4] disabled:text-neutral-500 rounded-2xl py-3 pl-11 pr-4 text-sm text-[#3d3129] placeholder-[#a6968a] focus:outline-hidden focus:border-[#bf9c85] focus:ring-1 focus:ring-[#bf9c85] transition-all"
                    />
                  </div>
                  {rsvpId && (
                    <p className="text-[10px] text-neutral-500 italic mt-1 font-sans">
                      Անունը հաստատված է և փոփոխման ենթակա չէ։
                    </p>
                  )}
                </div>

                {/* Attendance Buttons */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                    Մասնակցելո՞ւ եք
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { val: "yes", label: "Սիրով կգամ", bg: "hover:border-[#bf9c85]", activeBg: "bg-[#bf9c85] text-white border-[#bf9c85]" },
                      { val: "no", label: "Ցավոք, չեմ կարող", bg: "hover:border-[#8d705c]", activeBg: "bg-[#8d705c] text-white border-[#8d705c]" },
                    ].map((btn) => (
                      <button
                        key={btn.val}
                        type="button"
                        onClick={() => handleAttendanceChange(btn.val as any)}
                        className={`py-3 px-2 rounded-2xl border border-[#ece4db] text-xs font-medium transition-all duration-300 cursor-pointer ${
                          formData.attendance === btn.val ? btn.activeBg + " shadow-xs font-semibold" : "bg-white text-[#5c4e43] " + btn.bg
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RSVP Details (Only visible if attending 'yes', with instant rendering/no animations) */}
                {formData.attendance === "yes" && (
                  <div className="space-y-4 pt-2">
                    {/* Plus One Selection (Now a clean number input!) */}
                    <div className="space-y-1.5">
                      <label htmlFor="plusOneCount" className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                        Ուղեկցող անձանց քանակը
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bf9c85]" />
                        <input
                          type="number"
                          id="plusOneCount"
                          name="plusOneCount"
                          min="0"
                          max="10"
                          value={formData.plusOneCount}
                          onChange={handleChange}
                          className="w-full bg-white border border-[#ece4db] rounded-2xl py-3 pl-11 pr-4 text-sm text-[#3d3129] focus:outline-hidden focus:border-[#bf9c85] transition-all"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Arrival Locations (Required) */}
                    <div className="space-y-2 pt-1">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                        Ո՞ր արարողություններին եք մասնակցելու <span className="text-[#bf9c85] font-extrabold">*</span>
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: "prep", label: "Հարսի տուն՝ ք․ Երևան", desc: "Ավանդական առավոտյան հանդիսություն և հարսի տան արարողություն" },
                          { id: "church", label: "Պսակադրություն", desc: "Պսակադրություն և սուրբ ուխտի օրհնություն Նորք-Մարաշի Սուրբ Աստվածածին եկեղեցում" },
                          { id: "restaurant", label: "Հարսանեկան Խնջույք", desc: "Հարսանեկան խնջույք և ընթրիք «Ոսկե Ծիրան» այգի-ռեստորանում" },
                        ].map((loc) => {
                          const isSelected = (formData.arrivalLocations || []).includes(loc.label);
                          return (
                            <button
                              key={loc.id}
                              type="button"
                              onClick={() => handleLocationToggle(loc.label)}
                              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                                isSelected
                                  ? "bg-[#bf9c85]/10 border-[#bf9c85] text-[#3d3129]"
                                  : "bg-white border-[#ece4db] text-[#5c4e43] hover:border-[#bf9c85]/50"
                              }`}
                            >
                              <div className="pr-4 font-sans">
                                <p className="text-xs font-semibold">{loc.label}</p>
                              </div>
                              <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                                isSelected
                                  ? "bg-[#bf9c85] border-[#bf9c85] text-white"
                                  : "border-[#ece4db] bg-white text-transparent"
                              }`}>
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Music Suggestions (Optional) */}
                    <div className="space-y-1.5 pt-1">
                      <label htmlFor="musicSuggestions" className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                        Երաժշտական առաջարկություններ
                      </label>
                      <div className="relative">
                        <Music className="absolute left-3.5 top-3.5 w-4 h-4 text-[#bf9c85]" />
                        <textarea
                          id="musicSuggestions"
                          name="musicSuggestions"
                          rows={3}
                          value={formData.musicSuggestions || ""}
                          onChange={handleChange}
                          placeholder="Ի՞նչ երգեր կցանկանաք լսել պարահրապարակում"
                          className="w-full bg-white border border-[#ece4db] rounded-2xl py-3 pl-11 pr-4 text-sm text-[#3d3129] placeholder-[#a6968a] focus:outline-hidden focus:border-[#bf9c85] transition-all resize-none font-sans"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#bf9c85]/90 hover:bg-[#8d705c] disabled:bg-[#d5c6bc] text-white py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    {loading ? "Ուղարկվում է..." : "Ուղարկել պատասխանը"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
