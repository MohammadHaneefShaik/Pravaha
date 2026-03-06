import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, User, Briefcase, Globe } from "lucide-react";

const coordinators = {
  faculty: [
    {
      name: "Dr. D.Lenine",
      role: "Professor, EEE",
      phone: "+91 9866723784",
      email: "Lenine@rgmcet.edu.in",
    },
    {
      name: "Mr. Y.Vijaya Suresh",
      role: "Associate Professor, EEE",
      phone: "+91 9441243353",
      email: "vijayasuresh@rgmcet.edu.in",
    },
  ],
  students: [
    { name: "P.Firoza Shabnam", phone: "+91 8500602016" },
    { name: "P.Firoz Khan", phone: "+91 9133715935" },
    { name: "R.Siva Nanda Reddy", phone: "+91 8309246760" },
    { name: "B.Swetha Dimpul", phone: "+91 8121295602" },
    { name: "S.MD.Arif", phone: "+91 9398875293" },
    { name: "S.MD.Umar Farook", phone: "+91 9014185582" },
  ],
};

const Contact = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gradient-title mb-6">
              Contact Us
            </h1>
            <p className="text-muted-foreground font-medium tracking-wide">
              Connect with the organizers of <span className="text-primary font-bold">PRAVAHA 2K26</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Organizer Directory */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-16"
          >
            {/* Faculty Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-orbitron font-bold text-foreground uppercase tracking-wider">
                  Faculty Leads
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <div className="grid gap-6">
                {coordinators.faculty.map((coord, i) => (
                  <CoordinatorRow key={i} coord={coord} isFaculty={true} />
                ))}
              </div>
            </div>

            {/* Student Coordinators Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-orbitron font-bold text-foreground uppercase tracking-wider">
                  Student Coordinators
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {coordinators.students.map((coord, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-card/30 border border-border flex items-center justify-between gap-4 hover:bg-card/60 hover:border-primary/40 transition-all group backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary">
                        <User className="w-5 h-5" />
                      </div>
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">
                        {coord.name}
                      </p>
                    </div>
                    <a
                      href={`tel:${coord.phone}`}
                      className="flex items-center gap-2 text-sm font-black bg-secondary hover:bg-primary hover:text-primary-foreground px-4 py-2 rounded-xl transition-all shadow uppercase tracking-wider whitespace-nowrap"
                    >
                      <Phone size={14} />
                      {coord.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Communication Hub */}
      <section className="py-20 bg-secondary/10 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-2">Communication Hub</h2>
            <p className="text-muted-foreground uppercase text-[10px] tracking-[0.4em]">Reach out via official channels</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center p-10 rounded-3xl bg-card border border-border group hover:border-primary transition-all">
              <div className="p-5 bg-primary/10 rounded-2xl text-primary mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <h3 className="font-bold text-foreground mb-3 uppercase tracking-widest text-sm">Physical Venue</h3>
              <p className="text-muted-foreground text-sm text-center leading-relaxed">
                RGMCET (Autonomous)<br />Nandyal - 518501, AP, India
              </p>
            </div>

            <div className="flex flex-col items-center p-10 rounded-3xl bg-card border border-border group hover:border-primary transition-all">
              <div className="p-5 bg-primary/10 rounded-2xl text-primary mb-6 group-hover:scale-110 transition-transform">
                <Mail size={32} />
              </div>
              <h3 className="font-bold text-foreground mb-3 uppercase tracking-widest text-sm">Email Support</h3>
              <p className="text-primary font-mono text-sm font-bold">pravahaeee@rgmcet.edu.in</p>
            </div>

            <div className="flex flex-col items-center p-10 rounded-3xl bg-card border border-border group hover:border-primary transition-all">
              <div className="p-5 bg-primary/10 rounded-2xl text-primary mb-6 group-hover:scale-110 transition-transform">
                <Globe size={32} />
              </div>
              <h3 className="font-bold text-foreground mb-3 uppercase tracking-widest text-sm">Official Website</h3>
              <p className="text-muted-foreground text-sm text-center font-bold">
                www.rgmcet.edu.in
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

/* Internal Helper Component for Faculty Coordinator Rows */
function CoordinatorRow({ coord, isFaculty }: { coord: any; isFaculty: boolean }) {
  return (
    <div className="p-8 rounded-3xl bg-card/30 border border-border flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-card/60 hover:border-primary/40 transition-all group backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <div
          className={`p-5 rounded-2xl shadow-inner ${isFaculty ? "bg-cyan-500/10 text-cyan-400" : "bg-primary/10 text-primary"
            }`}
        >
          {isFaculty ? <Briefcase className="w-7 h-7" /> : <User className="w-7 h-7" />}
        </div>
        <div>
          <p className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {coord.name}
          </p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mt-1">
            {coord.role}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href={`tel:${coord.phone}`}
          className="flex h-12 px-6 items-center gap-3 text-sm font-black bg-secondary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all shadow-lg uppercase tracking-wider"
        >
          <Phone size={18} />
          {coord.phone}
        </a>
        <a
          href={`mailto:${coord.email}`}
          className="flex h-12 w-12 items-center justify-center bg-card border border-border hover:border-primary hover:text-primary rounded-xl transition-all shadow-md"
          title={coord.email}
        >
          <Mail size={22} />
        </a>
      </div>
    </div>
  );
}

export default Contact;
