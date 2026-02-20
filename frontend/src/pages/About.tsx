import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Building2, GraduationCap, Award, Target, Users, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-gradient-title mb-6">
              About PRAVAHA-2K26
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover the vision, mission, and the institution behind this
              prestigious national-level technical symposium.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Event */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-orbitron font-bold text-foreground">
                The Symposium
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                PRAVAHA-2K26 is a National Level Technical Symposium that embodies
                the "Flow of Innovation in Electrical Engineering." Organized under
                the banner of <span className="text-primary font-medium">EEE RIPPLE 2K26</span>,
                this event serves as a dynamic platform for students, researchers,
                and industry professionals to converge, share knowledge, and push
                the boundaries of electrical engineering.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The symposium features a diverse array of events including technical
                paper presentations, poster sessions, workshops, project exhibitions,
                and competitive challenges that test participants' theoretical
                knowledge and practical skills.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Target, label: "Innovation", value: "Focus" },
                { icon: Users, label: "Participants", value: "500+" },
                { icon: Lightbulb, label: "Events", value: "10+" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-xl bg-card border border-border glow-border text-center"
                >
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-orbitron font-bold text-foreground">
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* Department */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-orbitron font-bold text-gradient-title mb-6">
              Department of EEE
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Department of Electrical & Electronics Engineering at RGMCET
              is committed to excellence in education, research, and innovation.
              With state-of-the-art laboratories, experienced faculty, and a
              focus on industry-relevant curriculum, the department prepares
              students for successful careers in the rapidly evolving field of
              electrical engineering.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              PRAVAHA-2K26 represents the department's commitment to fostering
              a culture of technical excellence and providing students with
              opportunities to showcase their talents on a national stage.
            </p>
          </motion.div>
        </div>
      </section>


      {/* About College */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-gradient-title mb-4">
              The Institution
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Organized by the Department of EEE, RGMCET
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-card border border-border glow-border"
            >
              <Building2 className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                RGMCET
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rajeev Gandhi Memorial College of Engineering & Technology is a
                premier engineering institution located in Nandyal, Andhra Pradesh.
                Established with a vision to provide quality technical education,
                the college has been producing skilled engineers for over decades.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-card border border-border glow-border"
            >
              <GraduationCap className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Affiliation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The college is affiliated to Jawaharlal Nehru Technological
                University Anantapuramu (JNTUA), ensuring that the curriculum
                and academic standards meet the highest benchmarks of technical
                education in India.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-xl bg-card border border-border glow-border"
            >
              <Award className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-orbitron font-semibold text-foreground mb-3">
                Accreditations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                RGMCET is approved by AICTE (All India Council for Technical
                Education) and has received accreditation from NBA (National
                Board of Accreditation) and NAAC (National Assessment and
                Accreditation Council).
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
