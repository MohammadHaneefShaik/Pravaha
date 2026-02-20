import auth from "../service/auth.js";
const { getUser } = auth;

export default function adminAuth(req, res, next) {
  const token = req.cookies?.uid;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  const admin = getUser(token);

  console.log("TOKEN:", token);
  console.log("ADMIN:", admin);

  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  req.admin = admin; // 🔥 role + eventName
  next();
}
