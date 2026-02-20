import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, FileText, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";
import DignitaryGallery from "./DigitalGallery";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 mb-8"
        >
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium">12th & 13th March 2026</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-orbitron font-bold text-gradient-title mb-4"
        >
          PRAVAHA-2K26
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-2 mb-6"
        >
          <h2 className="text-xl md:text-2xl font-orbitron text-primary tracking-wider">
            EEE RIPPLE 2K26
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            National Level Technical Symposium
          </p>
          <p className="text-base md:text-lg text-primary/80 italic">
            "Flow of Innovation in Electrical Engineering"
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <CountdownTimer />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto text-muted-foreground text-base md:text-lg mb-10"
        >
          A premier platform for aspiring electrical engineers to innovate, compete,
          and collaborate.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
            
          <Button asChild variant="outline" size="xl">  
            <Link to="/events">explore Events</Link>
          </Button>
        </motion.div>
      </div>

      {/* Animated Circuit Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
