export type Language = 'tr' | 'en';

export const translations = {
    tr: {
        appTitle: 'ChatPort',
        status: {
            idle: 'Bağlantı Hazır',
            listening: 'Ağ Akışı Analiz Ediliyor...',
            captured: (count: number) => `${count} Mesaj Arabellekte`,
            sending: (progress: number) => `Kuantum Tüneli Kuruluyor... %${progress}`,
            complete: 'Işınlama Başarılı',
            error: 'Bağlantı Hatası: Lütfen Sayfayı Yenileyin',
        },
        context: {
            title: 'YAKALANAN BAĞLAM',
            selectAll: 'Tümünü Seç',
            empty: 'Sohbet bekleniyor...',
            you: 'Sen',
            ai: 'Yapay Zeka' // Will be dynamic later
        },
        controls: {
            destination: 'Hedef',
            autoSend: 'Otomatik Gönder',
            teleportBtn: (target: string) => `${target.toUpperCase()}'E IŞINLA`,
            selectMsgBtn: 'MESAJ SEÇİN',
            encrypting: 'Şifreleniyor & Işınlanıyor...'
        },
        settings: {
            title: 'Ayarlar',
            language: 'Dil / Language',
            autoSendDesc: 'Mesajları yapıştırdıktan sonra otomatik gönder.'
        }
    },
    en: {
        appTitle: 'ChatPort',
        status: {
            idle: 'Ready to Connect',
            listening: 'Analyzing Network Stream...',
            captured: (count: number) => `${count} Messages Buffered`,
            sending: (progress: number) => `Initializing Quantum Tunnel... ${progress}%`,
            complete: 'Teleport Successful',
            error: 'Connection Error: Please Refresh Page',
        },
        context: {
            title: 'CAPTURED CONTEXT',
            selectAll: 'Select All',
            empty: 'Waiting for conversation...',
            you: 'You',
            ai: 'AI'
        },
        controls: {
            destination: 'Destination',
            autoSend: 'Auto Send',
            teleportBtn: (target: string) => `TELEPORT TO ${target.toUpperCase()}`,
            selectMsgBtn: 'SELECT MESSAGES',
            encrypting: 'Encrypting & Teleporting Chunk...'
        },
        settings: {
            title: 'Settings',
            language: 'Language',
            autoSendDesc: 'Automatically send messages after pasting.'
        }
    }
};
