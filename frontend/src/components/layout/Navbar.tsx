import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const API = import.meta.env.VITE_API_URL;

export default function Navbar({ showLogo = true }) {

  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  /* ======================
     CHECK ADMIN SESSION
  ====================== */
  useEffect(() => {

    fetch(`${API}/api/admin/me`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setIsAdmin(data.success === true);
      })
      .catch(() => setIsAdmin(false));

  }, []);


  /* ======================
     LOGOUT
  ====================== */
  const handleLogout = async () => {

    try {

      await fetch(`${API}/api/admin/logout`, {
        method: "GET",
        credentials: "include",
      });

    } catch (err) {
      console.error(err);
    }

    setIsAdmin(false);

    navigate("/admin");

  };


  const desktopLinkClass = ({ isActive }) =>
    `text-sm font-medium transition ${isActive
      ? "text-primary"
      : "text-muted-foreground hover:text-primary"
    }`;


  const mobileLinkClass = ({ isActive }) =>
    `block py-3 px-4 text-center rounded-lg transition ${isActive
      ? "text-primary bg-primary/10"
      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
    }`;


  return (

    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border"
    >

      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        {showLogo && (
          <Link to="/" className="flex items-center gap-2 min-w-0">

            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />

            <span className="font-orbitron font-bold text-base sm:text-lg truncate">
              PRAVAHA-2K26
            </span>

          </Link>
        )}


        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">

          {/* NORMAL USER */}
          {!isAdmin && (
            <>
              <NavLink to="/" className={desktopLinkClass}>
                Home
              </NavLink>

              <NavLink to="/about" className={desktopLinkClass}>
                About
              </NavLink>

              <NavLink to="/events" className={desktopLinkClass}>
                Events
              </NavLink>

              <NavLink to="/contact" className={desktopLinkClass}>
                Contact
              </NavLink>

              <NavLink to="/admin" className={desktopLinkClass}>
                Admin Login
              </NavLink>
            </>
          )}


          {/* ADMIN VIEW */}
          {isAdmin && (
            <>
              <NavLink
                to="/dashboard"
                className="text-primary font-semibold"
              >
                User Dashboard
              </NavLink>

              <NavLink
                to="/admin/dashboard"
                className="text-primary font-semibold"
              >
                Admin Dashboard
              </NavLink>

              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}

        </div>


        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>


      {/* MOBILE MENU */}
      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >

            <div className="flex flex-col gap-1 p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">

              {!isAdmin && (
                <>
                  <NavLink
                    to="/"
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/about"
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    About
                  </NavLink>

                  <NavLink
                    to="/events"
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    Events
                  </NavLink>

                  <NavLink
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    Contact
                  </NavLink>

                  <NavLink
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    Admin Login
                  </NavLink>
                </>
              )}


              {isAdmin && (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    User Dashboard
                  </NavLink>

                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className={mobileLinkClass}
                  >
                    Admin Dashboard
                  </NavLink>

                  <Button
                    variant="destructive"
                    className="w-full mt-2"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.nav>

  );

}
