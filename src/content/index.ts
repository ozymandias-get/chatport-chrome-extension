// Content Script - The Spy
console.log('ChatPort: Content Script Injected');

type Message = {
    id: string;
    sender: 'user' | 'ai';
    text: string;
};

// --- Scraping Logic ---
// --- Scraping Logic ---
function scrapeMessages(): { source: string, messages: Message[] } {
    const url = window.location.hostname;
    // Ensure we start fresh
    const messages: Message[] = [];
    let source = 'Unknown AI';

    // Helper: Check if element is visible to avoids scraping hidden ghost elements from SPA navigation
    const isVisible = (elem: Element) => {
        if (!(elem instanceof HTMLElement)) return true; // Non-HTML elements pass
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    };

    if (url.includes('chatgpt.com')) {
        source = 'ChatGPT';
        const turns = document.querySelectorAll('[data-message-author-role]');
        turns.forEach((turn, index) => {
            if (!isVisible(turn)) return; // Skip hidden
            const role = turn.getAttribute('data-message-author-role');
            const textDiv = turn.querySelector('.markdown') || turn.querySelector('.whitespace-pre-wrap');
            if (textDiv && textDiv.textContent) {
                messages.push({
                    id: `gpt-${index}`,
                    sender: role === 'user' ? 'user' : 'ai',
                    text: textDiv.textContent.trim()
                });
            }
        });
    } else if (url.includes('gemini.google.com')) {
        source = 'Gemini';
        // Improved Gemini Selectors v4 (Based on Shadow DOM / Angular structures)
        // We target the specific text containers identified in user feedback: .query-text and .model-response

        const nodes = document.querySelectorAll('.query-text, .model-response, model-response');

        nodes.forEach((node, index) => {
            if (!isVisible(node)) return; // Skip hidden
            // USER: .query-text
            if (node.classList.contains('query-text')) {
                // This container has multiple <p class="query-text-line"> children
                const lines = node.querySelectorAll('.query-text-line');
                let fullText = '';

                if (lines.length > 0) {
                    fullText = Array.from(lines)
                        .map(line => line.textContent?.trim())
                        .filter(Boolean)
                        .join('\n\n');
                } else {
                    // Fallback if no lines classes found
                    fullText = node.textContent?.trim() || '';
                }

                if (fullText) {
                    messages.push({
                        id: `gem-u-${index}`,
                        sender: 'user',
                        text: fullText
                    });
                }
            }
            // AI: .model-response
            else {
                // It's a model response.
                // We want the message-content inside it.
                // Depending on structure, it might be <message-content> or just text.
                const contentEl = node.querySelector('message-content') || node;

                // Safety check: ensure we aren't inside a user query (unlikely with this selector)
                if (!node.closest('.query-text')) {
                    const text = contentEl.textContent?.trim();
                    if (text) {
                        messages.push({
                            id: `gem-a-${index}`,
                            sender: 'ai',
                            text: text
                        });
                    }
                }
            }
        });
    } else if (url.includes('claude.ai')) {
        source = 'Claude';
        const msgs = document.querySelectorAll('.font-claude-message');
        msgs.forEach((msg, index) => {
            if (!isVisible(msg)) return; // Skip hidden
            const isUser = msg.parentElement?.classList.contains('bg-user-message');
            if (msg.textContent) {
                messages.push({
                    id: `claude-${index}`,
                    sender: isUser ? 'user' : 'ai',
                    text: msg.textContent.trim()
                });
            }
        });
    }

    // Fallback
    if (messages.length === 0) {
        return {
            source: 'Demo',
            messages: [
                { id: '1', sender: 'user', text: 'Scraping failed or empty chat.' },
                { id: '2', sender: 'ai', text: 'Please refresh the page and try again.' }
            ]
        };
    }

    return { source, messages };
}

// --- Listeners ---
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === 'SCRAPE_MESSAGES') {
        const data = scrapeMessages();
        sendResponse({ success: true, ...data });
    }

    if (request.action === 'PASTE_MESSAGES') {
        const inputArea = document.querySelector('textarea') ||
            document.querySelector('[contenteditable="true"]') as HTMLElement;

        if (inputArea) {
            (inputArea as HTMLElement).focus();

            // Paste the pre-formatted text provided by background script
            const textToPaste = request.payload;

            document.execCommand('insertText', false, textToPaste);


            inputArea.dispatchEvent(new Event('input', { bubbles: true }));
            inputArea.dispatchEvent(new Event('change', { bubbles: true }));

            // Logic: Auto Send
            if (request.autoSend) {
                setTimeout(() => {
                    const enterEvent = new KeyboardEvent('keydown', {
                        key: 'Enter',
                        code: 'Enter',
                        keyCode: 13,
                        which: 13,
                        bubbles: true,
                        cancelable: true
                    });
                    inputArea.dispatchEvent(enterEvent);

                    // Fallback: Click send button if enter doesn't work (Generic selector)
                    const sendBtn = document.querySelector('button[aria-label*="Send"]') ||
                        document.querySelector('button[data-testid*="send"]');
                    if (sendBtn) (sendBtn as HTMLElement).click();

                }, 500);
            }

            sendResponse({ success: true });
        } else {
            sendResponse({ success: false, error: 'No input field found' });
        }
    }
});
