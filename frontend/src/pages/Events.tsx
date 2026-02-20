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
    className="group p-6 rounded-xl bg-card border border-border glow-border card-hover"
  >
    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
      <event.icon className="w-7 h-7 text-primary" />
    </div>

    <h3 className="text-xl font-orbitron font-semibold mb-2">
      {event.title}
    </h3>

    <p className="text-primary font-semibold mb-3">
      Entry Fee: ₹{event.price}
    </p>

    <div className="flex flex-wrap gap-2 mb-5">
      {event.highlights.map((highlight: string) => (
        <span
          key={highlight}
          className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
        >
          {highlight}
        </span>
      ))}
    </div>

    <Link to={`/register/${event.slug}`}>
      <Button variant="glow" className="w-full">
        Register Now →
      </Button>
    </Link>
  </motion.div>
);

const Events = () => {
  return (
    <Layout>

      {/* HERO */}
      <section className="pt-32 pb-12 text-center">
        <h1 className="text-5xl font-orbitron font-bold text-gradient-title">
          Events & Activities
        </h1>
      </section>

      {/* TECHNICAL EVENTS */}
      <section className="py-10">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-orbitron text-primary mb-6">
            Technical Events (₹150)
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>

        </div>
      </section>

      {/* NON TECHNICAL EVENTS */}
      <section className="py-10">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-orbitron text-primary mb-6">
            Non-Technical Events (₹100)
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonTechnicalEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        
      </section>

    </Layout>
  );
};

export default Events;
