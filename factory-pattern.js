// --- Ürün sınıfları (Product classes) ---
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

// --- Factory (hangi sınıfı seçeceğini bilir) ---
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

// --- Kullanım (client code) ---
function sendNotification(type, to, message) {
  const notifier = NotificationFactory.create(type, to, message);
  console.log(notifier.send());
}

// Demo:
console.log("=== Factory Pattern Demo ===\n");

sendNotification("sms",   "+90 5xx xxx xx xx", "Kodunuz: 1234");
sendNotification("email", "kisi@example.com",  "Hoş geldiniz!");
sendNotification("push",  "user_42",           "Yeni mesajınız var.");

// Hata durumu testi
console.log("\n=== Hata Testi ===");
try {
  sendNotification("invalid", "test", "test message");
} catch (error) {
  console.log("Hata yakalandı:", error.message);
}
