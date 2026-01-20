// Background Script - The Orchestrator
console.log('ChatPort: Background Service Worker Ready');

// types
type Message = {
    id: string;
    sender: 'user' | 'ai';
    text: string;
};

type TeleportRequest = {
    action: 'TELEPORT';
    target: string;
    messages: Message[];
    sourceAI: string;
    settings: {
        language: 'tr' | 'en';
        autoSend: boolean;
    }
}

// Listen for messages from Popup
chrome.runtime.onMessage.addListener((request: TeleportRequest, _sender, sendResponse) => {
    if (request.action === 'TELEPORT') {
        handleTeleportation(request);
        sendResponse({ status: 'started' });
    }
});

async function handleTeleportation(req: TeleportRequest) {
    const { target, messages, sourceAI = 'AI Assistant', settings } = req;
    let targetUrl = '';

    if (target === 'Gemini') {
        targetUrl = 'https://gemini.google.com/app';
    } else if (target === 'Claude') {
        targetUrl = 'https://claude.ai/new';
    } else {
        targetUrl = 'https://chatgpt.com/';
    }

    // --- Prompt Engineering (Multilingual) ---
    let HEADER = '';

    if (settings && settings.language === 'en') {
        HEADER = `Hello, I am coming from the ${sourceAI} AI. Our conversation was left off there, or I want to move the context here. Below is the transcript of the past conversation. Please read and understand this context and be ready to continue where we left off.\n\n`;
    } else {
        // Default TR
        HEADER = `Merhabalar, ben ${sourceAI} yapay zekasından geliyorum. Konuşmamız orada yarım kaldı veya bağlamı buraya taşımak istiyorum. Aşağıda geçmiş konuşma dökümümüz var. Lütfen bu bağlamı okuyup anla ve kaldığım yerden devam etmeye hazır ol.\n\n`;
    }

    const formattedChat = messages.map(m => {
        let sender = '';
        if (settings && settings.language === 'en') {
            sender = m.sender === 'user' ? 'User' : sourceAI;
        } else {
            sender = m.sender === 'user' ? 'Kullanıcı' : sourceAI;
        }
        return `${sender}: "${m.text}"`;
    }).join('\n\n');

    const FULL_PROMPT = HEADER + formattedChat;

    // 1. Create the Tab
    const tab = await chrome.tabs.create({ url: targetUrl, active: true });

    // 2. Wait and Inject
    if (tab.id) {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (tabId === tab.id && info.status === 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);

                // 3. Inject the payload
                setTimeout(() => {
                    chrome.tabs.sendMessage(tabId, {
                        action: 'PASTE_MESSAGES',
                        payload: FULL_PROMPT,
                        autoSend: settings ? settings.autoSend : false
                    }, (response) => {
                        console.log('Teleport result:', response);
                    });
                }, 2500);
            }
        });
    }
}
