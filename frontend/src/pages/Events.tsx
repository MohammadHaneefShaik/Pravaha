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
} from "lucide-react";

/* ===============================
   TECHNICAL EVENTS
================================ */
const technicalEvents = [
  {
    icon: FileText,
    title: "Paper Presentation",
    slug: "paper-presentation",
    price: 150,
    description:
      "Showcase your research and innovative ideas through structured academic papers. Present your findings before a panel of industry experts and gain invaluable professional feedback.",
    highlights: ["Battle of Ideaz", "Research Papers", "Expert Feedback"],
  },
  {
    icon: Cpu,
    title: "Project Expo",
    slug: "project-Expo",
    price: 150,
    description:
      "Bring your engineering projects to life with live demonstrations. Exhibit your technical solutions, prototypes, and innovations to judges and peers in a competitive expo setting.",
    highlights: ["Pragma", "Live Demo", "Innovation Awards"],
  },
  {
    icon: Image,
    title: "Poster Presentation",
    slug: "poster-presentation",
    price: 150,
    description:
      "Communicate complex technical concepts through compelling visual design. Create an impactful poster that effectively conveys your research, analysis, or engineering solution.",
    highlights: ["Blue Print", "Visual Display", "Best Poster Award"],
  },
  {
    icon: HelpCircle,
    title: "Technical Quiz",
    slug: "technical-quiz",
    price: 150,
    description:
      "Test your depth of technical knowledge across engineering domains in a fast-paced, multi-round quiz challenge. Compete against the brightest minds and prove your expertise.",
    highlights: ["Technozen", "Multiple Rounds", "Top Prizes"],
  },
  {
    icon: Zap,
    title: "Coding Competition",
    slug: "coding-competition",
    price: 150,
    description:
      "Tackle real-world algorithmic challenges under time pressure. Demonstrate your problem-solving skills, coding efficiency, and logical thinking to claim the top spot on the leaderboard.",
    highlights: ["Codathon", "Problem Solving", "Cash Prize"],
  },
  {
    icon: BatteryCharging,
    title: "Circuit Twisting",
    slug: "circuit-twisting",
    price: 150,
    description:
      "Put your electronics and circuit design skills to the ultimate test. Analyze, troubleshoot, and build functional circuits within a stipulated time in this hands-on hardware challenge.",
    highlights: ["Circuit Design", "Problem Solving", "Cash Prize"],
  },
  {
    icon: Palette,
    title: "Logo Design",
    slug: "logo-design",
    price: 150,
    description:
      "Blend creativity with technical precision to craft a distinctive brand identity. Design a professional and memorable logo that communicates vision, purpose, and innovation.",
    highlights: ["Logo Craft", "Cash Prize"],
  },
  {
    icon: Bike,
    title: "EV Spark",
    slug: "ev-spark",
    price: 150,
    description:
      "Dive into the future of sustainable transportation through an immersive electric vehicle workshop. Explore EV architecture, battery technology, and the engineering behind green mobility.",
    highlights: ["Electric Vehicle", "Workshop"],
  },
];



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

    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3">
      {event.description}
    </p>

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

const Events = () => {
  return (
    <Layout>

      {/* HERO */}
      <section className="pt-24 sm:pt-32 pb-8 sm:pb-12 text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-gradient-title leading-tight">
          Events &amp; Activities
        </h1>
        <p className="text-muted-foreground mt-3 text-sm sm:text-base max-w-xl mx-auto">
          Choose your challenge and register to compete at PRAVAHA-2K26.
        </p>
      </section>

      {/* TECHNICAL EVENTS */}
      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-orbitron text-primary mb-4 sm:mb-6 text-center sm:text-left">
            Technical Events (₹150)
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {technicalEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>

        </div>
      </section>



      {/* CTA */}
      <section className="py-12 sm:py-16 text-center">

      </section>

    </Layout>
  );
};

export default Events;
