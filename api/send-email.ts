import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, date, size, theme, message, attachments } = req.body;

    const data = await resend.emails.send({
      from: 'Sweet Cakes <onboarding@resend.dev>',
      to: ['meraalin45@gmail.com'], // Pune email-ul tău aici
      subject: `🍰 Cerere Nouă (cu poze): ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #2D2A26;">
          <h2>Ai o cerere nouă!</h2>
          <p><strong>Client:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Data:</strong> ${date}</p>
          <p><strong>Dimensiune:</strong> ${size}</p>
          <p><strong>Tematică:</strong> ${theme}</p>
          <p><strong>Mesaj:</strong> ${message}</p>
        </div>
      `,
      // Adăugăm atașamentele aici
      attachments: attachments.map((file: any) => ({
        content: file.content.split(',')[1], // Scoatem header-ul base64
        filename: file.filename,
      })),
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
}