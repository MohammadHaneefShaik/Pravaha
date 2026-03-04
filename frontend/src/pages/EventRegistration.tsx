import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CreditCard, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const API_URL = import.meta.env.VITE_API_URL;
const STORAGE_KEY = "paperPresentationRegistrationId";

/* ============================================================
   MEMBER FIELDS LIST
============================================================ */
const memberFields = [
  { label: "Full Name", key: "fullName" },
  { label: "Register Number", key: "registerNumber" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Email", key: "email" },
  { label: "College Name", key: "collegeName" },
  { label: "Branch", key: "branch" },
  { label: "Study Year", key: "studyYear" },
];

const emptyMember = {
  fullName: "", registerNumber: "", phoneNumber: "",
  email: "", collegeName: "", branch: "", studyYear: "",
};

/* ============================================================
   MAIN COMPONENT
============================================================ */
const EventRegistration = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const isPaperPresentation = slug === "paper-presentation";
  const isTeamEvent = slug === "project-Expo"; // other team events (non-abstract)

  /* ---- Paper Presentation state ---- */
  const [ppStep, setPpStep] = useState<"form" | "pending" | "accepted" | "rejected">("form");
  const [storedRegId, setStoredRegId] = useState<string | null>(null);
  const [memberCount, setMemberCount] = useState<1 | 2>(1);
  const [teamName, setTeamName] = useState("");
  const [abstractFile, setAbstractFile] = useState<File | null>(null);
  const [ppSubmitting, setPpSubmitting] = useState(false);

  /* ---- Shared form state ---- */
  const [formData, setFormData] = useState({ ...emptyMember, transactionId: "" });
  const [member2, setMember2] = useState({ ...emptyMember });
  const [file, setFile] = useState<File | null>(null); // payment screenshot

  const upiString = event
    ? `upi://pay?pa=${event.upiId}&pn=${event.eventName}&am=${event.price}&cu=INR`
    : "";

  /* ============================================================
     FETCH EVENT
  ============================================================ */
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events/${slug}`);
        const data = await res.json();
        if (data.success) setEvent(data.data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      }
      setLoading(false);
    };
    fetchEvent();
  }, [slug]);

  /* ============================================================
     CHECK ABSTRACT STATUS (Paper Presentation)
  ============================================================ */
  useEffect(() => {
    if (!isPaperPresentation) return;

    const savedId = localStorage.getItem(STORAGE_KEY);
    if (!savedId) return;

    setStoredRegId(savedId);

    fetch(`${API_URL}/api/user/checkAbstractStatus?id=${savedId}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          if (data.abstractStatus === "accepted") {
            // Check if payment was already completed
            if (data.paymentStatus === "approved") {
              setSubmitted(true);
            } else {
              setPpStep("accepted");
            }
          } else if (data.abstractStatus === "rejected") {
            setPpStep("rejected");
          } else {
            setPpStep("pending");
          }
        }
      })
      .catch(() => { }); // silently fail — show form by default
  }, [isPaperPresentation]);

  /* ============================================================
     SUBMIT ABSTRACT (Paper Presentation — Step 1)
  ============================================================ */
  const handleAbstractSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!abstractFile) {
      alert("Please upload your abstract file (PDF/DOC).");
      return;
    }

    setPpSubmitting(true);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "transactionId") fd.append(key, value);
    });
    fd.append("eventName", event.eventName);
    fd.append("memberCount", String(memberCount));
    if (teamName) fd.append("teamName", teamName);
    fd.append("abstract", abstractFile);

    if (memberCount === 2) {
      Object.entries(member2).forEach(([key, value]) => {
        fd.append(`member2_${key}`, value);
      });
    }

    try {
      const res = await fetch(`${API_URL}/api/user/submitAbstract`, {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem(STORAGE_KEY, data.registrationId);
        setStoredRegId(data.registrationId);
        setPpStep("pending");
      } else {
        alert(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setPpSubmitting(false);
    }
  };

  /* ============================================================
     COMPLETE PAYMENT (Paper Presentation — Step 2)
  ============================================================ */
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload your payment screenshot.");
      return;
    }
    if (!formData.transactionId) {
      alert("Please enter your transaction ID.");
      return;
    }

    const fd = new FormData();
    fd.append("registrationId", storedRegId!);
    fd.append("transactionId", formData.transactionId);
    fd.append("screenshot", file);

    const res = await fetch(`${API_URL}/api/user/completePayment`, {
      method: "POST",
      body: fd,
    });
    const data = await res.json();

    if (data.success) {
      localStorage.removeItem(STORAGE_KEY);
      setSubmitted(true);
    } else {
      alert(data.message || "Payment submission failed.");
    }
  };

  /* ============================================================
     REGULAR EVENT SUBMIT (non-paper-presentation)
  ============================================================ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => fd.append(key, value));
    fd.append("eventName", event.eventName);

    if (isTeamEvent) {
      Object.entries(member2).forEach(([key, value]) =>
        fd.append(`member2_${key}`, value)
      );
    }

    if (file) fd.append("screenshot", file);

    const res = await fetch(`${API_URL}/api/user/sendRegistrationData`, {
      method: "POST",
      body: fd,
    });
    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
    } else {
      alert(data.message);
    }
  };

  /* ============================================================
     LOADING
  ============================================================ */
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-center py-20 text-muted-foreground">
      Loading...
    </div>
  );

  /* ============================================================
     SUCCESS SCREEN
  ============================================================ */
  if (submitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-[#050814] text-white px-4">
          <div className="text-center max-w-sm w-full px-4 sm:px-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 sm:mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-4xl sm:text-5xl animate-bounce">
              🎉
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Congratulations!</h1>
            <p className="text-gray-400 mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed">
              Your registration for <span className="text-cyan-400 font-semibold">{event.eventName}</span> has been submitted successfully.
              <br />Your payment will be verified soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/events" className="px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold text-sm sm:text-base text-center">
                Browse Events
              </a>
              <a href="/" className="px-5 sm:px-6 py-3 rounded-xl border border-white/20 text-sm sm:text-base text-center">
                Go Home
              </a>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  /* ============================================================
     PAPER PRESENTATION — PENDING SCREEN
  ============================================================ */
  if (isPaperPresentation && ppStep === "pending") {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-[#050814] text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-sm w-full px-4 sm:px-6"
          >
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-yellow-500/20 border border-yellow-400/30 flex items-center justify-center">
              <Clock className="w-10 h-10 text-yellow-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">Abstract Under Review</h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
              Your abstract for <span className="text-cyan-400 font-semibold">{event?.eventName || "Paper Presentation"}</span> has been submitted and is currently under review.
              <br /><br />
              You will receive an email once your abstract is accepted. Please revisit this page after receiving the acceptance email to complete your payment.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-4 text-xs text-yellow-300">
              🔔 Check your registered email for status updates.
            </div>
          </motion.div>
        </section>
      </Layout>
    );
  }

  /* ============================================================
     PAPER PRESENTATION — REJECTED SCREEN
  ============================================================ */
  if (isPaperPresentation && ppStep === "rejected") {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-[#050814] text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-sm w-full px-4 sm:px-6"
          >
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3">Abstract Rejected</h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
              Unfortunately, your abstract was not accepted. You may revise and resubmit.
            </p>
            <button
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY);
                setStoredRegId(null);
                setPpStep("form");
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold text-sm sm:text-base"
            >
              Resubmit Abstract
            </button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  /* ============================================================
     RENDER FORM
  ============================================================ */
  return (
    <Layout>
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 sm:mb-10"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-gradient-title leading-tight">
              {event.eventName}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Entry Fee: ₹{event.price}
            </p>
            {isPaperPresentation && (
              <p className="text-cyan-400 mt-1 text-sm font-medium">
                📄 Submit your abstract to register
              </p>
            )}
            {(slug === "project-Expo") && (
              <p className="text-cyan-400 mt-1 text-sm sm:text-base font-medium">
                Team members: 2
              </p>
            )}
          </motion.div>

          {/* ====================================================
              PAPER PRESENTATION — Abstract Form (Step 1)
          ==================================================== */}
          {isPaperPresentation && ppStep === "form" && (
            <motion.form
              onSubmit={handleAbstractSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 glow-border space-y-3 sm:space-y-4"
            >
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                <span className="text-sm text-muted-foreground font-medium">Member Details &amp; Abstract Upload</span>
              </div>

              {/* Team Name */}
              <div>
                <p className="text-cyan-400 font-semibold text-sm border-b border-border pb-1 mb-2">
                  🏷️ Team Name
                </p>
                <input
                  placeholder="Team Name (e.g. Tech Titans)"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/40 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
                />
              </div>

              <div className="flex gap-3 mb-2">
              
                <button
                  type="button"
                  onClick={() => setMemberCount(2)}
                  className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition ${memberCount === 2
                    ? "border-cyan-400 text-cyan-400 bg-cyan-400/10"
                    : "border-border text-muted-foreground hover:border-cyan-400/50"
                    }`}
                >
                  👥 2 Members
                </button>
              </div>

              {/* Member 2 */}
              <AnimatePresence>
                {memberCount === 2 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <p className="text-cyan-400 font-semibold text-sm border-b border-border pb-1 mt-2">
                      👤 Member 2
                    </p>
                    {memberFields.map((field) => (
                      <input
                        key={`m2-${field.key}`}
                        placeholder={field.label}
                        required={memberCount === 2}
                        value={(member2 as any)[field.key]}
                        onChange={(e) => setMember2({ ...member2, [field.key]: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/40 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Abstract Upload */}
              <div className="bg-secondary/20 border border-border rounded-xl p-4 sm:p-5 mt-2 space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <FileText className="w-4 h-4" />
                  Abstract File Upload
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload your abstract as a PDF or Word document (max 10 MB).
                </p>
                <label className="flex items-center justify-center gap-2 cursor-pointer border border-dashed border-primary p-3 rounded-lg hover:bg-primary/10 transition text-sm">
                  📎 Choose Abstract File (PDF / DOC / DOCX)
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={(e) => setAbstractFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                {abstractFile && (
                  <p className="text-xs text-green-400">✅ {abstractFile.name}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={ppSubmitting}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition text-sm sm:text-base disabled:opacity-60"
              >
                {ppSubmitting ? "Submitting..." : "Submit Abstract →"}
              </button>
            </motion.form>
          )}

          {/* ====================================================
              PAPER PRESENTATION — Payment Form (Step 2, accepted)
          ==================================================== */}
          {isPaperPresentation && ppStep === "accepted" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Accepted banner */}
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-400/30 rounded-xl px-4 py-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="text-emerald-400 font-semibold text-sm">Abstract Accepted!</p>
                  <p className="text-xs text-muted-foreground">Please complete your payment below to confirm your registration.</p>
                </div>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold">2</span>
                <span className="text-sm text-muted-foreground font-medium">Complete Payment</span>
              </div>

              <motion.form
                onSubmit={handlePaymentSubmit}
                className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 glow-border space-y-4"
              >
                <div className="bg-secondary/20 border border-border rounded-xl p-4 sm:p-6 text-center space-y-4">
                  <div className="flex flex-col items-center gap-2">
                    <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      Scan the QR code to complete your payment
                    </p>
                  </div>

                  <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md inline-block">
                    <QRCodeCanvas value={upiString} size={160} level="H" includeMargin={true} />
                  </div>

                  <div className="text-xs sm:text-sm text-muted-foreground">
                    UPI ID
                    <div className="font-semibold text-primary text-sm sm:text-base mt-1 break-all">
                      {event.upiId}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Transaction ID"
                    required
                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-lg text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary"
                  />

                  <div className="space-y-2">
                    <label className="flex items-center justify-center gap-2 cursor-pointer border border-dashed border-primary p-3 rounded-lg hover:bg-primary/10 transition text-sm sm:text-base">
                      📤 Upload Payment Screenshot
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                    {file && <p className="text-xs text-green-400">✅ {file.name}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition text-sm sm:text-base"
                >
                  Complete Registration →
                </button>
              </motion.form>
            </motion.div>
          )}

          {/* ====================================================
              REGULAR EVENT FORM (non-paper-presentation)
          ==================================================== */}
          {!isPaperPresentation && (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 glow-border space-y-3 sm:space-y-4"
            >

              {/* Member 2 — only for other team events */}
              {isTeamEvent && (
                <>
                  <p className="text-cyan-400 font-semibold text-sm sm:text-base border-b border-border pb-1 mt-2">
                    👤 Member 2
                  </p>
                  {memberFields.map((field) => (
                    <input
                      key={`m2-${field.key}`}
                      placeholder={field.label}
                      required
                      onChange={(e) =>
                        setMember2({ ...member2, [field.key]: e.target.value })
                      }
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/40 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm sm:text-base"
                    />
                  ))}
                </>
              )}

              {/* Payment Section */}
              <div className="bg-secondary/20 border border-border rounded-xl p-4 sm:p-6 mt-4 sm:mt-6 text-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Scan the QR code to complete your payment
                  </p>
                </div>

                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-md inline-block">
                  <QRCodeCanvas value={upiString} size={160} level="H" includeMargin={true} />
                </div>

                <div className="text-xs sm:text-sm text-muted-foreground">
                  UPI ID
                  <div className="font-semibold text-primary text-sm sm:text-base mt-1 break-all">
                    {event.upiId}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Transaction ID"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, transactionId: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-lg mb-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary"
                />

                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 cursor-pointer border border-dashed border-primary p-3 rounded-lg hover:bg-primary/10 transition text-sm sm:text-base">
                    📤 Upload Payment Screenshot
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <p className="text-xs text-green-400">✅ {file.name}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition text-sm sm:text-base"
              >
                Complete Registration →
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EventRegistration;
