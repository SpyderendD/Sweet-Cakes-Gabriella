import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, date, size, theme, message } = req.body;

    const data = await resend.emails.send({
      from: 'Sweet Cakes <onboarding@resend.dev>', // Verifică domeniul pe resend.com ulterior
      to: ['adresa-ta-de-email@gmail.com'], // <--- SCHIMBĂ CU EMAIL-UL TĂU REAL
      subject: `🍰 Comandă Nouă: ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #2D2A26;">
          <h2>Ai o cerere nouă de tort!</h2>
          <p><strong>Client:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Data:</strong> ${date}</p>
          <p><strong>Dimensiune:</strong> ${size}</p>
          <p><strong>Tematică:</strong> ${theme}</p>
          <p><strong>Mesaj:</strong> ${message}</p>
        </div>
      `,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error });
  }
}