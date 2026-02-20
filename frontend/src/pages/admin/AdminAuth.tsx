import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const API = import.meta.env.VITE_API_URL;

const AdminAuth = () => {

  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  /* ============================
     ADMIN LOGIN
  ============================ */
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(`${API}/api/admin/login`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({

          admin_name: adminName,
          password: password,

        }),

      });

      const data = await res.json();

      if (data.success) {

        toast.success("Welcome Admin 🚀");

        navigate("/admin/dashboard");

      } else {

        toast.error("Invalid admin credentials");

      }

    } catch (err) {

      console.error(err);

      toast.error("Server error");

    }

    setLoading(false);

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-background px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >

        {/* HEADER */}
        <div className="text-center mb-8">

          <Zap className="w-12 h-12 text-primary mx-auto mb-4" />

          <h1 className="text-2xl font-orbitron font-bold text-gradient-title">
            PRAVAHA-2K26
          </h1>

          <p className="text-muted-foreground">
            Admin Portal
          </p>

        </div>


        {/* CARD */}
        <div className="p-6 rounded-xl bg-card border border-border glow-border">

          <h2 className="text-xl font-orbitron text-center mb-6">
            Admin Login
          </h2>


          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">


            {/* EMAIL */}
            <div>

              <label className="text-sm text-muted-foreground">
                Admin Email
              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

                <Input
                  type="email"
                  placeholder="admin@pravaha.com"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="pl-10"
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div>

              <label className="text-sm text-muted-foreground">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>

            </div>


            {/* BUTTON */}
            <Button
              type="submit"
              variant="electric"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>


          </form>

        </div>


        {/* BACK */}
        <div className="text-center mt-6">

          <a href="/" className="text-primary hover:underline">

            ← Back to Website

          </a>

        </div>


      </motion.div>

    </div>

  );

};

export default AdminAuth;
