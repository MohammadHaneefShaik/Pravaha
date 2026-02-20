import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Clock, Send, User, Briefcase, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const coordinators = {
  faculty: [
    {
      name: "Dr. M. Sravan Kumar Reddy",
      role: "Associate Professor, CSE",
      phone: "+91 91600 69003",
      email: "mskreddycse@rgmcet.edu.in",
    },
    {
      name: "Mr. P. Naveen Sundar Kumar",
      role: "Assistant Professor, CSE",
      phone: "+91 98488 83044",
      email: "naveen@rgmcet.edu.in",
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
      name: "K. Arshad",
      role: "III EEE (24095A0203)",
      phone: "+91 81794 79455",
      email: "kattubadiarshad@gmail.com",
    },
  ],
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Transmission received! Our team will respond shortly.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-gradient-title mb-6">
              Get In Touch
            </h1>
            <p className="text-muted-foreground font-medium tracking-wide">
              Direct channels for <span className="text-primary font-bold">PRAVAHA 2K26</span> support and inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Inquiry Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Direct Inquiries Form (Sticky Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="p-8 rounded-3xl bg-card/30 border border-border glow-border shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <MessageSquare size={24} />
                  </div>
                  <h2 className="text-2xl font-orbitron font-bold text-foreground">Direct Inquiries</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Identity</label>
                    <Input
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/40 border-border h-14 rounded-xl focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Digital Address</label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background/40 border-border h-14 rounded-xl focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Detailed Message</label>
                    <Textarea
                      placeholder="State your query or feedback here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="bg-background/40 border-border resize-none rounded-xl focus:ring-primary"
                    />
                  </div>
                  <Button type="submit" variant="electric" className="w-full py-8 text-lg font-black uppercase tracking-[0.2em] group">
                    <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform" />
                    Transmit
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Coordinator Details (Full Width Display) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-12"
            >
              {/* Faculty Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-orbitron font-bold text-foreground uppercase tracking-wider">Faculty Leads</h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
                </div>
                <div className="grid gap-4">
                  {coordinators.faculty.map((coord, i) => (
                    <CoordinatorRow key={i} coord={coord} isFaculty={true} />
                  ))}
                </div>
              </div>

              {/* Students Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-orbitron font-bold text-foreground uppercase tracking-wider">Student Coordinators</h3>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-border to-transparent"></div>
                </div>
                <div className="grid gap-4">
                  {coordinators.student.map((coord, i) => (
                    <CoordinatorRow key={i} coord={coord} isFaculty={false} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Communication Hub (Final Footer Contact) */}
      <section className="py-20 bg-secondary/10 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-orbitron font-bold text-foreground mb-2">Communication Hub</h2>
            <p className="text-muted-foreground uppercase text-[10px] tracking-[0.4em]">Official RGMCET Channels</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center p-8 rounded-2xl bg-card border border-border group hover:border-primary transition-colors">
              <div className="p-4 bg-primary/10 rounded-full text-primary mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <h3 className="font-bold text-foreground mb-3 uppercase tracking-tighter">Physical Venue</h3>
              <p className="text-muted-foreground text-sm text-center leading-relaxed">
                RGMCET (Autonomous)<br />Nandyal - 518501, AP, India
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-2xl bg-card border border-border group hover:border-primary transition-colors">
              <div className="p-4 bg-primary/10 rounded-full text-primary mb-6 group-hover:scale-110 transition-transform">
                <Mail size={28} />
              </div>
              <h3 className="font-bold text-foreground mb-3 uppercase tracking-tighter">Official Email</h3>
              <p className="text-primary font-mono text-sm">pravaha2k26@rgmcet.edu.in</p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-2xl bg-card border border-border group hover:border-primary transition-colors">
              <div className="p-4 bg-primary/10 rounded-full text-primary mb-6 group-hover:scale-110 transition-transform">
                <Clock size={28} />
              </div>
              <h3 className="font-bold text-foreground mb-3 uppercase tracking-tighter">Operations</h3>
              <p className="text-muted-foreground text-sm">Mon - Sat</p>
              <p className="text-foreground font-bold">09:00 AM - 05:00 PM IST</p>
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
    <div className="p-6 rounded-2xl bg-card/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-card/80 transition-all group">
      <div className="flex items-center gap-5">
        <div className={`p-4 rounded-2xl shadow-inner ${isFaculty ? 'bg-cyan-500/10 text-cyan-400' : 'bg-primary/10 text-primary'}`}>
          {isFaculty ? <Briefcase className="w-6 h-6" /> : <User className="w-6 h-6" />}
        </div>
        <div>
          <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {coord.name}
          </p>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.1em]">{coord.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <a
          href={`tel:${coord.phone}`}
          className="flex h-12 px-6 items-center gap-3 text-sm font-bold bg-secondary hover:bg-primary hover:text-primary-foreground rounded-xl transition-all shadow-lg"
        >
          <Phone size={16} />
          {coord.phone}
        </a>
        <a
          href={`mailto:${coord.email}`}
          className="flex h-12 w-12 items-center justify-center bg-card border border-border hover:border-primary hover:text-primary rounded-xl transition-all"
        >
          <Mail size={20} />
        </a>
      </div>
    </div>
  );
}

export default Contact;
