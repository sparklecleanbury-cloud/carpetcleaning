const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/bookings', async (req, res) => {
  try {
    const { name, email, phone, service, date, message } = req.body;

    if (!name || !email || !phone || !service || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const text = `✨ *NEW CARPET CLEANING CLIENT* ✨\n\n━━━━━━━━━━━━━━━━━━━━━━━\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📞 *Phone:* ${phone}\n\n🛠️ *Service:* ${service}\n📅 *Date:* ${date}${message ? `\n\n💬 *Notes:*\n${message}` : ''}\n━━━━━━━━━━━━━━━━━━━━━━━`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!telegramResponse.ok) {
      console.error('Telegram error:', await telegramResponse.text());
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    res.status(201).json({ success: true, message: 'Booking submitted!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Telegram Booking API Running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
