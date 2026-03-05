import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CreditCard, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const API_URL = import.meta.env.VITE_API_URL;
const STORAGE_KEY = "paperPresentationRegistrationId";

/* ============================================================
  MEMBER FIELDS
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
  fullName: "",
  registerNumber: "",
  phoneNumber: "",
  email: "",
  collegeName: "",
  branch: "",
  studyYear: "",
};

const EventRegistration = () => {
  const { slug } = useParams();

  const normalizedSlug = slug?.toLowerCase();

  /* ----------------------------------------------------------
      EVENT TYPE DETECTION
  ---------------------------------------------------------- */

  const isPaperPresentation = normalizedSlug === "paper-presentation";
  const isProjectExpo = normalizedSlug === "project-expo";

  /* ----------------------------------------------------------
      STATE
  ---------------------------------------------------------- */

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [memberCount, setMemberCount] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    ...emptyMember,
    transactionId: "",
  });

  const [member2, setMember2] = useState({ ...emptyMember });

  const [file, setFile] = useState<File | null>(null);

  const [projectTitle, setProjectTitle] = useState("");

  const [abstractFile, setAbstractFile] = useState<File | null>(null);

  const [teamName, setTeamName] = useState("");

  const [ppStep, setPpStep] = useState<
    "form" | "pending" | "accepted" | "rejected"
  >("form");

  const [storedRegId, setStoredRegId] = useState<string | null>(null);

  const [ppSubmitting, setPpSubmitting] = useState(false);

  /* ----------------------------------------------------------
      FETCH EVENT
  ---------------------------------------------------------- */

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events/${normalizedSlug}`);
        const data = await res.json();

        if (data.success) {
          setEvent(data.data);
        } else {
          console.error("Event not found");
        }
      } catch (err) {
        console.error("Event fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (normalizedSlug) fetchEvent();
  }, [normalizedSlug]);

  /* ----------------------------------------------------------
      UPI STRING
  ---------------------------------------------------------- */

  const upiString = event
    ? `upi://pay?pa=${event.upiId}&pn=${event.eventName}&am=${event.price}&cu=INR`
    : "";

  /* ----------------------------------------------------------
      REGULAR EVENT SUBMIT
  ---------------------------------------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload payment screenshot");
      return;
    }

    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) =>
      fd.append(key, value as string)
    );

    fd.append("eventName", event.eventName);
    fd.append("screenshot", file);

    if (isProjectExpo) {
      if (!projectTitle.trim()) {
        alert("Please enter project title");
        return;
      }

      fd.append("teamName", projectTitle);

      Object.entries(member2).forEach(([key, value]) =>
        fd.append(`member2_${key}`, value)
      );
    }

    try {
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
    } catch (err) {
      alert("Network error");
    }
  };

  /* ----------------------------------------------------------
      LOADING
  ---------------------------------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Event not found
      </div>
    );
  }

  /* ----------------------------------------------------------
      SUCCESS SCREEN
  ---------------------------------------------------------- */

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h1 className="text-3xl font-bold text-green-400 mb-3">
              Registration Successful 🎉
            </h1>

            <p className="text-muted-foreground">
              Your registration for <b>{event.eventName}</b> was submitted.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  /* ----------------------------------------------------------
      MAIN FORM
  ---------------------------------------------------------- */

  return (
    <Layout>
      <section className="pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-4">

          <h1 className="text-3xl font-bold text-center mb-6">
            {event.eventName}
          </h1>

          {/* PROJECT EXPO FORM */}

          {isProjectExpo && (
            <form
              onSubmit={handleSubmit}
              className="bg-card border rounded-xl p-6 space-y-4"
            >
              <h2 className="text-cyan-400 font-semibold">
                Project Title
              </h2>

              <input
                required
                placeholder="Project Title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="input"
              />

              <h3 className="text-cyan-400 font-semibold">Member 1</h3>

              {memberFields.map((field) => (
                <input
                  key={field.key}
                  required
                  placeholder={field.label}
                  value={(formData as any)[field.key]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.key]: e.target.value,
                    })
                  }
                  className="input"
                />
              ))}

              <h3 className="text-cyan-400 font-semibold">Member 2</h3>

              {memberFields.map((field) => (
                <input
                  key={field.key}
                  required
                  placeholder={field.label}
                  value={(member2 as any)[field.key]}
                  onChange={(e) =>
                    setMember2({
                      ...member2,
                      [field.key]: e.target.value,
                    })
                  }
                  className="input"
                />
              ))}

              <div className="text-center mt-6">
                <QRCodeCanvas value={upiString} size={160} />
              </div>

              <input
                required
                placeholder="Transaction ID"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    transactionId: e.target.value,
                  })
                }
                className="input"
              />

              <input
                type="file"
                required
                accept="image/*"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />

              <button className="w-full bg-primary text-white py-3 rounded-lg">
                Complete Registration
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default EventRegistration;
