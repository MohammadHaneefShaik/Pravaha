import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { eventsData } from "@/data/eventData";
import { motion } from "framer-motion";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  RefreshCw,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {

  const [registrations, setRegistrations] = useState([]);
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  const [eventSearch, setEventSearch] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const [eventName, setEventName] = useState("");

  /* ================= CHECK ADMIN ================= */
  useEffect(() => {
    fetch(`${API}/api/admin/me`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          window.location.href = "/admin-login";
        } else {
          setAdmin(data);
        }
      })
      .catch(() => {
        window.location.href = "/admin-login";
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= FETCH DATA ================= */
  useEffect(() => {

    if (!admin) return;

    fetch(`${API}/api/user/getRegistrations`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setRegistrations(data.data);
      })
      .finally(() => setLoading(false));

  }, [admin]);

  /* ================= UPDATE STATUS ================= */
  const updateNormalStatus = async (id, status, reg) => {

    await fetch(`${API}/api/user/updatePaymentStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        registrationId: id,
        paymentStatus: status,
        email: reg.email,
        fullName: reg.fullName,
        eventName: reg.eventName,
        transactionId: reg.transactionId,
        amount: reg.amount,
      }),
    });

    window.location.reload();
  };

  /* ================= FILTER ================= */

  const filteredRegistrations = registrations.filter(r =>
    (!eventSearch || r.fullName.toLowerCase().includes(eventSearch.toLowerCase()))
  );

  const stats = {
    total: registrations.length,
    approved: registrations.filter(r => r.paymentStatus === "approved").length,
    pending: registrations.filter(r => r.paymentStatus === "pending").length,
    rejected: registrations.filter(r => r.paymentStatus === "rejected").length,
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


        {/* ================= STATS ================= */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        >

          <StatCard
            title="Total"
            value={stats.total}
            icon={<Users />}
            color="cyan"
          />

          <StatCard
            title="Approved"
            value={stats.approved}
            icon={<CheckCircle />}
            color="green"
          />

          <StatCard
            title="Pending"
            value={stats.pending}
            icon={<Clock />}
            color="yellow"
          />

          <StatCard
            title="Rejected"
            value={stats.rejected}
            icon={<XCircle />}
            color="red"
          />

        </motion.div>


        {/* ================= SEARCH ================= */}

        <div className="mb-6 relative">

          <Search className="absolute left-3 top-3 text-gray-400 w-4" />

          <input
            placeholder="Search by name..."
            value={eventSearch}
            onChange={(e) => setEventSearch(e.target.value)}
            className="pl-10 pr-4 py-3 w-full bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-400"
          />

        </div>


        {/* ================= TABLE ================= */}

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

              {filteredRegistrations.map(reg => (

                <tr key={reg._id} className="border-t border-white/10">

                  <td className="p-4">{reg.fullName}</td>

                  <td>{reg.email}</td>

                  <td className="text-cyan-400">{reg.eventName}</td>

                  <td>{reg.transactionId}</td>

                  <td>

                    <StatusBadge status={reg.paymentStatus} />

                  </td>

                 {/* Proof */}
          <td className="px-4 py-3 text-center border-r border-white/10">
            <a href={r.paymentScreenshot} target="_blank" rel="noreferrer">
              <img
                src={r.paymentScreenshot}
                className="w-12 h-10 mx-auto rounded object-cover border border-white/20"
              />
            </a>
          </td>
                  <td>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          updateNormalStatus(reg._id, "approved", reg)
                        }
                        className="px-3 py-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/40"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateNormalStatus(reg._id, "rejected", reg)
                        }
                        className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40"
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

      </main>

      <Footer />

    </div>
  );
}


/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon, color }) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">

      <div className={`text-${color}-400 mb-2`}>
        {icon}
      </div>

      <div className="text-3xl font-bold">
        {value}
      </div>

      <div className="text-gray-400">
        {title}
      </div>

    </div>
  );
}


function StatusBadge({ status }) {

  const colors = {
    approved: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
    pending: "bg-yellow-500/20 text-yellow-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${colors[status]}`}>
      {status}
    </span>
  );
}
