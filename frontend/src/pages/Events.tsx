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
  Trophy,
  Camera,
  Puzzle,
  ArrowRight,
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
    highlights: ["Battle of Ideaz", "Research Papers", "Expert Feedback"],
  },
  {
    icon: Cpu,
    title: "Project Presentation",
    slug: "project-presentation",
    price: 150,
    highlights: ["Pragma", "Live Demo", "Innovation Awards"],
  },
  {
    icon: Image,
    title: "Poster Presentation",
    slug: "poster-presentation",
    price: 150,
    highlights: ["Blue Print", "Visual Display", "Best Poster Award"],
  },
  {
    icon: HelpCircle,
    title: "Technical Quiz",
    slug: "technical-quiz",
    price: 150,
    highlights: ["Technozen", "Multiple Rounds", "Top Prizes"],
  },
  {
    icon: Zap,
    title: "Coding Competition",
    slug: "coding-competition",
    price: 150,
    highlights: ["Codathon", "Problem Solving", "Cash Prize"],
  },
];

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

      {/* NON TECHNICAL EVENTS */}
      <section className="py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-orbitron text-primary mb-4 sm:mb-6 text-center sm:text-left">
            Non-Technical Events (₹100)
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {nonTechnicalEvents.map((event) => (
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
