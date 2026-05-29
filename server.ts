import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer"; // Am schimbat Resend cu Nodemailer
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // REPARĂ EROAREA "PayloadTooLarge": Mărim limita pentru poze la 50MB
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // --- RUTA API PENTRU GMAIL (NODEMAILER) ---
  app.post("/api/send-email", async (req, res) => {
    // Extragem TOATE câmpurile trimise de formularul tău
    const { 
      name, email, phone, address, 
      date, time, servings, flavor, 
      theme, cakeMessage, message, attachments 
    } = req.body;

    // Verificăm dacă avem datele de Gmail în .env
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error("LIPSĂ: GMAIL_USER sau GMAIL_PASS în .env");
      return res.status(500).json({ error: "Eroare configurare server (Gmail credentials missing)" });
    }

    // 1. Configurăm transportul prin Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS, // Parola de 16 caractere de la Google
      },
    });

    try {
      // 2. Construim email-ul
      const mailOptions = {
        from: `"Sweet Cakes Web" <${process.env.GMAIL_USER}>`,
        to: "meraalin45@gmail.com", // Adresa unde primești TU comenzile
        replyTo: email, // Ca să poți da reply direct clientului
        subject: `🍰 Cerere nouă tort: ${name} - ${date}`,
        html: `
          <div style="font-family: sans-serif; color: #2D2A26; line-height: 1.6; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
            <h2 style="color: #d14d72; text-align: center;">🧁 Detalii Comandă Nouă</h2>
            <hr />
            <p><strong>Client:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone || 'Nespecificat'}</p>
            <p><strong>Adresă:</strong> ${address || 'Ridicare personală'}</p>
            <hr />
            <p><strong>Data:</strong> ${date} | <strong>Ora:</strong> ${time || 'Nespecificată'}</p>
            <p><strong>Nr. Porții:</strong> ${servings || '-'}</p>
            <p><strong>Aromă:</strong> ${flavor || '-'}</p>
            <p><strong>Tematică:</strong> ${theme || '-'}</p>
            <div style="background: #fff0f5; padding: 10px; border-radius: 10px; margin: 10px 0;">
              <p><strong>Mesaj pe tort:</strong> "${cakeMessage || '-'}"</p>
            </div>
            <p><strong>Alte detalii:</strong> ${message || '-'}</p>
          </div>
        `,
        // ATAȘAMENTE (Pozele urcate de client)
        attachments: attachments?.map((file: any) => ({
          filename: file.filename,
          content: file.content.split("base64,")[1],
          encoding: 'base64'
        })) || []
      };

      // 3. Trimitem email-ul
      await transporter.sendMail(mailOptions);
      
      console.log("✅ Email trimis cu succes către meraalin45@gmail.com");
      res.status(200).json({ success: true });

    } catch (error) {
      console.error("Eroare Nodemailer:", error);
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