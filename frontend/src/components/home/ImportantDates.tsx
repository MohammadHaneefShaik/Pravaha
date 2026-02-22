import { motion } from "framer-motion";
import { Calendar, PartyPopper } from "lucide-react";

const schedule = [
  {
    day: "Day 1",
    date: "12th March 2026",
    icon: Calendar,
    accent: "primary",
    events: [
      { time: "09:00 AM", activity: "Inauguration Ceremony" },
      { time: "11:00 AM", activity: "Technical Events" },
      { time: "01:00 PM", activity: "Lunch Break" },
      { time: "02:00 PM", activity: "Coding Contest" },
    ],
  },
  {
    day: "Day 2",
    date: "13th March 2026",
    icon: PartyPopper,
    accent: "accent",
    events: [
      { time: "10:00 AM", activity: "Non-Technical Events" },
      { time: "12:30 PM", activity: "Guest Lecture" },
      { time: "03:00 PM", activity: "Awards & Closing Ceremony" },
    ],
  },
];

const ImportantDates = () => {
  return (
    <section id="dates" className="py-16 sm:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-semibold tracking-widest uppercase mb-5 font-inter">
            <Calendar className="w-3 h-3" />
            Event Schedule
          </span>
          <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            RIPPLE{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Schedule
            </span>
          </h2>
          <p className="font-inter text-muted-foreground text-sm sm:text-base max-w-xs sm:max-w-md mx-auto">
            Two power-packed days of innovation, competition &amp; celebration.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="max-w-2xl mx-auto relative">

          {/* Centre spine line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />

          {schedule.map((day, di) => (
            <div key={day.day} className="mb-10 sm:mb-14 last:mb-0">

              {/* ── Day header node ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: di * 0.15 }}
                className="relative flex justify-center mb-7 sm:mb-10"
              >
                {/* Pill badge sitting on the spine */}
                <div className={`relative z-10 flex items-center gap-2.5 px-5 py-2 rounded-full border ${day.accent === "primary" ? "border-primary/50 bg-primary/10" : "border-accent/50 bg-accent/10"} backdrop-blur-sm`}>
                  <day.icon className={`w-4 h-4 ${day.accent === "primary" ? "text-primary" : "text-accent"}`} />
                  <span className={`font-orbitron text-sm font-bold ${day.accent === "primary" ? "text-primary" : "text-accent"}`}>
                    {day.day}
                  </span>
                  <span className="font-inter text-xs text-muted-foreground hidden sm:inline">
                    — {day.date}
                  </span>
                </div>
                {/* Date below on mobile */}
                <p className="font-inter absolute -bottom-5 text-[10px] text-muted-foreground sm:hidden text-center w-full">
                  {day.date}
                </p>
              </motion.div>

              {/* ── Events ── */}
              <div className="space-y-0">
                {day.events.map((ev, ei) => {
                  const isLeft = ei % 2 === 0;
                  return (
                    <motion.div
                      key={ei}
                      initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: di * 0.15 + ei * 0.08 }}
                      className="relative flex items-center"
                    >
                      {/* LEFT side */}
                      <div className={`w-1/2 pr-6 sm:pr-8 text-right ${!isLeft ? "opacity-0 pointer-events-none" : ""}`}>
                        {isLeft && (
                          <>
                            <p className="font-orbitron text-[11px] sm:text-xs font-semibold text-primary tracking-wider mb-0.5">
                              {ev.time}
                            </p>
                            <p className="font-inter text-sm sm:text-base text-foreground/85 leading-snug">
                              {ev.activity}
                            </p>
                          </>
                        )}
                      </div>

                      {/* Centre dot */}
                      <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
                        <div className={`w-3 h-3 rounded-full border-2 ${day.accent === "primary" ? "border-primary bg-primary/30" : "border-accent bg-accent/30"} shadow-sm`} />
                      </div>

                      {/* RIGHT side */}
                      <div className={`w-1/2 pl-6 sm:pl-8 ${isLeft ? "opacity-0 pointer-events-none" : ""}`}>
                        {!isLeft && (
                          <>
                            <p className="font-orbitron text-[11px] sm:text-xs font-semibold text-accent tracking-wider mb-0.5">
                              {ev.time}
                            </p>
                            <p className="font-inter text-sm sm:text-base text-foreground/85 leading-snug">
                              {ev.activity}
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          ))}

          {/* End cap dot */}
          <div className="relative flex justify-center">
            <div className="relative z-10 w-2 h-2 rounded-full bg-accent/50" />
          </div>

        </div>

        {/* ── Footer note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="font-inter text-center text-[11px] text-muted-foreground/60 mt-12 sm:mt-16 tracking-wide"
        >
          * Schedule is subject to minor changes. Stay tuned for updates.
        </motion.p>

      </div>
    </section>
  );
};

export default ImportantDates;
