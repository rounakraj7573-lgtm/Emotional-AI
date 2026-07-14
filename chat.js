export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  // body ko direct use karein agar wo pehle se JSON hai
  const { message } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });
    const data = await response.json();
    res.status(200).json({ reply: data.candidates[0].content.parts[0].text });
  } catch (e) {
    res.status(500).json({ reply: "AI se connect nahi ho paya." });
  }
}
