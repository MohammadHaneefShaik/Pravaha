import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { eventsData } from "@/data/eventData";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Download,
  Eye,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;


/* ================= CSV HELPERS ================= */

const downloadCSV = (data: any[], filename: string) => {

  if (!data || data.length === 0) {
    alert("No registrations found for this event.");
    return;
  }

  const headers = [
    "Full Name",
    "Email",
    "Phone",
    "Register Number",
    "College",
    "Branch",
    "Year",
    "Event",
    "Transaction ID",
    "Payment Status",
  ];

  const rows = data.map(r => [
    r.fullName,
    r.email,
    r.phone,
    r.registerNumber,
    r.collegeName,
    r.department,
    r.year,
    r.eventName,
    r.transactionId,
    r.paymentStatus,
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(v => `"${String(v ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};


export default function Dashboard() {

  const [registrations, setRegistrations] = useState<any[]>([]);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [admin, setAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  /* ================= CHECK ADMIN ================= */

  useEffect(() => {
    fetch(`${API}/api/admin/me`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (!data.success) window.location.href = "/admin-login";
        else setAdmin(data);
      })
      .catch(() => { window.location.href = "/admin-login"; });
  }, []);


  /* ================= FETCH DATA ================= */

  useEffect(() => {
    if (!admin) return;
    setLoading(true);
    fetch(`${API}/api/user/getRegistrations`, { credentials: "include" })
      .then(r => r.json())
      .then(d => { if (d.success) setRegistrations(d.data); })
      .catch(err => console.error("Failed to fetch registrations:", err))
      .finally(() => setLoading(false));
  }, [admin]);



  /* ================= LOGIC ================= */

  const totalRegistrations =
    admin?.role === "super"
      ? registrations.length
      : registrations.filter(r => r.eventName === admin?.eventName).length;


  const getEventCount = (event: any) =>
    registrations.filter(r => r.eventName === event.title).length;


  const filteredRegistrations =
    !activeEvent
      ? []
      : registrations.filter(r => {
        if (admin.role === "super")
          return r.eventName === activeEvent.title;
        return (
          r.eventName === activeEvent.title &&
          r.eventName === admin.eventName
        );
      });


  const visibleEvents =
    admin?.role === "super"
      ? eventsData
      : eventsData.filter((e: any) => e.title === admin?.eventName);



  if (!admin || loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#060A1F]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading Dashboard...
        </div>
      </div>
    );



  return (

    <div className="min-h-screen bg-[#060A1F] text-white">

      <Navbar />


      <main className="px-6 py-28 max-w-7xl mx-auto">


        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >

          <h1 className="text-4xl font-bold">
            User <span className="text-cyan-400">Dashboard</span>
          </h1>

          <p className="text-gray-400 mt-2">
            View registrations event-wise
          </p>

        </motion.div>



        {/* TOTAL CARD */}

        <div className="flex justify-center mb-12">

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">

            <Users className="mx-auto text-cyan-400 mb-2" size={28} />

            <p className="text-gray-400 text-sm">
              Total Registrations
            </p>

            <p className="text-4xl font-bold text-cyan-400">
              {totalRegistrations}
            </p>

          </div>

        </div>



        {/* EVENT CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

          {visibleEvents.map(event => (

            <motion.div
              key={event.slug}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveEvent(event)}
              className="cursor-pointer bg-white/5 border border-white/10 rounded-xl p-5"
            >

              <Calendar className="text-cyan-400 mb-2" />

              <h3 className="font-bold text-lg">
                {event.title}
              </h3>

              <p className="text-gray-400 text-sm">
                Registrations: {getEventCount(event)}
              </p>

            </motion.div>

          ))}

        </div>



        {/* TABLE */}

        {activeEvent && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >

            <div className="flex justify-between mb-4">

              <h2 className="text-xl text-cyan-400 font-bold">
                {activeEvent.title} Registrations
              </h2>


              <button
                onClick={() =>
                  downloadCSV(
                    filteredRegistrations,
                    `${activeEvent.slug}-registrations.csv`
                  )
                }
                className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg"
              >
                <Download size={16} />
                Export CSV
              </button>

            </div>



            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                <thead className="text-gray-400 border-b border-white/10 bg-white/5">
                  <tr>
                    <th className="p-3 text-left whitespace-nowrap">Name</th>
                    <th className="p-3 text-left whitespace-nowrap">Reg. No.</th>
                    <th className="p-3 text-left whitespace-nowrap">Phone</th>
                    <th className="p-3 text-left whitespace-nowrap">Email</th>
                    <th className="p-3 text-left whitespace-nowrap">College</th>
                    <th className="p-3 text-left whitespace-nowrap">Branch</th>
                    <th className="p-3 text-left whitespace-nowrap">Year</th>
                    <th className="p-3 text-left whitespace-nowrap">Txn ID</th>
                    <th className="p-3 text-left whitespace-nowrap">Proof</th>
                    <th className="p-3 text-left whitespace-nowrap">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-gray-500">
                        No registrations found for this event.
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map(reg => (
                      <tr key={reg._id} className="border-t border-white/10 hover:bg-white/5 transition">
                        <td className="p-3 whitespace-nowrap">
                          <div className="font-medium">{reg.fullName}</div>
                          {reg.member2?.fullName && (
                            <div className="text-xs text-cyan-400 mt-0.5">+ {reg.member2.fullName}</div>
                          )}
                        </td>
                        <td className="p-3 text-gray-300 whitespace-nowrap">{reg.registerNumber || "—"}</td>
                        <td className="p-3 text-gray-300 whitespace-nowrap">{reg.phone || "—"}</td>
                        <td className="p-3 text-gray-300 whitespace-nowrap">{reg.email}</td>
                        <td className="p-3 text-gray-300 whitespace-nowrap">{reg.collegeName || "—"}</td>
                        <td className="p-3 text-gray-300 whitespace-nowrap">{reg.department || "—"}</td>
                        <td className="p-3 text-gray-300 whitespace-nowrap">{reg.year || "—"}</td>
                        <td className="p-3 text-xs text-gray-300 whitespace-nowrap">{reg.transactionId || "—"}</td>
                        <td className="p-3">
                          {reg.paymentScreenshot ? (
                            <a href={reg.paymentScreenshot} target="_blank" rel="noopener noreferrer"
                              className="text-xs text-cyan-400 underline hover:text-cyan-300">
                              View
                            </a>
                          ) : (
                            <span className="text-xs text-gray-500">—</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className={`px-3 py-1 rounded-full text-xs ${reg.paymentStatus === "approved"
                              ? "bg-green-500/20 text-green-400"
                              : reg.paymentStatus === "rejected"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}>
                            {reg.paymentStatus || "—"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>

          </motion.div>

        )}


      </main>


      <Footer />

    </div>

  );
}
