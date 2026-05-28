// Vercel serverless function: POST /api/auth
// Environment variable: ADMIN_PASSWORD (set in Vercel dashboard)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { password } = req.body;
  const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === correctPassword) {
    const token = Buffer.from(correctPassword + ':' + Date.now()).toString('base64');
    return res.status(200).json({ ok: true, token: token });
  }

  return res.status(401).json({ ok: false, error: 'Wrong password' });
}
