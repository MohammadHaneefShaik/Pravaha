import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, User, Briefcase, Globe } from "lucide-react";

const coordinators = {
  faculty: [
    {
      name: "Dr. D.Lenine",
      role: " Professor, EEE",
      phone: "+91 9866723784",
      email: "Lenine@rgmcet.edu.in",
    },
    {
      name: "Mr.Y.Vijaya Suresh",
      role: "Associate Professor, EEE",
      phone: "+91 9441243353",
      email: "vijayasuresh@rgmcet.edu.in",
    },
  ],
  student: [
    {
      name: "S. MD. Arif",
      role: "III EEE (23091A0209)",
      phone: "+91 93988 75293",
      email: "sh040293@gmail.com",
    },
    {
      name: "S. MD. Umar Farook",
      role: "III EEE (24095A0218)",
      phone: "+91 90141 85582",
      email: "umarshaik2208@gmail.com",
    },
    {
      name: "R.Siva Nanda Reddy",
      role: "III EEE (23091A0270)",
      phone: "+91 8309246760",
      email: "rsivareddy46@gmail.com",
    },
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
                <h3 className="text-2xl font-orbitron font-bold text-foreground uppercase tracking-wider">Faculty Leads</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <div className="grid gap-6">
                {coordinators.faculty.map((coord, i) => (
                  <CoordinatorRow key={i} coord={coord} isFaculty={true} />
                ))}
              </div>
            </div>

            {/* Students Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-orbitron font-bold text-foreground uppercase tracking-wider">Student Coordinators</h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
              </div>
              <div className="grid gap-6">
                {coordinators.student.map((coord, i) => (
                  <CoordinatorRow key={i} coord={coord} isFaculty={false} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Communication Hub (Final Footer Contact) */}
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
              <p className="text-primary font-mono text-sm font-bold">pravaha2k26@rgmcet.edu.in</p>
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

/* Internal Helper Component for Coordinator Rows */
function CoordinatorRow({ coord, isFaculty }: { coord: any, isFaculty: boolean }) {
  return (
    <div className="p-8 rounded-3xl bg-card/30 border border-border flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-card/60 hover:border-primary/40 transition-all group backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <div className={`p-5 rounded-2xl shadow-inner ${isFaculty ? 'bg-cyan-500/10 text-cyan-400' : 'bg-primary/10 text-primary'}`}>
          {isFaculty ? <Briefcase className="w-7 h-7" /> : <User className="w-7 h-7" />}
        </div>
        <div>
          <p className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {coord.name}
          </p>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mt-1">{coord.role}</p>
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
