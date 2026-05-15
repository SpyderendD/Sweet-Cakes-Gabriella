import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Resend
  app.post("/api/send-email", async (req, res) => {
    const { name, email, date, servings, theme, message } = req.body;

    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing in environment variables");
      return res.status(500).json({ error: "Configuration error: Missing API Key" });
    }

    const resend = new Resend(resendApiKey);

    try {
      const { data, error } = await resend.emails.send({
        from: "Sweet Cakes by Gabriella <onboarding@resend.dev>", // Note: User needs to verify their domain to use a custom email
        to: ["meraalin45@gmail.com"], // Hardcoded for now as per user profile or common practice
        subject: `Cerere nouă tort: ${name}`,
        html: `
          <h1>Cerere Nouă Tort</h1>
          <p><strong>Nume:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Data Evenimentului:</strong> ${date}</p>
          <p><strong>Număr de porții:</strong> ${servings}</p>
          <p><strong>Tematică:</strong> ${theme}</p>
          <p><strong>Mesaj:</strong> ${message}</p>
        `,
      });

      if (error) {
        console.error("Resend API error:", error);
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json({ success: true, id: data?.id });
    } catch (error) {
      console.error("Resend error:", error);
      res.status(500).json({ error: "A apărut o eroare la trimiterea email-ului." });
    }
  });

  // Vite middleware for development
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
