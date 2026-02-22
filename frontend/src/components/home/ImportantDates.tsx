import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, FileUp, UserCheck, PartyPopper } from "lucide-react";

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
      { time: "02:00 PM", activity: "Coding Contest " },
    ]
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
    ]
  },
];
const ImportantDates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dates" className="py-24 lg:py-32 bg-secondary/30">
      <div className="section-container" ref={ref}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            RIPPLE <span className="gradient-text">Schedule</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="relative space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent hidden sm:block" />

            {schedule.map((item, i) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="flex flex-col sm:flex-row items-start gap-6"
              >
                {/* Icon Circle */}
                <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                  item.status === "event" ? "bg-accent text-white" : "bg-primary/20 text-primary"
                }`}>
                  <item.icon className="w-6 h-6" />
                </div>

                {/* Content Card */}
                <div className={`flex-1 glass-card p-6 w-full ${item.status === "event" ? "border-l-4 border-accent" : "border-l-4 border-primary"}`}>
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="font-display text-xl font-bold text-foreground">{item.day}</h3>
                    <span className="text-sm font-mono font-semibold opacity-70">{item.date}</span>
                  </div>

                  {/* Sub-hours / Schedule List */}
                  <div className="space-y-4 border-t border-white/10 pt-4">
                    {item.events.map((ev, idx) => (
                      <div key={idx} className="flex gap-4 items-start group">
                        <div className="text-xs font-mono text-accent pt-1 min-w-[75px] shrink-0">
                          {ev.time}
                        </div>
                        <div className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                          {ev.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;
