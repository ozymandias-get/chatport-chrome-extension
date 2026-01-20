import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
    manifest_version: 3,
    name: 'ChatPort - AI Teleporter',
    version: '1.0',
    description: 'Intercepts and teleports chat sessions between AIs.',
    "action": {
        "default_popup": "index.html",
        "default_icon": {
            "16": "icons/icon16.png",
            "48": "icons/icon48.png",
            "128": "icons/icon128.png"
        }
    },
    "icons": {
        "16": "icons/icon16.png",
        "48": "icons/icon48.png",
        "128": "icons/icon128.png"
    },
    "permissions": ['storage', 'activeTab', 'scripting', 'tabs'],
    "host_permissions": [
        'https://chatgpt.com/*',
        'https://gemini.google.com/*',
        'https://claude.ai/*',
    ],
    "background": {
        "service_worker": "src/background/index.ts",
        "type": "module"
    },
    "content_scripts": [
        {
            "matches": ["https://chatgpt.com/*", "https://gemini.google.com/*", "https://claude.ai/*"],
            "js": ["src/content/index.ts"]
        }
    ]
})
