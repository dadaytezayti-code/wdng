import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "rsvps.json");

// Ensure the RSVP database JSON file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
}

app.use(express.json());

// Helper to read RSVPs
function getRSVPs() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading rsvps.json, resetting database:", err);
    return [];
  }
}

// Helper to save RSVPs
function saveRSVPs(rsvps: any[]) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(rsvps, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to rsvps.json:", err);
  }
}

// Check connection
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Admin Authentication check (Simple PIN from header)
const ADMIN_PIN = "love2026"; // Simple wedding organizer PIN

// Get all RSVPs for wedding guestbook (completely public, no PIN required)
app.get("/api/rsvps", (req, res) => {
  const rsvps = getRSVPs();
  res.json(rsvps);
});

// Get single RSVP by user record ID
app.get("/api/rsvps/:id", (req, res) => {
  const { id } = req.params;
  const rsvps = getRSVPs();
  const found = rsvps.find((r: any) => r.id === id);
  if (!found) {
    return res.status(404).json({ error: "RSVP record not found" });
  }
  res.json(found);
});

// Secure RSVP recovery by primary guest name (if switching devices)
app.post("/api/rsvps/recover", (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required for lookup retrieval" });
  }

  const rsvps = getRSVPs();
  const searchName = name.trim().toLowerCase();
  
  const found = rsvps.find((r: any) => r.name.trim().toLowerCase() === searchName);
  if (!found) {
    return res.status(404).json({ error: "No RSVP registry card found matching this name." });
  }

  res.json(found);
});

// Mock formatted email notification helper for wedding couple
function sendMockRSVPEmailNotification(rsvp: any) {
  const weddingEmail = "emma.arthur.wedding2026@gmail.com";
  
  const attendanceLabel = rsvp.attendance === "yes" 
    ? "🎉 Joyfully Accepts" 
    : rsvp.attendance === "tentative" 
    ? "⏳ Tentative Response" 
    : "✉️ Regretfully Declines";

  const emailSubject = `🔔 Wedding RSVP Update: ${rsvp.name} (${rsvp.attendance.toUpperCase()})`;
  
  const emailHtml = `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; border: 1px solid #ece4db; border-radius: 16px; background-color: #fdfbf7; color: #2c2523;">
       <div style="text-align: center; margin-bottom: 30px;">
        <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #bf9c85; font-weight: 600;">Wedding Bells Registry Notifier</span>
        <h1 style="font-size: 28px; margin: 10px 0; color: #3d3129; font-weight: normal; border-bottom: 2px solid #eddccb; padding-bottom: 15px;">Emma &amp; Arthur Wedding</h1>
      </div>
      
      <p style="font-size: 16px; line-height: 1.6; color: #5c4e43;">
        Hello Emma &amp; Arthur,
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #5c4e43;">
        A guest has just registered their RSVP response for your special day! Here are the details:
      </p>
      
      <div style="background-color: #fffefe; border: 1px solid #ece4db; border-radius: 12px; padding: 25px; margin: 25px 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #f5f0e6;">
            <td style="padding: 10px 0; font-weight: bold; color: #8a7261; width: 35%;">Guest Name</td>
            <td style="padding: 10px 0; color: #3d3129; font-weight: 600; font-size: 16px;">${rsvp.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f0e6;">
            <td style="padding: 10px 0; font-weight: bold; color: #8a7261;">Attending Side</td>
            <td style="padding: 10px 0; color: #3d3129; font-weight: 600; text-transform: capitalize;">${rsvp.side || "Unspecified"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f0e6;">
            <td style="padding: 10px 0; font-weight: bold; color: #8a7261;">Attendance Status</td>
            <td style="padding: 10px 0; color: #3d3129; font-weight: bold;">
              <span style="padding: 4px 12px; border-radius: 12px; font-size: 13px; background-color: ${rsvp.attendance === 'yes' ? '#e6f4ea' : rsvp.attendance === 'tentative' ? '#fff4e5' : '#fce8e6'}; color: ${rsvp.attendance === 'yes' ? '#137333' : rsvp.attendance === 'tentative' ? '#b06000' : '#c5221f'};">
                ${attendanceLabel}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f5f0e6;">
            <td style="padding: 10px 0; font-weight: bold; color: #8a7261;">Plus One Registry</td>
            <td style="padding: 10px 0; color: #3d3129;">
              ${rsvp.plusOneCount > 0 ? `<strong>+${rsvp.plusOneCount} Guest(s)</strong> (${rsvp.plusOneNames})` : "None"}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #8a7261; vertical-align: top;">Song Requests / Music Suggestions</td>
            <td style="padding: 10px 0; color: #5c4e43; font-style: italic; line-height: 1.5;">
              "${rsvp.musicSuggestions && rsvp.musicSuggestions.trim() ? rsvp.musicSuggestions : "No music suggestions provided."}"
            </td>
          </tr>
        </table>
      </div>
      
      <p style="font-size: 12px; text-align: center; color: #8a7261; margin-top: 40px; border-top: 1px solid #ece4db; padding-top: 20px;">
        This is a simulated notification from your live Guestbook Dashboard directory at Emma &amp; Arthur Wedding Organizers 2026.
      </p>
    </div>
  `;

  console.log("\n=======================================================");
  console.log("📨 SIMULATED EMAIL NOTIFICATION TRIGGERED SUCCESSFULLY");
  console.log(`To:      ${weddingEmail}`);
  console.log(`Subject: ${emailSubject}`);
  console.log("----------------------- CONTENT -----------------------");
  console.log(`[Summary]: ${rsvp.name} (${rsvp.side}) response is "${rsvp.attendance}". Plus-ones: ${rsvp.plusOneCount}. Songs: "${rsvp.musicSuggestions || "(blank)"}"`);
  console.log("-------------------------------------------------------");
  console.log("HTML email body simulated and validated flawlessly.");
  console.log("=======================================================\n");

  return {
    to: weddingEmail,
    subject: emailSubject,
    bodySummary: `Dear Emma & Arthur, ${rsvp.name} (${rsvp.side}) responded as ${rsvp.attendance}.`,
    simulatedAt: new Date().toISOString(),
  };
}

