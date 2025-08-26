# 🏭 Factory Pattern Demo - Web Uygulaması

Modern bir web uygulaması olarak tasarlanmış Factory Pattern örneği. Bildirim sistemi üzerinden tasarım deseninin nasıl çalıştığını gösterir.

## ✨ Özellikler

- 🎨 **Modern UI/UX**: Responsive ve güzel tasarım
- 📱 **Gerçek Zamanlı**: Anlık bildirim sonuçları
- 🔧 **Factory Pattern**: Tasarım deseni örneği
- 🌐 **API Endpoints**: RESTful API
- 📊 **Sonuç Geçmişi**: Gönderilen bildirimlerin kaydı
- 🎯 **Hata Yönetimi**: Kullanıcı dostu hata mesajları

## 🚀 Hızlı Başlangıç

### Yerel Geliştirme

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Uygulamayı başlatın:**
```bash
npm run dev
```

3. **Tarayıcıda açın:**
```
http://localhost:3000
```

### Production

```bash
npm start
```

## 📁 Proje Yapısı

```
factory-pattern-demo/
├── server.js              # Express sunucu
├── package.json           # Proje bağımlılıkları
├── vercel.json           # Vercel deployment config
├── public/               # Statik dosyalar
│   ├── index.html        # Ana sayfa
│   ├── styles.css        # CSS stilleri
│   └── script.js         # Frontend JavaScript
└── README.md             # Bu dosya
```

## 🏗️ Factory Pattern Yapısı

### Ürün Sınıfları (Product Classes)
- `SMSNotification`: SMS bildirimleri
- `EmailNotification`: Email bildirimleri  
- `PushNotification`: Push bildirimleri

### Factory Sınıfı
- `NotificationFactory`: Hangi sınıfın oluşturulacağını belirler

### API Endpoints
- `GET /api/notification-types`: Desteklenen bildirim tipleri
- `POST /api/send-notification`: Bildirim gönderme

## 🌐 Deployment

### Vercel'de Yayınlama

1. **Vercel CLI ile:**
```bash
npm i -g vercel
vercel
```

2. **GitHub ile:**
- Projeyi GitHub'a push edin
- Vercel'de yeni proje oluşturun
- GitHub repository'nizi bağlayın

### Diğer Platformlar

- **Heroku**: `heroku create && git push heroku main`
- **Railway**: Railway dashboard'dan deploy edin
- **DigitalOcean App Platform**: App spec dosyası ile

## 🎯 Kullanım

1. **Bildirim Tipi Seçin**: SMS, Email veya Push
2. **Alıcı Bilgisi Girin**: Telefon, email veya kullanıcı ID
3. **Mesaj Yazın**: Göndermek istediğiniz mesajı yazın
4. **Gönder**: Butona tıklayarak bildirimi gönderin

## 🔧 Teknolojiler

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Deployment**: Vercel
- **Styling**: Custom CSS, Font Awesome, Google Fonts

## 📊 Factory Pattern Avantajları

✅ **Esneklik**: Yeni bildirim tipleri kolayca eklenebilir  
✅ **Kapsülleme**: Nesne oluşturma mantığı tek yerde  
✅ **Genişletilebilirlik**: Mevcut kodu değiştirmeden yeni tipler  
✅ **Test Edilebilirlik**: Her sınıf ayrı ayrı test edilebilir  
✅ **Bakım Kolaylığı**: Merkezi yönetim  

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorularınız için issue açabilir veya pull request gönderebilirsiniz.

---

**Factory Pattern Demo** - Node.js & Express ile modern web uygulaması 🚀
