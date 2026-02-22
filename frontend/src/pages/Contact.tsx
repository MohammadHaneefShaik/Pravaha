import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const coordinators = [
  {
    name: "Dr. K. Ramesh Kumar",
    role: "Faculty Coordinator",
    phone: "+91 98765 43210",
    email: "ramesh.kumar@rgmcet.edu.in",
  },
  {
    name: "Prof. S. Lakshmi Devi",
    role: "Faculty Coordinator",
    phone: "+91 98765 43211",
    email: "lakshmi.devi@rgmcet.edu.in",
  },
  {
    name: "Arun Kumar",
    role: "Student Coordinator",
    phone: "+91 98765 43212",
    email: "arun.pravaha@rgmcet.edu.in",
  },
  {
    name: "Priya Sharma",
    role: "Student Coordinator",
    phone: "+91 98765 43213",
    email: "priya.pravaha@rgmcet.edu.in",
  },
];

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
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-gradient-title mb-4 sm:mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Have questions? Reach out to our team and we'll be happy to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5 sm:space-y-6"
            >
              <h2 className="text-xl sm:text-2xl font-orbitron font-bold text-foreground mb-4 sm:mb-6">
                Get in Touch
              </h2>

              {/* Address */}
              <div className="p-4 sm:p-6 rounded-xl bg-card border border-border glow-border">
                <div className="flex items-start gap-3 sm:gap-4">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Address</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      Department of Electrical &amp; Electronics Engineering<br />
                      Rajeev Gandhi Memorial College of Engineering &amp; Technology<br />
                      Nandyal - 518501, Andhra Pradesh, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-xl bg-card border border-border">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1.5 sm:mb-2" />
                  <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-1">Email</h3>
                  <a
                    href="mailto:pravaha2k26@rgmcet.edu.in"
                    className="text-primary text-xs sm:text-sm hover:underline break-all"
                  >
                    pravaha2k26@rgmcet.edu.in
                  </a>
                </div>
                <div className="p-3 sm:p-4 rounded-xl bg-card border border-border">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1.5 sm:mb-2" />
                  <h3 className="font-semibold text-foreground text-xs sm:text-sm mb-1">
                    Response Time
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">Within 24 hours</p>
                </div>
              </div>

              {/* Coordinators */}
              <div>
                <h3 className="text-base sm:text-lg font-orbitron font-semibold text-foreground mb-3 sm:mb-4">
                  Event Coordinators
                </h3>
                <div className="grid gap-2 sm:gap-3">
                  {coordinators.map((coordinator) => (
                    <div
                      key={coordinator.name}
                      className="p-3 sm:p-4 rounded-lg bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3"
                    >
                      <div>
                        <p className="font-medium text-foreground text-sm sm:text-base">
                          {coordinator.name}
                        </p>
                        <p className="text-xs text-primary">{coordinator.role}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        <a
                          href={`tel:${coordinator.phone}`}
                          className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {coordinator.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-4 sm:p-6 rounded-xl bg-card border border-border glow-border">
                <h3 className="text-base sm:text-lg font-orbitron font-semibold text-foreground mb-4 sm:mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 block">
                        Your Name
                      </label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 block">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 block">
                      Subject
                    </label>
                    <Input
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm text-muted-foreground mb-1.5 sm:mb-2 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Tell us more about your query..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={5}
                      className="bg-secondary/50 border-border resize-none"
                    />
                  </div>
                  <Button type="submit" variant="electric" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-6 sm:py-8 pb-12 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden border border-border glow-border"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3855.8881746282686!2d78.4732!3d15.4891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDI5JzIwLjgiTiA3OMKwMjgnMjMuNSJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="RGMCET Location"
              className="w-full sm:h-[400px] h-[260px]"
            />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
