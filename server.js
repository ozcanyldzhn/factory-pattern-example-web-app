const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// --- Factory Pattern Classes ---
class SMSNotification {
  constructor(to, message) {
    this.to = to;
    this.message = message;
  }
  send() {
    return `SMS -> ${this.to}: ${this.message}`;
  }
}

class EmailNotification {
  constructor(to, message) {
    this.to = to;
    this.message = message;
  }
  send() {
    return `EMAIL -> ${this.to}: ${this.message}`;
  }
}

class PushNotification {
  constructor(to, message) {
    this.to = to;
    this.message = message;
  }
  send() {
    return `PUSH -> ${this.to}: ${this.message}`;
  }
}

class NotificationFactory {
  static create(type, to, message) {
    switch ((type || "").toLowerCase()) {
      case "sms":
        return new SMSNotification(to, message);
      case "email":
        return new EmailNotification(to, message);
      case "push":
        return new PushNotification(to, message);
      default:
        throw new Error(`Desteklenmeyen bildirim tipi: ${type}`);
    }
  }
}

// API Routes
app.get('/api/notification-types', (req, res) => {
  res.json({
    types: [
      { value: 'sms', label: 'SMS', icon: '📱' },
      { value: 'email', label: 'Email', icon: '📧' },
      { value: 'push', label: 'Push Notification', icon: '🔔' }
    ]
  });
});

app.post('/api/send-notification', (req, res) => {
  try {
    const { type, to, message } = req.body;
    
    if (!type || !to || !message) {
      return res.status(400).json({
        success: false,
        error: 'Tüm alanlar gereklidir: type, to, message'
      });
    }

    const notifier = NotificationFactory.create(type, to, message);
    const result = notifier.send();
    
    res.json({
      success: true,
      result: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Factory Pattern Demo Web App`);
});
