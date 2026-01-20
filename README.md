<div align="center">
  <img src="public/icons/icon128.png" alt="ChatPort Logo" width="80" height="80" />
  <h1>ChatPort - AI Teleporter</h1>

  <p>
    <strong>The Ultimate Bridge Between Large Language Models</strong>
  </p>

  <p>
    <a href="./README.tr.md">🇹🇷 Türkçe Dokümantasyon</a> |
    <a href="./README.md">🇺🇸 English Documentation</a>
  </p>

  <p>
    <a href="https://opensource.org/licenses/MIT">
      <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" />
    </a>
    <a href="https://developer.chrome.com/docs/extensions/mv3/">
      <img src="https://img.shields.io/badge/Chrome-Extension-Manifest_V3-4285F4?logo=google-chrome&logoColor=white" alt="Chrome Extension" />
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white" alt="TypeScript" />
    </a>
    <a href="https://reactjs.org/">
      <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React" />
    </a>
    <a href="https://vitejs.dev/">
      <img src="https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white" alt="Vite" />
    </a>
  </p>
</div>

---

## 🌌 Overview

**ChatPort** is a cutting-edge Chrome extension designed for power users, developers, and AI enthusiasts who work with multiple Large Language Models (LLMs). It solves the fragmentation problem by allowing you to **teleport your active chat sessions** instantly between **ChatGPT**, **Gemini**, and **Claude**.

Stop manual copy-pasting. Stop losing context. ChatPort intelligently scrapes, formats, and injects your conversation history into a new model, preserving the persona and state of your workflow.

---

## ✨ Key Features

### 🚀 Seamless Teleportation (All-to-All)
Transfer your workspace to any supported platform instantly.
*   **ChatGPT** ↔ **Gemini** ↔ **Claude**
*   Full bi-directional support. Start in Gemini, move to Claude for coding, finish in ChatGPT for documentation.

### 🧠 Intelligent Context Injection
ChatPort doesn't just paste text; it reconstructs the context.
*   **System Prompt Generation:** Automatically prefixes the transferred chat with a system instruction, informing the target AI that it is continuing an existing conversation.
*   **Persona Preservation:** Ensures the target AI adheres to the rules and tone established in the original chat.

### 🛡️ Advanced Scraping Engine
Built to handle the complexity of modern Single Page Applications (SPAs).
*   **Ghost Message Filtering:** Uses an `isVisible` heuristic to ignore hidden DOM elements, ensuring you don't transfer old or deleted messages from the browser's memory.
*   **Gemini v4 Support:** Validated against Google Gemini's latest Angular/Shadow DOM updates. Correctly parses multi-paragraph and nested user queries that standard scrapers miss.

### ⚡ Productivity & UX
*   **Auto-Send Integration:** Optionally submit the teleported context immediately upon page load.
*   **Selective Transfer:** Choose specifically which parts of the conversation to move.
*   **Organic Glassmorphism UI:** A premium "Sand & Stone" aesthetic that feels native yet distinct.

---

## 🏗️ Architecture

ChatPort is built on **Manifest V3**, ensuring long-term compatibility with Chrome's security standards.

*   **Content Scripts:** Injected into AI tabs to safely scrape DOM elements using highly specific selectors.
*   **Background Service Worker:** Orchestrates the "Teleportation" logic, handling tab creation and secure message passing.
*   **Storage API:** Persists user preferences (like Auto-Send) and temporary chat buffers locally.

---

## 🚀 Installation & Usage

### Option 1: Quick Install (Recommended)
1.  Download `ChatPort-v1.0.zip` from the **[Releases](../../releases)** section.
2.  Extract the zip file to a folder.
3.  Open Chrome and navigate to `chrome://extensions/`.
4.  Toggle **Developer mode** (top right).
5.  Click **Load unpacked** and select the extracted folder.

### Option 2: Build from Source
Perfect for developers who want to contribute.

```bash
# 1. Clone the repository
git clone https://github.com/ozymandias-get/chatport-chrome-extension.git

# 2. Install dependencies
npm install

# 3. Build the project
npm run build
# The 'dist' folder will be generated.
```

### Usage Workflow
1.  **Open an AI Chat:** Navigate to ChatGPT, Gemini, or Claude.
2.  **Activate ChatPort:** Click the extension icon (or press the shortcut).
3.  **Analyze:** The popup will show the number of messages detected.
4.  **Select Destination:** Choose where you want to go (e.g., "Gemini").
5.  **Teleport:** Click the button. A new tab opens with your context pre-filled.

---

## ❓ FAQ

**Q: Does ChatPort save my data?**
A: **No.** ChatPort functions entirely locally within your browser. No chat data is ever sent to an external server.

**Q: Why does it need "Access to all data" on AI sites?**
A: The extension requires permission to read the DOM of `chatgpt.com`, `gemini.google.com`, and `claude.ai` to scrape the text you want to transfer. It does not access any other sites.

---

## 🤝 Contributing

We welcome contributions!
1.  Fork the repo.
2.  Create a feature branch (`git checkout -b feature/NewMagic`).
3.  Commit your changes.
4.  Push to the branch and open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <sub>Designed & Built by the ChatPort Team</sub>
</div>
