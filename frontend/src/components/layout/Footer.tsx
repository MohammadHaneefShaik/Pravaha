import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-primary" />
              <span className="text-xl font-orbitron font-bold text-electric">
                PRAVAHA-2K26
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              EEE RIPPLE 2K26 - National Level Technical Symposium. Flow of
              Innovation in Electrical Engineering.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["About", "Events", "Registration", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Events */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-semibold text-foreground">
              Events
            </h3>
            <ul className="space-y-2">
              {[
                "Paper Presentation",
                "Poster Presentation",
                "Technical Quiz",
                "Workshops",
                "Project Expo",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/events"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-semibold text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  RGMCET, Nandyal, Andhra Pradesh, India - 518501
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:pravaha2k26@rgmcet.edu.in"
                  className="hover:text-primary transition-colors"
                >
                  pravaha2k26@rgmcet.edu.in
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-primary transition-colors"
                >
                  +91 9398875293
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© PRAVAHA-2K26 – All Rights Reserved</p>
            <p>Organized by Department of EEE, RGMCET</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
