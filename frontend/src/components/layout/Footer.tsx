import { Link } from "react-router-dom";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
              <span className="text-lg sm:text-xl font-orbitron font-bold text-electric">
                PRAVAHA-2K26
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              EEE RIPPLE 2K26 - National Level Technical Symposium. Flow of
              Innovation in Electrical Engineering.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-semibold text-foreground text-sm sm:text-base">
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
            <h3 className="font-orbitron font-semibold text-foreground text-sm sm:text-base">
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
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="font-orbitron font-semibold text-foreground text-sm sm:text-base">
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
                  className="hover:text-primary transition-colors break-all"
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
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            <p>© PRAVAHA-2K26 – All Rights Reserved</p>
            <p>Organized by Department of EEE, RGMCET</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
