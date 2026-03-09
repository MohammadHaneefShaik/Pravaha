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

  /* =========== UPDATE PAYMENT STATUS (Instant Update) =========== */
  const updatePaymentStatus = async (id: string, status: string, reg: any) => {
    const res = await fetch(`${API}/api/user/updatePaymentStatus`, {
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
    
    if(res.ok) {
        setRegistrations(prev => prev.map(r => r._id === id ? { ...r, paymentStatus: status } : r));
    }
  };

  /* =========== UPDATE ABSTRACT STATUS (Instant Update) =========== */
  const updateAbstractStatus = async (id: string, status: string, reg: any) => {
    const res = await fetch(`${API}/api/user/updateAbstractStatus`, {
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

    if(res.ok) {
        setRegistrations(prev => prev.map(r => r._id === id ? { ...r, abstractStatus: status } : r));
    }
  };

  /* =========== FILTERED DATA =========== */
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="text-4xl font-bold">Admin <span className="text-cyan-400">Dashboard</span></h1>
        </motion.div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total" value={stats.total} icon={<Users />} color="cyan" />
          <StatCard title="Approved" value={stats.approved} icon={<CheckCircle />} color="green" />
          <StatCard title="Pending" value={stats.pending} icon={<Clock />} color="yellow" />
          <StatCard title="Rejected" value={stats.rejected} icon={<XCircle />} color="red" />
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab("registrations")} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "registrations" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/40" : "bg-white/5 text-gray-400"}`}>
            <Users className="inline w-4 h-4 mr-1.5" /> All Registrations
          </button>
          <button onClick={() => setActiveTab("abstracts")} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "abstracts" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/40" : "bg-white/5 text-gray-400"}`}>
            <FileText className="inline w-4 h-4 mr-1.5" /> Paper Abstracts
            {stats.abstractPending > 0 && <span className="ml-2 px-1.5 py-0.5 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">{stats.abstractPending}</span>}
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-4" />
          <input placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/10 rounded-xl focus:border-cyan-400 outline-none" />
        </div>

        {/* REGISTRATIONS TABLE (Simplified for readability) */}
        {activeTab === "registrations" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr className="text-left text-sm">
                  <th className="p-4">Name</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Txn</th>
                  <th>Status</th>
                  <th>Proof</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {registrations.filter(r => r.fullName?.toLowerCase().includes(search.toLowerCase())).map(reg => (
                  <tr key={reg._id} className="border-t border-white/10 text-sm">
                    <td className="p-4">{reg.fullName}</td>
                    <td>{reg.email}</td>
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
                        <button onClick={() => updatePaymentStatus(reg._id, "approved", reg)} className="px-3 py-1 bg-green-500/20 text-green-400 rounded">Approve</button>
                        <button onClick={() => updatePaymentStatus(reg._id, "rejected", reg)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded">Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ABSTRACTS TABLE */}
        {activeTab === "abstracts" && (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/10">
                <tr className="text-left text-sm">
                  <th className="p-4">Name</th>
                  <th>Team</th>
                  <th>College</th>
                  <th>Abstract</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {abstractEntries.map(reg => (
                  <tr key={reg._id} className="border-t border-white/10 text-sm">
                    <td className="p-4">{reg.fullName}</td>
                    <td className="text-yellow-300">{reg.teamName || "—"}</td>
                    <td className="text-xs">{reg.collegeName}</td>
                    <td>
                      {reg.abstractFile ? (
                        <a
  href={`https://docs.google.com/viewer?url=${encodeURIComponent(reg.abstractFile)}&embedded=true`}
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  View PDF
</a>
                      ) : "—"}
                    </td>
                    <td><AbstractStatusBadge status={reg.abstractStatus} /></td>
                    <td>
                        {reg.abstractStatus === "pending" ? (
                            <div className="flex gap-2">
                                <button onClick={() => updateAbstractStatus(reg._id, "accepted", reg)} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Accept</button>
                                <button onClick={() => updateAbstractStatus(reg._id, "rejected", reg)} className="px-2 py-1 bg-red-500/20 text-red-400 rounded">Reject</button>
                            </div>
                        ) : <span className="text-gray-500 italic">Handled</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// Sub-components kept as per original logic
function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className={`text-${color}-400 mb-2`}>{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-400 text-sm">{title}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = { approved: "bg-green-500/20 text-green-400", rejected: "bg-red-500/20 text-red-400", pending: "bg-yellow-500/20 text-yellow-400" };
  return <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${colors[status] || "bg-white/10 text-gray-400"}`}>{status || "pending"}</span>;
}

function AbstractStatusBadge({ status }: { status: string }) {
  const colors: any = { pending: "bg-yellow-500/20 text-yellow-400", accepted: "bg-emerald-500/20 text-emerald-400", rejected: "bg-red-500/20 text-red-400" };
  return <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${colors[status] || "bg-white/10 text-gray-400"}`}>{status}</span>;
}
