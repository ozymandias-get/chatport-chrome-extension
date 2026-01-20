# 🌌 ChatPort - AI Teleporter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/)
[![Built With Vite](https://img.shields.io/badge/Built%20With-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **[🇹🇷 Türkçe README için tıklayın](./README.tr.md)**

**ChatPort** is a powerful Chrome extension that allows you to seamlessly **teleport your chat sessions** between different AI platforms like **ChatGPT**, **Gemini**, and **Claude**.

Don't lose your context when switching models. Carry your conversation history, persona, and ongoing tasks with you, instantly.

![ChatPort Preview](public/icons/icon128.png) *<!-- Replace with a real screenshot if available -->*

---

## ✨ Features

### 🚀 Seamless Teleportation
- Transfer active chat history from **ChatGPT**, **Gemini**, or **Claude** to any other supported platform.
- Moving from a "Creative" model to a "Logical" model? Take the whole context with you.

### 🧠 Smart Context Injection
- Automatically generates a **"System Prompt"** header that explains the context to the target AI.
- Ensures the target AI understands it's continuing a previous conversation.

### 🛡️ Smart Scraping & Ghost Filtering
- **SPA Awareness:** Intelligently filters out "ghost" messages from previous sessions that are hidden in the DOM (Single Page Application issues).
- **Gemini v4 Support:** Advanced selectors to correctly parse complex, multi-paragraph messages in Google Gemini's Angular-based DOM.

### ⚡ Productivity Tools
- **Auto-Send:** Option to automatically submit the teleported context upon arrival.
- **Selective Transfer:** Choose specific messages to transfer or teleport the entire session.

### 🎨 Premium Experience
- **Organic Glassmorphism Design:** A beautiful "Sand & Stone" aesthetic interface.
- **Multilingual:** Full support for **English** and **Turkish**, with dynamic prompt generation based on your selected language.

---

## 🌍 Supported Platforms

| Platform | Source (Read) | Target (Write) |
|----------|:-------------:|:--------------:|
| **ChatGPT** | ✅ | ✅ |
| **Gemini** | ✅ | ✅ |
| **Claude** | ✅ | ✅ |

---

## 🛠️ Installation

### For Developers (Build from Source)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/chatport-extension.git
    cd chatport-extension
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Build the Extension**
    ```bash
    npm run build
    ```

4.  **Load into Chrome**
    - Open `chrome://extensions/`
    - Enable **Developer mode** (top right toggle).
    - Click **"Load unpacked"**.
    - Select the `dist` folder generated in your project directory.

---

## 📖 Usage

1.  Open a chat on any supported platform (e.g., ChatGPT).
2.  Click the **ChatPort (C)** icon in your browser toolbar.
3.  Wait for the extension to analyze and capture the chat stream.
4.  Select the **Destination AI** (e.g., Gemini).
5.  Click **"TELEPORT"**.
6.  A new tab will open, and your conversation will be pasted and (optionally) sent automatically.

---

## ⚙️ Tech Stack

-   **Frontend:** React 18, TailwindCSS, Framer Motion
-   **Build Tool:** Vite + CRXJS (HMR support for extensions)
-   **Language:** TypeScript
-   **Architecture:** Manifest V3 (Service Workers)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
