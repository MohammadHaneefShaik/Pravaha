import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Building2, GraduationCap, Award, Target, Users, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-gradient-title mb-4 sm:mb-6 leading-tight">
              About PRAVAHA-2K26
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Discover the vision, mission, and the institution behind this
              prestigious national-level technical symposium.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Event */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6 text-center lg:text-left"
            >
              <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-foreground">
                The Symposium
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                PRAVAHA-2K26 is a National Level Technical Symposium that embodies
                the "Flow of Innovation in Electrical Engineering." Organized under
                the banner of <span className="text-primary font-medium">EEE RIPPLE 2K26</span>,
                this event serves as a dynamic platform for students, researchers,
                and industry professionals to converge, share knowledge, and push
                the boundaries of electrical engineering.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
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
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {[
                { icon: Users, label: "Participants", value: "200+" },
                { icon: Lightbulb, label: "Events", value: "06+" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-5 sm:p-6 rounded-xl bg-card border border-border glow-border text-center"
                >
                  <item.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl font-orbitron font-bold text-foreground">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mt-1">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* Department */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-orbitron font-bold text-gradient-title mb-4 sm:mb-6">
              Department of EEE
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
              The Department of Electrical &amp; Electronics Engineering at RGMCET
              is committed to excellence in education, research, and innovation.
              With state-of-the-art laboratories, experienced faculty, and a
              focus on industry-relevant curriculum, the department prepares
              students for successful careers in the rapidly evolving field of
              electrical engineering.
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              PRAVAHA-2K26 represents the department's commitment to fostering
              a culture of technical excellence and providing students with
              opportunities to showcase their talents on a national stage.
            </p>
          </motion.div>
        </div>
      </section>


      {/* About College */}
      <section className="py-12 sm:py-16 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold text-gradient-title mb-3 sm:mb-4">
              The Institution
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
              Organized by the Department of EEE, RGMCET
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                icon: Building2,
                delay: 0.1,
                title: "RGMCET",
                body: "Rajeev Gandhi Memorial College of Engineering & Technology is a premier engineering institution located in Nandyal, Andhra Pradesh. Established with a vision to provide quality technical education, the college has been producing skilled engineers for over decades.",
              },
              {
                icon: GraduationCap,
                delay: 0.2,
                title: "Affiliation",
                body: "The college is affiliated to Jawaharlal Nehru Technological University Anantapuramu (JNTUA), ensuring that the curriculum and academic standards meet the highest benchmarks of technical education in India.",
              },
              {
                icon: Award,
                delay: 0.3,
                title: "Accreditations",
                body: "RGMCET is approved by AICTE (All India Council for Technical Education) and has received accreditation from NBA (National Board of Accreditation) and NAAC (National Assessment and Accreditation Council).",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: card.delay }}
                className="p-5 sm:p-6 rounded-xl bg-card border border-border glow-border"
              >
                <card.icon className="w-9 h-9 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-orbitron font-semibold text-foreground mb-2 sm:mb-3">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {card.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
