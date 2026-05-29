import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '20mb',
    },
  },
};
export default async function handler(req: any, res: any) {
  // Verificăm dacă metoda este POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metoda nu este permisă' });
  }

  // LOG DE CONTROL: Dacă vezi asta în terminal, înseamnă că API-ul funcționează
  console.log("--- Începe procesarea email-ului via GMAIL ---");

  try {
    const { 
      name, email, phone, address, 
      date, time, servings, flavor, 
      theme, cakeMessage, message, attachments 
    } = req.body;

    // 1. Configurare Nodemailer cu GMAIL
    // Folosim GMAIL_USER și GMAIL_PASS din fișierul .env
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS,
      },
    });

    // 2. Construirea email-ului
    const mailOptions = {
      from: `"Sweet Cakes Web" <${process.env.GMAIL_USER}>`,
      to: 'sweetcakesbygabriella@gmail.com', // email
      replyTo: email, // Dacă dai "Reply" la email, vei scrie direct clientului
      subject: `🍰 Comandă Nouă: ${name} (${date})`,
      html: `
        <div style="font-family: sans-serif; color: #2D2A26; line-height: 1.6; max-width: 600px; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
          <h2 style="color: #d14d72; text-align: center;">🧁 Detalii Cerere Nouă</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          
          <h3 style="color: #d14d72;">👤 Date Client</h3>
          <p><strong>Nume:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || 'Nespecificat'}</p>
          <p><strong>Adresă livrare:</strong> ${address || 'Ridicare personală'}</p>
          
          <h3 style="color: #d14d72;">🎂 Detalii Tort</h3>
          <p><strong>Data:</strong> ${date} | <strong>Ora:</strong> ${time || 'Nespecificată'}</p>
          <p><strong>Nr. Porții:</strong> ${servings || 'Nespecificat'}</p>
          <p><strong>Compoziție:</strong> ${flavor || 'Rămâne de stabilit'}</p>
          <p><strong>Tematică:</strong> ${theme || 'Nespecificată'}</p>
          
          <div style="background: #fff0f5; padding: 15px; border-radius: 10px; border-left: 5px solid #d14d72;">
            <p style="margin: 0;"><strong>Mesaj pe tort:</strong></p>
            <p style="font-style: italic; font-size: 18px; margin: 5px 0;">"${cakeMessage || '-'}"</p>
          </div>

          <h3 style="color: #d14d72;">📝 Mențiuni</h3>
          <p>${message || 'Fără alte mențiuni'}</p>
          
          <p style="font-size: 10px; color: #aaa; margin-top: 20px;">Trimis de pe site-ul Sweet Cakes</p>
        </div>
      `,
      // Atașamente (pozele urcate de client)
      attachments: attachments?.map((file: any) => ({
        filename: file.filename,
        content: file.content.split("base64,")[1],
        encoding: 'base64'
      })) || []
    };

    // 3. Trimiterea propriu-zisă
    await transporter.sendMail(mailOptions);

    console.log("✅ Email trimis cu succes către:", mailOptions.to);
    return res.status(200).json({ success: true });

  } catch (error: any) {
    console.error("❌ EROARE NODEMAILER:", error);
    return res.status(500).json({ error: "Eroare la server: " + error.message });
  }
}