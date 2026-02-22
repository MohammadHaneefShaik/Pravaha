import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, PartyPopper } from "lucide-react";

const schedule = [
  {
    day: "Day 1",
    date: "12th March 2026",
    status: "event",
    icon: Calendar,
    events: [
      { time: "09:00 AM", activity: "Inauguration Ceremony" },
      { time: "11:00 AM", activity: "Technical events" },
      { time: "01:00 PM", activity: "Lunch Break" },
      { time: "02:00 PM", activity: "Coding Contest" },
    ],
  },
  {
    day: "Day 2",
    date: "13th March 2026",
    status: "event",
    icon: PartyPopper,
    events: [
      { time: "10:00 AM", activity: "Non-Technical events" },
      { time: "12:30 PM", activity: "Guest Lecture" },
      { time: "03:00 PM", activity: "Awards & Closing Ceremony" },
    ],
  },
];

const ImportantDates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dates" className="py-16 sm:py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            RIPPLE <span className="gradient-text">SCHEDULE</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-2xl lg:max-w-3xl mx-auto">
          <div className="relative">

            {/* Vertical connector line — centered on icon */}
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20 hidden sm:block" />

            <div className="space-y-6 sm:space-y-10">
              {schedule.map((item, i) => (
                <motion.div
                  key={item.day}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="flex items-start gap-4 sm:gap-6"
                >
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${item.status === "event"
                      ? "bg-accent text-white"
                      : "bg-primary/20 text-primary"
                      }`}
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className={`flex-1 glass-card p-4 sm:p-6 glow-border ${item.status === "event"
                      ? "border-l-4 border-accent"
                      : "border-l-4 border-primary"
                      }`}
                  >
                    {/* Day + Date row */}
                    <div className="flex flex-wrap justify-between items-baseline gap-2 mb-4">
                      <h3 className="font-display text-base sm:text-xl font-bold text-foreground">
                        {item.day}
                      </h3>
                      <span className="text-xs sm:text-sm font-mono font-semibold opacity-70 whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>

                    {/* Events list */}
                    <div className="space-y-3 border-t border-white/10 pt-3">
                      {item.events.map((ev, idx) => (
                        <div key={idx} className="flex gap-3 sm:gap-4 items-start group">
                          <span className="text-xs font-mono text-accent pt-0.5 min-w-[70px] sm:min-w-[80px] shrink-0">
                            {ev.time}
                          </span>
                          <span className="text-xs sm:text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                            {ev.activity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ImportantDates;
