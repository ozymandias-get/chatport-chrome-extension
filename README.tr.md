<div align="center">
  <img src="public/icons/icon128.png" alt="ChatPort Logo" width="80" height="80" />
  <h1>ChatPort - AI Teleporter</h1>

  <p>
    <strong>Büyük Dil Modelleri Arasında Kesintisiz Köprü</strong>
  </p>

  <p>
    <a href="./README.tr.md">🇹🇷 Türkçe Dokümantasyon</a> |
    <a href="./README.md">🇺🇸 English Documentation</a>
  </p>

  <p>
    <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/Lisans-MIT-yellow.svg" alt="License: MIT" />
    </a>
    <a href="https://developer.chrome.com/docs/extensions/mv3/">
      <img src="https://img.shields.io/badge/Chrome_Eklentisi-Manifest_V3-4285F4?logo=google-chrome&logoColor=white" alt="Chrome Extension" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://reactjs.org/">
      <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React" />
    </a>
  </p>
</div>

---

## 🌌 Genel Bakış

**ChatPort**, birden fazla Yapay Zeka modeliyle (LLM) çalışan profesyonel kullanıcılar, geliştiriciler ve araştırmacılar için tasarlanmış gelişmiş bir Chrome eklentisidir. **ChatGPT**, **Gemini** ve **Claude** arasındaki duvarları yıkarak, aktif sohbet oturumlarınızı **anında başka bir platforma ışınlamanızı** sağlar.

Manuel kopyala-yapıştır yapmaktan kurtulun. Bağlamı kaybetmeyin. ChatPort, sohbet geçmişinizi akıllıca tarar, formatlar ve yeni modele "kişiliğini" ve "hafızasını" koruyarak enjekte eder.

---

## ✨ Temel Özellikler

### 🚀 Kesintisiz Işınlanma (Her Yöne)
Çalışma alanınızı dilediğiniz platforma taşıyın.
*   **ChatGPT** ↔ **Gemini** ↔ **Claude**
*   **Sınırsız Özgürlük:** Gemini'de araştırmaya başlayın, kod yazmak için Claude'a geçin ve dokümantasyon için ChatGPT'de bitirin.

### 🧠 Akıllı Bağlam Enjeksiyonu
ChatPort sadece metni yapıştırmaz; bağlamı yeniden inşa eder.
*   **Sistem İstemi (System Prompt):** Aktarılan sohbete otomatik olarak bir "Üst Bilgi" ekler. Bu sayede hedef yapay zeka, konuşmanın sıfırdan başlamadığını, devam eden bir süreç olduğunu anlar.
*   **Persona Koruma:** Orijinal sohbette belirlediğiniz kuralların ve tonun (persona) hedef modelde de devam etmesini sağlar.

### 🛡️ Gelişmiş Tarama Motoru
Modern Tek Sayfalı Uygulamaların (SPA) karmaşıklığı için özel olarak üretildi.
*   **Hayalet Mesaj Filtresi (Ghost Filtering):** Sayfa geçişlerinde DOM'da gizli kalan eski mesajları (`isVisible` kontrolü ile) eler. Sadece o an gördüğünüz taze veriyi transfer eder.
*   **Gemini v4 Desteği:** Google Gemini'nin en son Angular/Shadow DOM yapısına tam uyumludur. Standart araçların kaçırdığı çok paragraflı veya iç içe geçmiş kullanıcı sorgularını eksiksiz yakalar.

### ⚡ Verimlilik ve Kullanıcı Deneyimi
*   **Otomatik Gönder (Auto-Send):** Işınlama tamamlandığında mesajı otomatik olarak gönderme seçeneği.
*   **Seçmeli Transfer:** Sohbetin tamamını değil, sadece istediğiniz kısmını taşıma imkanı.
*   **Organik Glassmorphism Arayüz:** "Kum ve Taş" (Sand & Stone) temalı, göz yormayan, modern ve şık tasarım.

---

## 🏗️ Mimari ve Teknoloji

ChatPort, Chrome'un güvenlik standartlarına tam uyumlu **Manifest V3** üzerinde inşa edilmiştir.

*   **Content Scripts:** Yapay zeka sekmelerine enjekte edilerek DOM elementlerini cerrahi hassasiyetle okur.
*   **Background Service Worker:** "Işınlanma" lojiğini yönetir, sekmeler arası güvenli mesajlaşmayı ve veri taşımayı sağlar.
*   **Güvenlik:** Hiçbir veri dış sunucuya gönderilmez. Tüm işlemler tarayıcınızın yerel belleğinde gerçekleşir.

---

## 🚀 Kurulum ve Kullanım

### Seçenek 1: Hızlı Kurulum (Önerilen)
1.  **[Releases](../../releases)** kısmından `ChatPort-v1.0.zip` dosyasını indirin.
2.  Zip dosyasını bir klasöre çıkartın.
3.  Chrome'da `chrome://extensions/` adresine gidin.
4.  Sağ üstteki **Geliştirici modu (Developer mode)** anahtarını açın.
5.  **Paketlenmemiş öğe yükle (Load unpacked)** butonuna basın ve klasörü seçin.

### Seçenek 2: Kaynak Koddan Derleme
Projeye katkıda bulunmak isteyen geliştiriciler için.

```bash
# 1. Depoyu klonlayın
git clone https://github.com/ozymandias-get/chatport-chrome-extension.git

# 2. Bağımlılıkları yükleyin
npm install

# 3. Projeyi derleyin
npm run build
# 'dist' klasörü oluşacaktır.
```

### Kullanım Senaryosu
1.  **Sohbeti Açın:** ChatGPT, Gemini veya Claude üzerinde bir konuşma başlatın veya açın.
2.  **ChatPort'u Açın:** Tarayıcıdaki eklenti ikonuna tıklayın.
3.  **Analiz:** Eklenti kaç mesajın aktarılacağını size gösterir.
4.  **Hedef Seçin:** Gitmek istediğiniz Yapay Zekayı seçin (örn. "Gemini").
5.  **Işınlayın:** Butona basın. Yeni sekme açılır ve sohbetiniz kaldığı yerden devam eder.

---

## ❓ Sıkça Sorulan Sorular (SSS)

**S: ChatPort verilerimi kaydeder mi?**
C: **Hayır.** ChatPort tamamen cihazınızda (yerel) çalışır. Sohbet verileriniz hiçbir sunucuya gönderilmez veya saklanmaz.

**S: Neden "Tüm verilere erişim" izni istiyor?**
C: Eklenti, sadece desteklenen siteler (`chatgpt.com`, `gemini.google.com`, `claude.ai`) üzerinde çalışır. "Tüm veriler" uyarısı, Chrome'un o sayfadaki metni (sohbetinizi) okuyabilmemiz için gösterdiği standart bir izindir. Diğer sitelere erişmez.

---

## 🤝 Katkıda Bulunma

Açık kaynağa destek veriyoruz! Katkıda bulunmak isterseniz:
1.  Repoyu Fork'layın.
2.  Yeni bir özellik dalı (branch) oluşturun.
3.  Değişikliklerinizi gönderin (Push).
4.  Bir Pull Request (PR) açın.

---

## 📄 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakabilirsiniz.

<div align="center">
  <sub>ChatPort Ekibi tarafından ❤️ ile tasarlandı</sub>
</div>
