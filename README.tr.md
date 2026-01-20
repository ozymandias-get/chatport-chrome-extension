# 🌌 ChatPort - AI Işınlayıcı

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![Built With Vite](https://img.shields.io/badge/Built%20With-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **[🇺🇸 Click here for English README](./README.md)**

**ChatPort**, sohbet oturumlarınızı **ChatGPT**, **Gemini** ve **Claude** gibi farklı yapay zeka platformları arasında **ışınlamanızı** sağlayan güçlü bir Chrome eklentisidir.

Model değiştirirken bağlamınızı kaybetmeyin. Sohbet geçmişinizi, oluşturduğunuz kişiliği (persona) ve devam eden görevlerinizi yanınızda taşıyın.

![ChatPort Önizleme](public/icons/icon128.png) *<!-- Ekran görüntüsü eklenebilir -->*

---

## ✨ Özellikler

### 🚀 Kesintisiz Işınlanma (Teleportation)
- Aktif sohbet geçmişini **ChatGPT**, **Gemini** veya **Claude**'dan alıp desteklenen diğer herhangi bir platforma aktarın.
- "Yaratıcı" bir modelden "Mantıksal" bir modele mi geçmek istiyorsunuz? Tüm bağlamı yanınıza alın.

### 🧠 Akıllı Bağlam Enjeksiyonu
- Hedef yapay zekaya durumu açıklayan özel bir **"Sistem İstemi" (System Prompt)** başlığı ekler.
- Hedef yapay zekanın, konuşmanın sıfırdan başlamadığını, bir devamlılık olduğunu anlamasını sağlar.

### 🛡️ Akıllı Tarama & Hayalet Filtreleme
- **SPA Farkındalığı:** Tek Sayfalı Uygulamalarda (SPA) DOM içinde gizli kalan eski sohbet kalıntılarını ("hayalet mesajları") akıllıca filtreler. Sadece gördüğünüzü kopyalar.
- **Gemini v4 Desteği:** Google Gemini'nin karmaşık, Angular tabanlı yapısındaki çok paragraflı mesajları doğru şekilde ayrıştıran gelişmiş seçicilere sahiptir.

### ⚡ Verimlilik Araçları
- **Otomatik Gönder (Auto-Send):** Işınlama sonrası mesajı otomatik olarak gönderme seçeneği.
- **Seçmeli Transfer:** İsterseniz tüm sohbeti, isterseniz sadece seçtiğiniz kritik mesajları aktarın.

### 🎨 Premium Deneyim
- **Organik Glassmorphism Tasarım:** "Kum ve Taş" ("Sand & Stone") temalı, estetik ve modern arayüz.
- **Çoklu Dil Desteği:** Tam **Türkçe** ve **İngilizce** desteği. Seçtiğiniz dile göre yapay zekaya verilen talimatlar da (prompt) o dilde oluşturulur.

---

## 🌍 Desteklenen Platformlar

| Platform | Kaynak (Okuma) | Hedef (Yazma) |
|----------|:-------------:|:--------------:|
| **ChatGPT** | ✅ | ✅ |
| **Gemini** | ✅ | ✅ |
| **Claude** | ✅ | ✅ |

---

## 🛠️ Kurulum

### Geliştiriciler İçin (Kaynak Koddan Derleme)

1.  **Depoyu klonlayın**
    ```bash
    git clone https://github.com/kullaniciadiniz/chatport-extension.git
    cd chatport-extension
    ```

2.  **Bağımlılıkları Yükleyin**
    ```bash
    npm install
    ```

3.  **Eklentiyi Derleyin**
    ```bash
    npm run build
    ```

4.  **Chrome'a Yükleyin**
    - Tarayıcıda `chrome://extensions/` adresine gidin.
    - Sağ üstteki **Geliştirici modu (Developer mode)** anahtarını açın.
    - **"Paketlenmemiş öğe yükle" (Load unpacked)** butonuna tıklayın.
    - Proje klasörünüzdeki oluşturulan `dist` klasörünü seçin.

---

## 📖 Kullanım

1.  Desteklenen herhangi bir platformda (örn. ChatGPT) bir sohbet açın.
2.  Tarayıcı araç çubuğundaki **ChatPort (C)** ikonuna tıklayın.
3.  Eklentinin sohbet akışını analiz etmesini bekleyin.
4.  **Hedef Yapay Zeka'yı (Destination)** seçin (örn. Gemini).
5.  **"IŞINLA" (TELEPORT)** butonuna basın.
6.  Yeni bir sekme açılacak ve sohbetiniz yapıştırılıp (ayara bağlı olarak) gönderilecektir.

---

## ⚙️ Teknoloji Yığını

-   **Frontend:** React 18, TailwindCSS, Framer Motion
-   **Build Tool:** Vite + CRXJS (HMR destekli)
-   **Dil:** TypeScript
-   **Mimari:** Manifest V3 (Service Workers)

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir Pull Request göndermekten çekinmeyin.

1.  Projeyi Fork'layın
2.  Özellik dalınızı oluşturun (`git checkout -b feature/HarikaOzellik`)
3.  Değişikliklerinizi commit'leyin (`git commit -m 'HarikaOzellik eklendi'`)
4.  Dalınıza Push yapın (`git push origin feature/HarikaOzellik`)
5.  Bir Pull Request açın

---

## 📄 Lisans

MIT Lisansı altında dağıtılmaktadır. Daha fazla bilgi için `LICENSE` dosyasına bakın.
