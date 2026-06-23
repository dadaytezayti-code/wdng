import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Memory store for RSVPs when Google Sheets Web App is not yet configured (Demo Mode)
let demoRsvps: any[] = [
  {
    id: "demo_1",
    name: "Jean Dupont",
    attendance: "yes",
    side: "bride",
    musicSuggestions: "Daft Punk - One More Time",
    plusOneCount: 1,
    updatedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString()
  },
  {
    id: "demo_2",
    name: "Alice Martin",
    attendance: "tentative",
    side: "spouse",
    musicSuggestions: "ABBA - Dancing Queen",
    plusOneCount: 0,
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

// Check connection
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Sheet configuration checker
app.get("/api/sheets-config", (req, res) => {
  res.json({
    configured: !!process.env.GOOGLE_SHEETS_WEBAPP_URL,
    url: process.env.GOOGLE_SHEETS_WEBAPP_URL ? "configured" : null
  });
});

// Admin Authentication check (Simple PIN from header)
const ADMIN_PIN = "love2026"; // Simple wedding organizer PIN

// Get all RSVPs for wedding guestbook
app.get("/api/rsvps", async (req, res) => {
  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  if (webappUrl) {
    try {
      const response = await fetch(webappUrl);
      if (!response.ok) {
        throw new Error(`Google Sheets proxy returned status ${response.status}`);
      }
      const data = await response.json();
      return res.json(data);
    } catch (err: any) {
      console.error("Error fetching rows from Google Sheets Web App:", err);
      return res.status(502).json({ error: "Failed to fetch RSVP entries from Google Sheets: " + err.message });
    }
  } else {
    // Return sample/demo memory listings
    return res.json(demoRsvps);
  }
});

// Get single RSVP by user record ID
app.get("/api/rsvps/:id", async (req, res) => {
  const { id } = req.params;
  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  
  if (webappUrl) {
    try {
      const response = await fetch(webappUrl);
      if (response.ok) {
        const rsvps: any[] = await response.json();
        const found = rsvps.find((r: any) => r.id === id);
        if (found) {
          return res.json(found);
        }
      }
    } catch (err) {
      console.error("Error fetching single RSVP:", err);
    }
    return res.status(404).json({ error: "RSVP record not found" });
  } else {
    const found = demoRsvps.find((r: any) => r.id === id);
    if (!found) {
      return res.status(404).json({ error: "RSVP record not found" });
    }
    return res.json(found);
  }
});

// Secure RSVP recovery by primary guest name
app.post("/api/rsvps/recover", async (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required for lookup retrieval" });
  }

  const searchName = name.trim().toLowerCase();
  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

  if (webappUrl) {
    try {
      const response = await fetch(webappUrl);
      if (response.ok) {
        const rsvps: any[] = await response.json();
        const found = rsvps.find((r: any) => r.name.trim().toLowerCase() === searchName);
        if (found) {
          return res.json(found);
        }
      }
    } catch (err) {
      console.error("Error during recovery:", err);
    }
    return res.status(404).json({ error: "No RSVP registry card found matching this name in Google Sheets." });
  } else {
    const found = demoRsvps.find((r: any) => r.name.trim().toLowerCase() === searchName);
    if (!found) {
      return res.status(404).json({ error: "No RSVP registry card found matching this name." });
    }
    return res.json(found);
  }
});

// Mock formatted email notification helper for wedding couple (to log in console for confirmation)
function sendMockRSVPEmailNotification(rsvp: any, isGoogleSheets: boolean) {
  const weddingEmail = "emma.arthur.wedding2026@gmail.com";
  const attendanceLabel = rsvp.attendance === "yes" 
    ? "🎉 Joyfully Accepts" 
    : rsvp.attendance === "tentative" 
    ? "⏳ Tentative Response" 
    : "✉️ Regretfully Declines";

  const emailSubject = `🔔 Wedding RSVP Update via ${isGoogleSheets ? "Google Sheets" : "Demo"}: ${rsvp.name}`;

  console.log("\n=======================================================");
  console.log("📨 SIMULATED REAL-TIME NOTIFICATION DISPATCHED");
  console.log(`To:      ${weddingEmail}`);
  console.log(`Subject: ${emailSubject}`);
  console.log(`Payload: ${rsvp.name} (${rsvp.side}) responded: ${rsvp.attendance}, Plus-ones: ${rsvp.plusOneCount}`);
  console.log("=======================================================\n");

  return {
    to: weddingEmail,
    subject: emailSubject,
    bodySummary: `Dear Emma & Arthur, ${rsvp.name} (${rsvp.side}) responded as ${rsvp.attendance}. Recipient is Google Sheets.`,
    simulatedAt: new Date().toISOString(),
  };
}

// Create or update RSVP record
app.post("/api/rsvps", async (req, res) => {
  const { id, name, attendance, side, musicSuggestions, plusOneCount, arrivalLocations } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required" });
  }

  const recordId = id || "rsvp_" + Math.random().toString(36).substring(2, 11);
  const updatedRecord = {
    id: recordId,
    name: name.trim(),
    attendance: attendance || "yes",
    side: side || "bride",
    musicSuggestions: musicSuggestions ? musicSuggestions.substring(0, 1000) : "",
    plusOneCount: Number(plusOneCount) || 0,
    arrivalLocations: Array.isArray(arrivalLocations) ? arrivalLocations : [],
    updatedAt: new Date().toISOString(),
  };

  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

  // Let's generate simulation logging
  const emailNotificationMock = sendMockRSVPEmailNotification(updatedRecord, !!webappUrl);

  if (webappUrl) {
    try {
      const response = await fetch(webappUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecord)
      });
      
      const resText = await response.text();
      let resJson: any = {};
      try {
        resJson = JSON.parse(resText);
      } catch (e) {
        resJson = { status: "success", info: resText };
      }

      if (resJson.status === "error") {
        return res.status(500).json({ error: "Google Sheets script error: " + resJson.error });
      }

      return res.json({
        success: true,
        method: "google_sheets",
        record: updatedRecord,
        emailNotificationMock
      });
    } catch (err: any) {
      console.error("Error forwarding post to Google Sheets Web App:", err);
      return res.status(502).json({ error: "Failed to store RSVP to Google Sheets. Check script URL or network." });
    }
  } else {
    // Demo InMemory updates
    const matchedIndex = demoRsvps.findIndex((r: any) => r.id === recordId || r.name.toLowerCase() === name.trim().toLowerCase());
    if (matchedIndex > -1) {
      demoRsvps[matchedIndex] = { ...demoRsvps[matchedIndex], ...updatedRecord };
    } else {
      demoRsvps.push(updatedRecord);
    }

    return res.json({
      success: true,
      method: "demo",
      record: updatedRecord,
      emailNotificationMock,
      demoNotice: true
    });
  }
});

// Delete an RSVP (Admin Action - handled on client or in memory/sheets)
app.delete("/api/rsvps/:id", async (req, res) => {
  const pin = req.headers["authorization"] || req.query.pin;
  if (pin !== ADMIN_PIN) {
    return res.status(401).json({ error: "Unauthorized access: Invalid PIN" });
  }

  const { id } = req.params;
  const webappUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;

  if (webappUrl) {
    return res.status(501).json({ error: "Admin delete actions must be done directly from your connected Google Spreadsheet!" });
  } else {
    demoRsvps = demoRsvps.filter((r: any) => r.id !== id);
    return res.json({ success: true, method: "demo" });
  }
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
