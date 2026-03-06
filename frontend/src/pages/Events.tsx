import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Image,
  HelpCircle,
  Cpu,
  Zap,
  BatteryCharging,
  Palette,
  Bike,
  Trophy,
  Camera,
  Puzzle,
  Calendar,
  Clock,
  Coffee,
} from "lucide-react";

/* ===============================
   SCHEDULE DATA
================================ */
const day1 = {
  label: "Day 1",
  date: "12th March 2026",
  slots: [
    {
      time: "11:00 AM",
      isBreak: false,
      event: {
        icon: FileText,
        title: "Battle of Ideaz",
        slug: "paper-presentation",
        price: 150,
        description:
          "Showcase your research and innovative ideas through structured academic papers. Present your findings before a panel of industry experts and gain invaluable professional feedback.",
        highlights: ["Paper Presentation", "Research Papers", "Expert Feedback"],
      },
    },
    {
      time: "11:00 AM",
      isBreak: false,
      event: {
        icon: Image,
        title: "Blue Print",
        slug: "poster-presentation",
        price: 150,
        description:
          "Communicate complex technical concepts through compelling visual design. Create an impactful poster that effectively conveys your research, analysis, or engineering solution.",
        highlights: ["Poster Presentation", "Visual Display", "Best Poster Award"],
      },
    },
    {
      time: "12:00 PM",
      isBreak: true,
      label: "Lunch Break",
    },
    {
      time: "1:00 PM",
      isBreak: false,
      event: {
        icon: Palette,
        title: "Logo Craft",
        slug: "logo-design",
        price: 150,
        description:
          "Blend creativity with technical precision to craft a distinctive brand identity. Design a professional and memorable logo that communicates vision, purpose, and innovation.",
        highlights: ["Logo Design", "Cash Prize"],
      },
    },
    {
      time: "2:00 PM",
      isBreak: false,
      event: {
        icon: HelpCircle,
        title: "Technozen",
        slug: "technical-quiz",
        price: 150,
        description:
          "Test your depth of technical knowledge across engineering domains in a fast-paced, multi-round quiz challenge. Compete against the brightest minds and prove your expertise.",
        highlights: ["Technical Quiz", "Multiple Rounds", "Top Prizes"],
      },
    },
  ],
};

const day2 = {
  label: "Day 2",
  date: "13th March 2026",
  slots: [
    {
      time: "9:00 AM",
      isBreak: false,
      event: {
        icon: Bike,
        title: "EV Spark",
        slug: "ev-spark",
        price: 150,
        description:
          "Dive into the future of sustainable transportation through an immersive electric vehicle workshop. Explore EV architecture, battery technology, and the engineering behind green mobility.",
        highlights: ["Electric Vehicle", "Workshop"],
      },
    },
    {
      time: "10:00 AM",
      isBreak: false,
      event: {
        icon: BatteryCharging,
        title: "Circuit Twisting",
        slug: "circuit-twisting",
        price: 150,
        description:
          "Put your electronics and circuit design skills to the ultimate test. Analyze, troubleshoot, and build functional circuits within a stipulated time in this hands-on hardware challenge.",
        highlights: ["Circuit Design", "Problem Solving", "Cash Prize"],
      },
    },
    {
      time: "11:00 AM",
      isBreak: false,
      event: {
        icon: Cpu,
        title: "Pragma",
        slug: "project-Expo",
        price: 150,
        description:
          "Bring your engineering projects to life with live demonstrations. Exhibit your technical solutions, prototypes, and innovations to judges and peers in a competitive expo setting.",
        highlights: ["Project Expo", "Live Demo", "Innovation Awards"],
      },
    },
    {
      time: "12:00 PM",
      isBreak: true,
      label: "Lunch Break",
    },
    {
      time: "1:00 PM",
      isBreak: false,
      event: {
        icon: Zap,
        title: "Codethon",
        slug: "coding-competition",
        price: 150,
        description:
          "Tackle real-world algorithmic challenges under time pressure. Demonstrate your problem-solving skills, coding efficiency, and logical thinking to claim the top spot on the leaderboard.",
        highlights: ["Coding Competition", "Problem Solving", "Cash Prize"],
      },
    },
  ],
};

