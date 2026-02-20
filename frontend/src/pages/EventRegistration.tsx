import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Upload, CreditCard } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL:", API_URL);

const EventRegistration = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    registerNumber: "",
    email: "",
    phoneNumber: "",
    collegeName: "",
    branch: "",
    studyYear: "",
    transactionId: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const upiString = event
    ? `upi://pay?pa=${event.upiId}&pn=${event.eventName}&am=${event.price}&cu=INR`
    : "";

  /* ================= FETCH EVENT ================= */
  useEffect(() => {
    const fetchEvent = async () => {

      try {

        const res = await fetch(`${API_URL}/api/events/${slug}`);
        const data = await res.json();

        if (data.success) {
          setEvent(data.data);   // ✅ CORRECT
        }

      } catch (err) {
        console.error("Failed to fetch event:", err);
      }

      setLoading(false);
    };

    fetchEvent();

  }, [slug]);


  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    fd.append("eventName", event.eventName);

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


  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (submitted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-[#050814] text-white">

          <div className="text-center max-w-md px-6">

            {/* Icon */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-5xl animate-bounce">
              🎉
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-3">
              Congratulations!
            </h1>

            {/* Message */}
            <p className="text-gray-400 mb-6">
              Your registration for <span className="text-cyan-400 font-semibold">
                {event.eventName}
              </span> has been submitted successfully.
              <br />
              Your payment will be verified soon.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 justify-center">

              <a
                href="/events"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold"
              >
                Browse Events
              </a>

              <a
                href="/"
                className="px-6 py-3 rounded-xl border border-white/20"
              >
                Go Home
              </a>

            </div>

          </div>

        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl font-orbitron font-bold text-gradient-title">
              {event.eventName}
            </h1>
            <p className="text-muted-foreground mt-2">
              Entry Fee: ₹{event.price}
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-8 glow-border space-y-4"
          >

            {/* Inputs */}
            {[
              { label: "Full Name", key: "fullName" },
              { label: "Register Number", key: "registerNumber" },
              { label: "Phone Number", key: "phoneNumber" },
              { label: "Email", key: "email" },
              { label: "College Name", key: "collegeName" },
              { label: "Branch", key: "branch" },
              { label: "Study Year", key: "studyYear" },
            ].map((field) => (
              <input
                key={field.key}
                placeholder={field.label}
                required
                onChange={(e) =>
                  setFormData({ ...formData, [field.key]: e.target.value })
                }
                className="w-full px-4 py-3 bg-secondary/40 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            ))}

            {/* Payment Section */}
            <div className="bg-secondary/20 border border-border rounded-xl p-6 mt-6 text-center space-y-4">

              {/* Title */}
              <div className="flex flex-col items-center gap-2">
                <CreditCard className="w-8 h-8 text-primary" />
                <p className="text-muted-foreground text-sm">
                  Scan the QR code to complete your payment
                </p>
              </div>

              {/* QR Card */}
              <div className="bg-white p-4 rounded-xl shadow-md inline-block">
                <QRCodeCanvas
                  value={upiString}
                  size={180}
                  level="H"
                  includeMargin={true}
                />
              </div>

              {/* UPI ID */}
              <div className="text-sm text-muted-foreground">
                UPI ID
                <div className="font-semibold text-primary text-base mt-1">
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
                className="w-full px-4 py-3 bg-background border border-border rounded-lg mb-3"
              />



              <div className="space-y-2">

                <label
                  className="flex items-center justify-center gap-2 cursor-pointer border border-dashed border-primary p-3 rounded-lg hover:bg-primary/10 transition"
                >
                  📤 Upload Payment Screenshot

                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />

                </label>

                {/* Show selected file */}
                {file && (
                  <p className="text-xs text-green-400">
                    ✅ {file.name}
                  </p>
                )}

              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition"
            >
              Complete Registration →
            </button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default EventRegistration;