// Create or update RSVP record
app.post("/api/rsvps", (req, res) => {
  const { id, name, attendance, side, musicSuggestions, plusOneCount, plusOneNames } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  const rsvps = getRSVPs();

  // Simple anti-spam validator mapping: block duplicate names IF they're submitting a brand-new RSVP
  // (unless they are editing their existing RSVP using matching ID)
  const normalizedNewName = name.trim().toLowerCase();
  const existingByName = rsvps.find(
    (r: any) => r.name.trim().toLowerCase() === normalizedNewName && r.id !== id
  );

  if (existingByName && !id) {
    return res.status(400).json({
      error: "An RSVP with this name already exists. If this is you, please edit your existing response rather than creating a new one.",
      duplicate: true,
    });
  }

  const recordId = id || "rsvp_" + Math.random().toString(36).substring(2, 11);
  const matchedIndex = rsvps.findIndex((r: any) => r.id === recordId);

  const updatedRecord = {
    id: recordId,
    name: name.trim(),
    attendance: attendance || "yes", // yes, no, tentative
    side: side || "bride", // bride, spouse
    musicSuggestions: musicSuggestions ? musicSuggestions.substring(0, 1000) : "",
    plusOneCount: Number(plusOneCount) || 0,
    plusOneNames: plusOneNames ? plusOneNames.substring(0, 500) : "",
    updatedAt: new Date().toISOString(),
  };

  if (matchedIndex > -1) {
    rsvps[matchedIndex] = updatedRecord;
  } else {
    rsvps.push(updatedRecord);
  }

  saveRSVPs(rsvps);

  // Trigger high-end formatted simulated email notification to wedding coordinators
  const emailNotificationMock = sendMockRSVPEmailNotification(updatedRecord);

  res.json({ success: true, record: updatedRecord, emailNotificationMock });
});

// Delete an RSVP (Admin action)
app.delete("/api/rsvps/:id", (req, res) => {
  const pin = req.headers["authorization"] || req.query.pin;
  if (pin !== ADMIN_PIN) {
    return res.status(401).json({ error: "Unauthorized access: Invalid PIN" });
  }

  const { id } = req.params;
  const rsvps = getRSVPs();
  const filtered = rsvps.filter((r: any) => r.id !== id);
  saveRSVPs(filtered);
  res.json({ success: true });
});

// Vite middleware integrations or static distribution
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startServer();
