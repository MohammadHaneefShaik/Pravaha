export default function handler(req, res) {

  // ✅ CORS HEADERS (MANDATORY)
  res.setHeader("Access-Control-Allow-Origin", "https://concurrence.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle browser preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 🔐 TEMP: disable auth to test CORS
  res.status(200).json({
    message: "CORS fixed, endpoint reachable ✅"
  });
}
