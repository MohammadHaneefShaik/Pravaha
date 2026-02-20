import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Clock, Send, User, Briefcase } from "lucide-react";
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
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Have questions regarding <span className="text-primary">PRAVAHA 2K26</span>? Reach out to our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column: Info & Coordinators */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-orbitron font-bold text-foreground mb-6">
                  Communication Hub
                </h2>
                
                {/* Address Card */}
                <div className="p-6 rounded-xl bg-card border border-border glow-border mb-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Venue Address</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Rajeev Gandhi Memorial College of Engineering & Technology (Autonomous)<br />
                        Nandyal - 518501, Andhra Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <Mail className="w-5 h-5 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground text-sm mb-1">General Support</h3>
                    <p className="text-primary text-[11px] font-medium break-all">
                      pravaha2k26@rgmcet.edu.in
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <Clock className="w-5 h-5 text-primary mb-2" />
                    <h3 className="font-semibold text-foreground text-sm mb-1">Office Hours</h3>
                    <p className="text-muted-foreground text-xs font-medium">09:00 AM - 05:00 PM IST</p>
                  </div>
                </div>
              </div>

              {/* Coordinator List */}
              <div className="space-y-6">
                <h3 className="text-xl font-orbitron font-semibold text-foreground border-l-4 border-primary pl-3 uppercase tracking-wider">
                  Event Organizers
                </h3>
                
                <div className="space-y-4">
                  {/* Faculty Section */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-[1px] flex-1 bg-border"></div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Faculty Leads</span>
                    <div className="h-[1px] flex-1 bg-border"></div>
                  </div>
                  {coordinators.faculty.map((coord, i) => (
                    <CoordinatorRow key={i} coord={coord} isFaculty={true} />
                  ))}

                  {/* Students Section */}
                  <div className="flex items-center gap-2 mt-6 mb-2">
                    <div className="h-[1px] flex-1 bg-border"></div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Student Coordinators</span>
                    <div className="h-[1px] flex-1 bg-border"></div>
                  </div>
                  {coordinators.student.map((coord, i) => (
                    <CoordinatorRow key={i} coord={coord} isFaculty={false} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-8 rounded-2xl bg-card border border-border glow-border sticky top-28 shadow-2xl">
                <h3 className="text-xl font-orbitron font-semibold text-foreground mb-6">
                  Direct Inquiries
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-tighter ml-1">Full Name</label>
                    <Input
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/50 border-border focus:ring-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-tighter ml-1">Email Address</label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background/50 border-border focus:ring-primary h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-tighter ml-1">Message</label>
                    <Textarea
                      placeholder="Describe your query..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="bg-background/50 border-border resize-none focus:ring-primary"
                    />
                  </div>
                  <Button type="submit" variant="electric" className="w-full py-7 text-md font-black uppercase tracking-widest group shadow-lg shadow-primary/20">
                    <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Transmission
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-border glow-border shadow-2xl"
          >
            <div className="bg-card p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest">Campus Location</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">RGMCET Nandyal</span>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m13!1m3!1d3844.7573030230214!2d78.47954131484964!3d15.4839840892404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5ade957b77053%3A0xc330e2f42a15998b!2sRajeev%20Gandhi%20Memorial%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1647416345678!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              allowFullScreen
              loading="lazy"
              title="RGMCET Campus Map"
            />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

function CoordinatorRow({ coord, isFaculty }: { coord: any, isFaculty: boolean }) {
  return (
    <div className="p-4 rounded-xl bg-card/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-card/80 hover:border-primary/50 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${isFaculty ? 'bg-cyan-500/10 text-cyan-400' : 'bg-primary/10 text-primary'}`}>
          {isFaculty ? <Briefcase className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>
        <div>
          <p className="font-bold text-foreground group-hover:text-primary transition-colors">
            {coord.name}
          </p>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-tight">{coord.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
        <a
          href={`tel:${coord.phone}`}
          className="flex h-10 px-4 items-center gap-2 text-xs font-bold bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          {coord.phone.split(' ')[2] + ' ' + coord.phone.split(' ')[3]}
        </a>
        <a
          href={`mailto:${coord.email}`}
          className="flex h-10 w-10 items-center justify-center bg-secondary border border-border hover:border-primary hover:text-primary rounded-lg transition-all"
          title={coord.email}
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
