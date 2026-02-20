/*import auth from "../service/auth.js";

const { setUser } = auth;

// =========================
// ADMIN LOGIN
// =========================
export async function handleAdminLogin(req, res) {
  try {
    const { admin_name, password } = req.body;

    if (!admin_name || !password) {
      return res.status(400).json({
        success: false,
        message: "Admin name and password required",
      });
    }

    if (admin_name !== "admin@concurrence.com" || password !== "admin123") {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const token = setUser({
      _id: "admin123",
      role: "admin",
      adminName: admin_name,
    });

    res.cookie("uid", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.json({
      success: true,
      message: "Admin logged in successfully",
    });

  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ success: false });
  }
}

// =========================
// ADMIN LOGOUT
// =========================
export function handleAdminLogout(req, res) {
  res.clearCookie("uid", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  return res.json({ success: true });
}
*/
import auth from "../service/auth.js";
const { setUser } = auth;

// TEMP ADMIN CONFIG (simple & safe)
const ADMINS = [
  // SUPER ADMIN
  {
    email: "pravahaeee@rgmcet.edu.in",
    password: "superpravaha123",
    role: "super",
    eventName: null,
  },

  // Coding Competition
  {
    email: "coding@rgmcet.edu.in",
    password: "coding123",
    role: "event",
    eventName: "Coding Competition",
  },

  // Graphite Elegance
  {
    email: "graphite@rgmcet.edu.in",
    password: "graphite123",
    role: "event",
    eventName: "Graphite Elegance",
  },

  // Instant Capture
  {
    email: "capture@rgmcet.edu.in",
    password: "capture123",
    role: "event",
    eventName: "Instant Capture",
  },

  // Treasure Hunt
  {
    email: "treasure@rgmcet.edu.in",
    password: "treasure123",
    role: "event",
    eventName: "Treasure Hunt",
  },

  // Photo Clue
  {
    email: "photoclue@rgmcet.edu.in",
    password: "photoclue123",
    role: "event",
    eventName: "Photo Clue",
  },

  // Quick Meme
  {
    email: "meme@rgmcet.edu.in",
    password: "meme123",
    role: "event",
    eventName: "Quick Meme",
  },
];

// =========================
// ADMIN LOGIN
// =========================
export async function handleAdminLogin(req, res) {
  const { admin_name, password } = req.body;

  const admin = ADMINS.find(
    (a) => a.email === admin_name.trim().toLowerCase() && a.password === password
  );

  if (!admin) {
    return res.status(401).json({ success: false });
  }

  const token = setUser({
    email: admin.email,
    role: admin.role,
    eventName: admin.eventName,
  });

  res.cookie("uid", token, {
    httpOnly: true,
    secure: true,        
    sameSite: "None",    
    path: "/",           
  });

  return res.json({ success: true });
}

// =========================
// ADMIN LOGOUT
// =========================
export function handleAdminLogout(req, res) {
  res.clearCookie("uid", {
    httpOnly: true,
    secure: true,        
    sameSite: "None",    
    path: "/",           
  });

  return res.json({ success: true });
}


export function handleAdminMe(req, res) {
  if (!req.admin) {
    return res.status(401).json({ success: false });
  }

  const { role, email, eventName } = req.admin;

  res.json({
    success: true,
    role,
    email,
    eventName,
  });
}