/* ===============================
   NON TECHNICAL EVENTS
================================ */
const nonTechnicalEvents = [
  {
    icon: Trophy,
    title: "Graphite Elegance",
    slug: "graphite-elegance",
    price: 100,
    highlights: ["Creative Art", "Sketching", "Cash Prize"],
  },
  {
    icon: Camera,
    title: "Instant Capture",
    slug: "instant-capture",
    price: 100,
    highlights: ["Photography", "Creative Shots", "Competition"],
  },
  {
    icon: Puzzle,
    title: "Treasure Hunt",
    slug: "treasure-hunt",
    price: 100,
    highlights: ["Clues", "Fun Event", "Exciting Rewards"],
  },
  {
    icon: Camera,
    title: "Photo Clue",
    slug: "photo-clue",
    price: 100,
    highlights: ["Puzzle Based", "Creative Thinking"],
  },
  {
    icon: Puzzle,
    title: "Quick Meme",
    slug: "quick-meme",
    price: 100,
    highlights: ["Fun Event", "Creative Memes"],
  },
];

/* ===============================
   EVENT CARD
================================ */
const EventCard = ({ event }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group p-5 sm:p-6 rounded-xl bg-card border border-border glow-border card-hover flex flex-col"
  >
    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
      <event.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
    </div>

    <h3 className="text-lg sm:text-xl font-orbitron font-semibold mb-2">
      {event.title}
    </h3>

    {event.description && (
      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3">
        {event.description}
      </p>
    )}

    <p className="text-primary font-semibold mb-3 text-sm sm:text-base">
      Entry Fee: ₹{event.price}
    </p>

    <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
      {event.highlights.map((highlight: string) => (
        <span
          key={highlight}
          className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
        >
          {highlight}
        </span>
      ))}
    </div>

    <div className="mt-auto">
      <Link to={`/register/${event.slug}`}>
        <Button variant="glow" className="w-full">
          Register Now →
        </Button>
      </Link>
    </div>
  </motion.div>
);

/* ===============================
   DAY SCHEDULE SECTION
================================ */
const DaySchedule = ({ day }: { day: typeof day1 }) => (
  <section className="py-8 sm:py-10">
    <div className="container mx-auto px-4 sm:px-6">

      {/* Day Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 sm:mb-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-primary leading-none">
              {day.label}
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5 flex items-center gap-1.5">
              <span className="text-primary/60">—</span>
              {day.date}
            </p>
          </div>
        </div>
        <div className="hidden sm:block flex-1 h-px bg-border ml-4" />
      </motion.div>

      {/* Slots */}
      <div className="space-y-8">
        {day.slots.map((slot, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            {/* Time label */}
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <span className="text-primary font-semibold text-sm font-orbitron">
                {slot.time}
              </span>
            </div>

            {/* Break slot */}
            {slot.isBreak ? (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-muted/30">
                <Coffee className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground font-medium">{slot.label}</span>
              </div>
            ) : (
              <div className="max-w-lg">
                <EventCard event={slot.event} />
              </div>
            )}
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

/* ===============================
   PAGE
================================ */
const Events = () => {
  return (
    <Layout>

      {/* HERO */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-gradient-title leading-tight">
          Events &amp; Schedule
        </h1>
        <p className="text-muted-foreground mt-3 text-sm sm:text-base max-w-xl mx-auto">
          Two days of competitions, workshops, and challenges at PRAVAHA-2K26.
        </p>
      </section>

      {/* DAY 1 */}
      <DaySchedule day={day1} />

      {/* DIVIDER */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="h-px bg-border" />
      </div>

      {/* DAY 2 */}
      <DaySchedule day={day2} />

      {/* DIVIDER */}
      <div className="container mx-auto px-4 sm:px-6 mt-4">
        <div className="h-px bg-border" />
      </div>

      {/* NON TECHNICAL EVENTS */}
      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl font-orbitron text-primary mb-4 sm:mb-6 text-center sm:text-left"
          >
            Non-Technical Events (₹100)
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {nonTechnicalEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>

        </div>
      </section>

      {/* CTA spacer */}
      <section className="py-12 sm:py-16 text-center" />

    </Layout>
  );
};

export default Events;
