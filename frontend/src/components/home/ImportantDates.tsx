import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, FileUp, UserCheck, PartyPopper } from "lucide-react";

const dates = [
  {
    icon: UserCheck,
    title: "Registration Last Date",
    date: "5th March 2026",
    status: "upcoming",
  },
  {
    icon: PartyPopper,
    title: "Event Dates",
    date: "12th–13th March 2026",
    status: "event",
  },
];

const ImportantDates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="dates" className="py-16 sm:py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="font-display text-xs tracking-[0.3em] text-accent uppercase mb-3">
            Mark Your Calendar
          </p>
          <h2 className="font-display text-2xl sm:text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Important <span className="gradient-text">Dates</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto">
          <div className="relative">

            {/* Timeline line */}
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/20 hidden sm:block" />

            <div className="space-y-4 sm:space-y-6">
              {dates.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                  className="flex items-start gap-3 sm:gap-6"
                >
                  <div
                    className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${item.status === "event"
                      ? "bg-accent/20 ring-2 ring-accent/40"
                      : "bg-primary/10 ring-2 ring-primary/20"
                      }`}
                  >
                    <item.icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${item.status === "event" ? "text-accent" : "text-primary"
                        }`}
                    />
                  </div>
                  <div
                    className={`flex-1 glass-card p-4 sm:p-5 ${item.status === "event" ? "glow-border-accent" : ""
                      }`}
                  >
                    <h3 className="font-display text-sm font-bold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm font-mono font-medium ${item.status === "event" ? "text-accent" : "text-primary"
                        }`}
                    >
                      {item.date}
                    </p>
                  </div>
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
