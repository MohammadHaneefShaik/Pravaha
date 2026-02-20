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
    alert("No registrations found");
    return;
  }

  const headers = [
    "Full Name",
    "Email",
    "Branch",
    "Year",
    "Event",
    "Transaction ID",
    "Payment Status",
  ];

  const rows = data.map(r => [
    r.fullName,
    r.email,
    r.department,
    r.year,
    r.eventName,
    r.transactionId,
    r.paymentStatus,
  ]);

  const csv = [headers, ...rows]
    .map(row => row.map(v => `"${v ?? ""}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = filename;

  a.click();
};


export default function Dashboard() {

  const [registrations, setRegistrations] = useState([]);

  const [hackathonRegs, setHackathonRegs] = useState([]);

  const [activeEvent, setActiveEvent] = useState(null);

  const [admin, setAdmin] = useState(null);



  /* ================= CHECK ADMIN ================= */

  useEffect(() => {

    fetch(`${API}/api/admin/me`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {

        if (!data.success) {
          window.location.href = "/admin-login";
        }

        else {
          setAdmin(data);
        }

      });

  }, []);



  /* ================= FETCH DATA ================= */

  useEffect(() => {

    if (!admin) return;

    fetch(`${API}/api/user/getRegistrations`, {
      credentials: "include",
    })
      .then(r => r.json())
      .then(d => d.success && setRegistrations(d.data));


    if (admin.role === "super") {

      fetch(`${API}/api/hackathon/all`, {
        credentials: "include",
      })
        .then(r => r.json())
        .then(d => d.success && setHackathonRegs(d.data));

    }

  }, [admin]);



  /* ================= LOGIC ================= */

  const totalRegistrations =
    admin?.role === "super"
      ? registrations.length + hackathonRegs.length
      : registrations.filter(r => r.eventName === admin?.eventName).length;


  const getEventCount = (event) =>
    event.slug === "hackathon"
      ? hackathonRegs.length
      : registrations.filter(r => r.eventName === event.title).length;


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
      : eventsData.filter(e => e.title === admin?.eventName);



  if (!admin)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Dashboard...
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



            <table className="w-full">

              <thead className="text-gray-400 border-b border-white/10">

                <tr>

                  <th className="p-3 text-left">Name</th>

                  <th>Email</th>

                  <th>Txn ID</th>

                  <th>Status</th>

                </tr>

              </thead>


              <tbody>

                {filteredRegistrations.map(reg => (

                  <tr key={reg._id} className="border-t border-white/10">

                    <td className="p-3">
                      {reg.fullName}
                    </td>

                    <td>{reg.email}</td>

                    <td>{reg.transactionId}</td>

                    <td>

                      <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-400">

                        {reg.paymentStatus}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </motion.div>

        )}


      </main>


      <Footer />

    </div>

  );
}
