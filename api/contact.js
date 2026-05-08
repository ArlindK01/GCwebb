const { Resend } = require('resend');

const toEmail = process.env.CONTACT_TO_EMAIL || 'info@kgtomtservice.se';
const fromEmail = process.env.CONTACT_FROM_EMAIL || 'KG Tomt & Fonsterservice <onboarding@resend.dev>';

function clean(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return clean(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  const { name, lastName, email, phone, interest, message } = req.body || {};
  const required = [name, lastName, email, phone, interest, message].every((value) => clean(value));

  if (!required) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fullName = `${clean(name)} ${clean(lastName)}`;
  const subject = `Offertforfragan - ${clean(interest)}`;
  const text = [
    'Ny forfragan fran hemsidan',
    '',
    `Namn: ${fullName}`,
    `E-post: ${clean(email)}`,
    `Telefon: ${clean(phone)}`,
    `Intresserad av: ${clean(interest)}`,
    '',
    'Meddelande:',
    clean(message),
  ].join('\n');

  const html = `
    <h2>Ny forfragan fran hemsidan</h2>
    <p><strong>Namn:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Intresserad av:</strong> ${escapeHtml(interest)}</p>
    <p><strong>Meddelande:</strong></p>
    <p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
  `;

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: clean(email),
    subject,
    text,
    html,
  });

  if (error) {
    console.error('Resend email error:', error);
    return res.status(400).json({
      error: error.message || 'Could not send email',
    });
  }

  return res.status(200).json({ ok: true });
};
