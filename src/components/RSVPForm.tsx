import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Users, Check, CheckCircle2, RotateCcw, AlertCircle, Sparkles, Music } from "lucide-react";
import { RSVP } from "../types";

export default function RSVPForm() {
  const [formData, setFormData] = useState<RSVP>({
    name: "",
    attendance: "yes",
    side: "bride",
    musicSuggestions: "",
    plusOneCount: 0,
    plusOneNames: "",
  });

  const [loading, setLoading] = useState(false);
  const [checkingRecord, setCheckingRecord] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [rsvpId, setRsvpId] = useState<string | null>(null);
  const [savedRecord, setSavedRecord] = useState<RSVP | null>(null);
  const [mockEmailSentDetails, setMockEmailSentDetails] = useState<{ to: string; subject: string; bodySummary: string; simulatedAt: string } | null>(null);

  const LOCAL_STORAGE_KEY = "emma_arthur_rsvp_id";

  // Check on component load if we have a saved RSVP ID
  useEffect(() => {
    const fetchSavedRSVP = async () => {
      const savedId = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedId) {
        try {
          const res = await fetch(`/api/rsvps/${savedId}`);
          if (res.ok) {
            const data = await res.json();
            setRsvpId(savedId);
            setSavedRecord(data);
            setFormData({
              name: data.name,
              attendance: data.attendance || "yes",
              side: data.side || "bride",
              musicSuggestions: data.musicSuggestions || "",
              plusOneCount: data.plusOneCount || 0,
              plusOneNames: data.plusOneNames || "",
            });
          } else {
            // Token was invalid or deleted from server
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        } catch (err) {
          console.error("Failed to load existing RSVP:", err);
        }
      }
      setCheckingRecord(false);
    };

    fetchSavedRSVP();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "plusOneCount" ? Math.max(0, Number(value)) : value,
    }));
  };

  const handleAttendanceChange = (val: "yes" | "no" | "tentative") => {
    setFormData((prev) => ({ ...prev, attendance: val }));
  };

  const handleSideChange = (val: "bride" | "spouse") => {
    setFormData((prev) => ({ ...prev, side: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        id: rsvpId, // Enforce editing if we already have an rsvpId
      };

      const res = await fetch("/api/rsvps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.error || "Something went wrong. Please try again.");
      } else {
        // Save ID in local storage so client remembers them
        const savedId = result.record.id;
        localStorage.setItem(LOCAL_STORAGE_KEY, savedId);
        setRsvpId(savedId);
        setSavedRecord(result.record);
        setMockEmailSentDetails(result.emailNotificationMock || null);
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
    <section id="rsvp-section" className="py-24 px-4 bg-[#faf6f0] border-t border-[#ece4db] select-none">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-xxs uppercase tracking-[0.25em] text-[#bf9c85] font-semibold">Join Our Celebration</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#3d3129] mt-3">R.S.V.P</h2>
          <p className="text-xs text-[#8a7261] mt-2 italic font-display">
            Please respond on or before August 15, 2026
          </p>
          <div className="w-12 h-0.5 bg-[#eddccb] mx-auto mt-4" />
        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ type: "spring", stiffness: 45, damping: 13, delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#ece4db] shadow-xl p-6 md:p-10 relative overflow-hidden"
        >
          {rsvpId && savedRecord && !success && (
            <div className="mb-8 p-4 bg-[#fbf9f4] border border-[#ece4db] rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-[#5c4e43]">
                <p className="font-semibold text-[#3d3129]">
                  We got your RSVP, {savedRecord.name}!
                </p>
                <p className="mt-1">
                  You registered as:{" "}
                  <strong className="text-[#a47a5f]">
                    {savedRecord.attendance === "yes"
                      ? "Attending"
                      : savedRecord.attendance === "no"
                      ? "Declined"
                      : "Unsure/Tentative"}
                  </strong>
                  {" "}on the{" "}
                  <strong className="text-[#a47a5f] capitalize">
                    {savedRecord.side || "bride"}'s side
                  </strong>
                  {savedRecord.plusOneCount > 0 ? ` (With ${savedRecord.plusOneCount} additional guests)` : ""}.
                </p>
                <p className="mt-2 text-xxs text-[#8a7261]">
                  You can modify your responses below and submit again anytime.
                </p>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-sm border border-emerald-100">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#3d3129] mb-3">
                  Thank You for Responding!
                </h3>
                <p className="text-sm text-[#5c4e43] max-w-sm mx-auto leading-relaxed mb-6">
                  {formData.attendance === "yes"
                    ? `We are thrilled that you will join us on our wedding day to celebrate with ${formData.side === "bride" ? "Emma" : "Arthur"}! Your response has been saved securely.`
                    : formData.attendance === "tentative"
                    ? "We have recorded your tentative attendance. Let us know if your plans solidify!"
                    : "We will miss you on our special day! Thank you for letting us know."}
                </p>

                {mockEmailSentDetails && (
                  <div className="my-6 p-5 bg-[#faf8f5] rounded-2xl border border-[#ece4db] text-left max-w-md mx-auto">
                    <h4 className="text-xs font-bold text-[#8a7261] uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Email Notification Simulation
                    </h4>
                    <p className="text-xxs text-[#5c4e43] leading-relaxed mb-3">
                      Your submission successfully triggered a real-time mock notification dispatch to the wedding couple:
                    </p>
                    <div className="p-3 bg-white border border-[#ece4db] rounded-xl font-mono text-[10px] space-y-1 bg-[#fffdfc]">
                      <div><span className="text-[#bf9c85]">To:</span> {mockEmailSentDetails.to}</div>
                      <div><span className="text-[#bf9c85]">Subject:</span> {mockEmailSentDetails.subject}</div>
                      <div><span className="text-[#bf9c85]">Summary:</span> {mockEmailSentDetails.bodySummary}</div>
                    </div>
                    <p className="text-[10px] text-neutral-400 italic mt-2.5 leading-snug">
                      Note: In production, the backend replaces this simulator with official SMTP mailers or services like Resend or SendGrid.
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 max-w-[240px] mx-auto">
                  <button
                    onClick={handleResetForm}
                    className="inline-flex items-center justify-center gap-2 w-full bg-[#fcfaf7] hover:bg-[#faf6f0] text-[#3d3129] border border-[#ece4db] py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Edit your response</span>
                  </button>
                  
                  <span className="text-[10px] text-[#8a7261] italic">
                    Your details are remembered on this device!
                  </span>
                </div>
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
                      <p className="font-semibold">Cannot Submit RSVP</p>
                      <p className="mt-0.5 leading-relaxed">{errorMsg}</p>
                    </div>
                  </div>
                )}

                {/* Primary Guest Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#bf9c85]" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Jean Dupont"
                      disabled={loading || !!rsvpId}
                      required
                      className="w-full bg-white border border-[#ece4db] disabled:bg-[#fbf9f4] disabled:text-neutral-500 rounded-2xl py-3 pl-11 pr-4 text-sm text-[#3d3129] placeholder-[#a6968a] focus:outline-hidden focus:border-[#bf9c85] focus:ring-1 focus:ring-[#bf9c85] transition-all"
                    />
                  </div>
                  {rsvpId && (
                    <p className="text-[10px] text-neutral-500 italic mt-1">
                      Primary guest name is locked in. Contact us if you need to rename this card.
                    </p>
                  )}
                </div>

                {/* Attendance Buttons */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                    Will you attend?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: "yes", label: "Joyfully Accept", bg: "hover:border-[#bf9c85]", activeBg: "bg-[#bf9c85] text-white border-[#bf9c85]" },
                      { val: "tentative", label: "Tentative / Unsure", bg: "hover:border-[#dcb59f]", activeBg: "bg-[#dca3a3] text-white border-[#dca3a3]" },
                      { val: "no", label: "Regretfully Decline", bg: "hover:border-neutral-400", activeBg: "bg-neutral-600 text-white border-neutral-600" },
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

                {/* Side Selection (Attending whose side: Bride/Spouse) */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                    Whose side are you attending for?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { val: "bride", label: "Bride's Side (Emma)", activeBg: "bg-[#bf9c85]/10 text-[#8d705c] border-[#bf9c85] font-bold" },
                      { val: "spouse", label: "Spouse's Side (Arthur)", activeBg: "bg-[#bf9c85]/10 text-[#8d705c] border-[#bf9c85] font-bold" },
                    ].map((btn) => (
                      <button
                        key={btn.val}
                        type="button"
                        onClick={() => handleSideChange(btn.val as any)}
                        className={`py-3 px-4 rounded-2xl border border-[#ece4db] text-xs font-medium transition-all duration-300 cursor-pointer ${
                          formData.side === btn.val ? btn.activeBg + " shadow-xs" : "bg-white text-[#5c4e43] hover:border-[#bf9c85]"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conditional fields only shown if attending or tentative */}
                {formData.attendance !== "no" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 pt-2"
                  >
                    {/* Plus One Selection (Now a clean number input!) */}
                    <div className="space-y-1.5">
                      <label htmlFor="plusOneCount" className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                        Accompanying Guests (Count)
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

                    {/* Plus One Names */}
                    {formData.plusOneCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-1.5"
                      >
                        <label htmlFor="plusOneNames" className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                          Names of Accompanying Guests
                        </label>
                        <input
                          type="text"
                          id="plusOneNames"
                          name="plusOneNames"
                          value={formData.plusOneNames}
                          onChange={handleChange}
                          placeholder="e.g. Sophie Dupont (Partner)"
                          required
                          className="w-full bg-white border border-[#ece4db] rounded-2xl py-3 px-4 text-sm text-[#3d3129] placeholder-[#a6968a] focus:outline-hidden focus:border-[#bf9c85] transition-all"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Music Suggestions (Replaced Congratulations & Food restrictions) */}
                <div className="space-y-1.5">
                  <label htmlFor="musicSuggestions" className="block text-xs font-semibold uppercase tracking-wide text-[#8a7261]">
                    Song Requests &amp; Music Suggestions
                  </label>
                  <div className="relative">
                    <Music className="absolute left-3.5 top-3.5 w-4 h-4 text-[#bf9c85]" />
                    <textarea
                      id="musicSuggestions"
                      name="musicSuggestions"
                      rows={3}
                      value={formData.musicSuggestions || ""}
                      onChange={handleChange}
                      placeholder="What songs will keep you on the dance floor? (e.g., Artist - Song Title)"
                      className="w-full bg-white border border-[#ece4db] rounded-2xl py-3 pl-11 pr-4 text-sm text-[#3d3129] placeholder-[#a6968a] focus:outline-hidden focus:border-[#bf9c85] transition-all resize-none font-sans"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#bf9c85]/90 hover:bg-[#8d705c] disabled:bg-[#d5c6bc] text-white py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest transition-colors shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
                  >
                    {loading ? "Recording..." : rsvpId ? "Update My Response" : "Submit Wedding Invitation RSVP"}
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
