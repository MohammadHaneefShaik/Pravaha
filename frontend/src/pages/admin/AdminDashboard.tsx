import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  FileText,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

type TabType = "registrations" | "abstracts";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>("registrations");
  const [search, setSearch] = useState("");
  const [pdfViewer, setPdfViewer] = useState<{ url: string; name: string } | null>(null);

  /* =========== CHECK ADMIN =========== */
  useEffect(() => {
    fetch(`${API}/api/admin/me`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (!data.success) window.location.href = "/admin-login";
        else setAdmin(data);
      })
      .catch(() => { window.location.href = "/admin-login"; })
      .finally(() => setLoading(false));
  }, []);

  /* =========== FETCH DATA =========== */
  useEffect(() => {
    if (!admin) return;
    fetch(`${API}/api/user/getRegistrations`, { credentials: "include" })
      .then(res => res.json())
      .then(data => { if (data.success) setRegistrations(data.data); })
      .finally(() => setLoading(false));
  }, [admin]);

  /* =========== UPDATE PAYMENT STATUS =========== */
  const updatePaymentStatus = async (id: string, status: string, reg: any) => {
    await fetch(`${API}/api/user/updatePaymentStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        registrationId: id,
        paymentStatus: status,
        email: reg.email,
        fullName: reg.fullName,
        eventName: reg.eventName,
        transactionId: reg.transactionId,
      }),
    });
    window.location.reload();
  };

  /* =========== UPDATE ABSTRACT STATUS =========== */
  const updateAbstractStatus = async (id: string, status: string, reg: any) => {
    await fetch(`${API}/api/user/updateAbstractStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        registrationId: id,
        abstractStatus: status,
        email: reg.email,
        fullName: reg.fullName,
        eventName: reg.eventName,
      }),
    });
    window.location.reload();
  };

  /* =========== FILTERED DATA =========== */
  const filteredRegistrations = registrations.filter(r =>
    r.abstractStatus === "not_required" || !r.abstractStatus
      ? r.fullName?.toLowerCase().includes(search.toLowerCase())
      : false
  );

  // Paper presentation entries (have abstract flow)
  const abstractEntries = registrations.filter(r =>
    r.abstractStatus && r.abstractStatus !== "not_required"
  ).filter(r =>
    r.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: registrations.length,
    approved: registrations.filter(r => r.paymentStatus === "approved").length,
    pending: registrations.filter(r => r.paymentStatus === "pending" && (r.abstractStatus === "not_required" || !r.abstractStatus)).length,
    rejected: registrations.filter(r => r.paymentStatus === "rejected").length,
    abstractPending: registrations.filter(r => r.abstractStatus === "pending").length,
    abstractAccepted: registrations.filter(r => r.abstractStatus === "accepted").length,
    abstractRejected: registrations.filter(r => r.abstractStatus === "rejected").length,
  };

  if (loading || admin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#060A1F]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060A1F] text-white">
      <Navbar />

      <main className="px-6 py-28 max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold">
            Admin <span className="text-cyan-400">Dashboard</span>
          </h1>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <StatCard title="Total" value={stats.total} icon={<Users />} color="cyan" />
          <StatCard title="Approved" value={stats.approved} icon={<CheckCircle />} color="green" />
          <StatCard title="Pending" value={stats.pending} icon={<Clock />} color="yellow" />
          <StatCard title="Rejected" value={stats.rejected} icon={<XCircle />} color="red" />
        </motion.div>

        {/* ABSTRACT STATS (paper presentation) */}
        {stats.abstractPending + stats.abstractAccepted + stats.abstractRejected > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <StatCard title="Abstract Pending" value={stats.abstractPending} icon={<Clock />} color="yellow" />
            <StatCard title="Abstract Accepted" value={stats.abstractAccepted} icon={<CheckCircle />} color="emerald" />
            <StatCard title="Abstract Rejected" value={stats.abstractRejected} icon={<XCircle />} color="red" />
          </motion.div>
        )}

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("registrations")}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "registrations"
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/40"
              : "bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-400/30"
              }`}
          >
            <Users className="inline w-4 h-4 mr-1.5" />
            All Registrations
          </button>
          <button
            onClick={() => setActiveTab("abstracts")}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "abstracts"
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/40"
              : "bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-400/30"
              }`}
          >
            <FileText className="inline w-4 h-4 mr-1.5" />
            Paper Abstracts
            {stats.abstractPending > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                {stats.abstractPending}
              </span>
            )}
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-4" />
          <input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* ===================== REGISTRATIONS TABLE ===================== */}
        {activeTab === "registrations" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-x-auto"
          >
            <table className="w-full">
              <thead className="bg-white/10">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Txn</th>
                  <th>Status</th>
                  <th>Proof</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {registrations
                  .filter(r => r.fullName?.toLowerCase().includes(search.toLowerCase()))
                  .map(reg => (
                    <tr key={reg._id} className="border-t border-white/10">
                      <td className="p-4">
                        <div>{reg.fullName}</div>
                        {reg.member2?.fullName && (
                          <div className="text-xs text-cyan-400 mt-0.5">+ {reg.member2.fullName}</div>
                        )}
                      </td>
                      <td className="text-sm">{reg.email}</td>
                      <td className="text-cyan-400">{reg.eventName}</td>
                      <td className="text-xs">{reg.transactionId || "—"}</td>
                      <td>
                        <StatusBadge status={reg.paymentStatus} />
                      </td>
                      <td>
                        {reg.paymentScreenshot ? (
                          <img src={reg.paymentScreenshot} className="w-12 rounded" alt="proof" />
                        ) : (
                          <span className="text-xs text-gray-500">—</span>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updatePaymentStatus(reg._id, "approved", reg)}
                            className="px-3 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/40 text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updatePaymentStatus(reg._id, "rejected", reg)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* ===================== ABSTRACTS TABLE ===================== */}
        {activeTab === "abstracts" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-x-auto"
          >
            {abstractEntries.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
                No abstract submissions yet.
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-white/10">
                  <tr>
                    <th className="p-4 text-left">Name / Members</th>
                    <th>Team Name</th>
                    <th>Email</th>
                    <th>College</th>
                    <th>Members</th>
                    <th>Abstract</th>
                    <th>Abstract Status</th>
                    <th>Payment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {abstractEntries.map(reg => (
                    <tr key={reg._id} className="border-t border-white/10">
                      <td className="p-4">
                        <div className="font-medium">{reg.fullName}</div>
                        {reg.member2?.fullName && (
                          <div className="text-xs text-cyan-400 mt-0.5">+ {reg.member2.fullName}</div>
                        )}
                        <div className="text-xs text-gray-500 mt-0.5">{reg.registerNumber}</div>
                      </td>
                      <td>
                        <span className="text-yellow-300 font-semibold text-sm">
                          {reg.teamName || <span className="text-gray-500 font-normal">—</span>}
                        </span>
                      </td>
                      <td className="text-sm">{reg.email}</td>
                      <td className="text-xs text-gray-300">{reg.collegeName}</td>
                      <td className="text-center">
                        <span className="text-cyan-400 font-bold">{reg.memberCount || 1}</span>
                      </td>
                      <td>
                        {reg.abstractFile ? (
                          <button
                            onClick={() => setPdfViewer({ url: reg.abstractFile, name: reg.fullName })}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition text-xs"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            View
                          </button>
                        ) : (
                          <span className="text-xs text-gray-500">—</span>
                        )}
                      </td>
                      <td>
                        <AbstractStatusBadge status={reg.abstractStatus} />
                      </td>
                      <td>
                        <StatusBadge status={reg.paymentStatus} />
                      </td>
                      <td>
                        {reg.abstractStatus === "pending" ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateAbstractStatus(reg._id, "accepted", reg)}
                              className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/40 text-xs font-medium transition"
                            >
                              ✅ Accept
                            </button>
                            <button
                              onClick={() => updateAbstractStatus(reg._id, "rejected", reg)}
                              className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 text-xs font-medium transition"
                            >
                              ❌ Reject
                            </button>
                          </div>
                        ) : reg.abstractStatus === "accepted" && reg.transactionId ? (
                          // Abstract accepted + payment submitted → approve/reject payment
                          <div className="flex gap-2">
                            <button
                              onClick={() => updatePaymentStatus(reg._id, "approved", reg)}
                              className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/40 text-xs font-medium transition"
                            >
                              Approve Pay
                            </button>
                            <button
                              onClick={() => updatePaymentStatus(reg._id, "rejected", reg)}
                              className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 text-xs font-medium transition"
                            >
                              Reject Pay
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-500">
                            {reg.abstractStatus === "accepted" ? "Awaiting payment" : "—"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </motion.div>
        )}

      </main>

      <Footer />

      {/* ===================== PDF VIEWER MODAL ===================== */}
      {pdfViewer && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPdfViewer(null)}
        >
          <div
            className="bg-[#0d1535] border border-white/10 rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <div className="font-semibold text-white">{pdfViewer.name}'s Abstract</div>
                <div className="text-xs text-gray-400 mt-0.5">PDF Viewer</div>
              </div>
              <div className="flex items-center gap-2">
                <a
                href={`https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(pdfViewer.url)}&embedded=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg text-xs hover:bg-cyan-500/30 transition"
                >
                  Open in New Tab ↗
                </a>
                <a
                  href={pdfViewer.url}
                  download
                  className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-lg text-xs hover:bg-white/20 transition"
                >
                  ⬇ Download
                </a>
                <button
                  onClick={() => setPdfViewer(null)}
                  className="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition"
                >
                  ✕ Close
                </button>
              </div>
            </div>
            {/* PDF iframe */}
            <div className="flex-1 p-2">
              <iframe
                src={`https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(pdfViewer.url)}&embedded=true`}
  className="w-full h-full rounded-xl border border-white/5"
  title="Abstract PDF"
/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */
function StatCard({ title, value, icon, color }: { title: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className={`text-${color}-400 mb-2`}>{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-400">{title}</div>
    </div>
  );
}

/* ============================================================
   STATUS BADGES
============================================================ */
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    approved: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
    pending: "bg-yellow-500/20 text-yellow-400",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs ${colors[status] || "bg-white/10 text-gray-400"}`}>
      {status || "—"}
    </span>
  );
}

function AbstractStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    accepted: "bg-emerald-500/20 text-emerald-400",
    rejected: "bg-red-500/20 text-red-400",
    not_required: "bg-white/10 text-gray-400",
  };
  const labels: Record<string, string> = {
    pending: "Under Review",
    accepted: "Accepted",
    rejected: "Rejected",
    not_required: "N/A",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs ${colors[status] || "bg-white/10 text-gray-400"}`}>
      {labels[status] || status}
    </span>
  );
}
