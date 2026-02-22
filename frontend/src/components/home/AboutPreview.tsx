import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Award, GraduationCap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPreview = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-gradient-title">
              About PRAVAHA-2K26
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              PRAVAHA-2K26 is the flagship National Level Technical Symposium organized
              by the Department of Electrical & Electronics Engineering (EEE) at
              Rajeev Gandhi Memorial College of Engineering & Technology (RGMCET),
              Nandyal.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The event brings together brilliant minds from across the nation to
              participate in paper presentations, technical competitions, workshops,
              and project exhibitions, fostering innovation and knowledge exchange
              in the field of electrical engineering.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-primary">
                  200+
                </div>
                <div className="text-xs text-muted-foreground mt-1">Participants</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-2xl md:text-3xl font-orbitron font-bold text-primary">
                  6+
                </div>
            
                <div className="text-xs text-muted-foreground mt-1">events</div>
              </div>
            </div>

            <Button asChild variant="glow" size="lg" className="mt-4">
              <Link to="/about" className="gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                icon: Building2,
                title: "RGMCET, Nandyal",
                desc: "Premier engineering institution in Andhra Pradesh",
              },
              {
                icon: GraduationCap,
                title: "Affiliated to JNTUA",
                desc: "Jawaharlal Nehru Technological University Anantapuramu",
              },
              {
                icon: Award,
                title: "Accreditations",
                desc: "Approved by AICTE | NBA | NAAC Accredited",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                className="flex gap-4 p-5 rounded-xl bg-card border border-border glow-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-orbitron font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
