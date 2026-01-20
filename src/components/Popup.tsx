import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Zap, CheckCircle2, CircleDashed, User, Bot, Wifi, X, Globe, SendHorizontal } from 'lucide-react';
import clsx from 'clsx';
import { useStorage } from '../hooks/useStorage';
import { translations, type Language } from '../i18n';

// --- Types ---
type Message = {
    id: string;
    sender: 'user' | 'ai';
    text: string;
};

type AppStatus = 'idle' | 'listening' | 'captured' | 'sending' | 'complete' | 'error';

// --- Mock Data Generator ---
const MOCK_MESSAGES: Message[] = [
    { id: '1', sender: 'user', text: 'React Hooks nedir?' },
    { id: '2', sender: 'ai', text: 'React Hooks, fonksiyon bileşenlerinde state ve yaşam döngüsü özelliklerini kullanmanızı sağlayan fonksiyonlardır.' },
    { id: '3', sender: 'user', text: 'useEffect ne işe yarar?' },
    { id: '4', sender: 'ai', text: 'useEffect, yan etkileri (veri çekme, DOM güncelleme vb.) yönetmemizi sağlar.' },
    { id: '5', sender: 'user', text: 'Teşekkürler!' },
];

export default function Popup() {
    // State
    const [status, setStatus] = useState<AppStatus>('idle');
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [sourceAI, setSourceAI] = useState<string>('Unknown AI');
    const [progress, setProgress] = useState(0);
    const [showSettings, setShowSettings] = useState(false);

    // Persisted Settings
    const [targetAI, setTargetAI] = useStorage<'ChatGPT' | 'Gemini' | 'Claude'>('targetAI', 'Gemini');
    const [language, setLanguage] = useStorage<Language>('language', 'tr');
    const [autoSend, setAutoSend] = useStorage<boolean>('autoSend', false);

    const t = translations[language];

    // --- Logic: Listening ---
    useEffect(() => {
        // Use timeout to avoid synchronous update warning
        const t = setTimeout(() => setStatus('listening'), 0);

        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const activeTab = tabs[0];

                // Check if supported URL
                const isSupported = activeTab?.url && (
                    activeTab.url.includes('chatgpt.com') ||
                    activeTab.url.includes('gemini.google.com') ||
                    activeTab.url.includes('claude.ai')
                );

                if (!isSupported) {
                    return; // Do nothing or show "unsupported" state if desired
                }

                if (activeTab?.id) {
                    chrome.tabs.sendMessage(activeTab.id, { action: 'SCRAPE_MESSAGES' }, (response) => {
                        if (chrome.runtime.lastError) {
                            // Suppress console warning as we handle it in UI
                            // console.warn("Connection info:", chrome.runtime.lastError.message); 
                            setMessages([]);
                            setStatus('error');
                            return;
                        }

                        if (response && response.messages) {
                            setMessages(response.messages);
                            setSourceAI(response.source || 'ChatGPT');
                            setSelectedIds(new Set(response.messages.map((m: Message) => m.id)));
                            setStatus('captured');
                        }
                    });
                }
            });
        } else {
            // Mock Mode
            const timer = setTimeout(() => {
                setMessages(MOCK_MESSAGES);
                setSelectedIds(new Set(MOCK_MESSAGES.map(m => m.id)));
                setStatus('captured');
            }, 1000);
            return () => { clearTimeout(timer); clearTimeout(t); };
        }

        return () => clearTimeout(t);
    }, []);

    // --- Logic: Teleport ---
    const handleTeleport = async () => {
        if (status !== 'captured') return;

        setStatus('sending');
        setProgress(0);

        const messagesToSend = messages.filter(m => selectedIds.has(m.id));
        const totalChunks = 5;

        for (let i = 1; i <= totalChunks; i++) {
            await new Promise(resolve => setTimeout(resolve, 300));
            setProgress(Math.round((i / totalChunks) * 100));
        }

        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.sendMessage({
                action: 'TELEPORT',
                target: targetAI,
                messages: messagesToSend,
                sourceAI: sourceAI,
                settings: {
                    language,
                    autoSend
                }
            });
        }

        setStatus('complete');
        setTimeout(() => {
            setStatus('idle');
        }, 2000);
    };

    const toggleSelection = (id: string) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    return (
        <div className="flex flex-col h-screen p-4 gap-4 bg-stone-950 font-sans relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-sand-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-stone-700/10 blur-[80px] rounded-full pointer-events-none" />

            {/* HEADER */}
            <header className="flex justify-between items-center z-10 shrink-0">
                <h1 className="text-2xl font-serif font-bold text-stone-50 tracking-wide">
                    {t.appTitle}
                </h1>
                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-stone-400 hover:text-sand-500 transition-colors duration-300 relative z-50"
                >
                    {showSettings ? <X className="w-5 h-5" /> : <Settings className="w-5 h-5 hover:rotate-90 transition-transform duration-700" />}
                </button>
            </header>

            {/* SETTINGS OVERLAY */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute inset-x-4 top-16 z-40 glass-panel p-4 flex flex-col gap-4 border border-sand-500/20 shadow-2xl bg-stone-950/90"
                    >
                        <h3 className="text-sm uppercase tracking-widest text-sand-500 font-bold mb-1 flex items-center gap-2">
                            <Settings className="w-4 h-4" /> {t.settings.title}
                        </h3>

                        {/* Language Setting */}
                        <div className="flex items-center justify-between">
                            <span className="text-stone-300 text-sm flex items-center gap-2">
                                <Globe className="w-4 h-4 text-stone-500" />
                                {t.settings.language}
                            </span>
                            <div className="flex bg-stone-900 rounded-lg p-1 border border-stone-800">
                                <button onClick={() => setLanguage('tr')} className={clsx("px-3 py-1 text-xs rounded transition-all", language === 'tr' ? "bg-stone-800 text-sand-500" : "text-stone-500")}>TR</button>
                                <button onClick={() => setLanguage('en')} className={clsx("px-3 py-1 text-xs rounded transition-all", language === 'en' ? "bg-stone-800 text-sand-500" : "text-stone-500")}>EN</button>
                            </div>
                        </div>

                        {/* Auto Send Setting */}
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-stone-300 text-sm flex items-center gap-2">
                                    <SendHorizontal className="w-4 h-4 text-stone-500" />
                                    {t.controls.autoSend}
                                </span>
                                <span className="text-[10px] text-stone-500 mt-1">{t.settings.autoSendDesc}</span>
                            </div>
                            <button
                                onClick={() => setAutoSend(!autoSend)}
                                className={clsx("w-10 h-5 rounded-full relative transition-colors duration-300", autoSend ? "bg-sand-600" : "bg-stone-800")}
                            >
                                <div className={clsx("absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300", autoSend ? "left-6" : "left-1")} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* STATUS BAR */}
            <section className="shrink-0">
                <div className={clsx(
                    "glass-panel p-3 flex items-center justify-between border transition-all duration-500",
                    status === 'listening' ? "border-sand-500/50 shadow-glow-sand animate-pulse-slow" : "border-stone-800"
                )}>
                    <div className="flex items-center gap-3">
                        {status === 'listening' && (
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sand-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-sand-500"></span>
                            </span>
                        )}
                        {status === 'complete' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                        {status === 'captured' && <Wifi className="w-5 h-5 text-stone-400" />}
                        {status === 'error' && <X className="w-5 h-5 text-red-500" />}

                        <span className="text-sm font-medium text-stone-200">
                            {status === 'idle' && t.status.idle}
                            {status === 'listening' && t.status.listening}
                            {status === 'captured' && t.status.captured(messages.length)}
                            {status === 'sending' && t.status.sending(progress)}
                            {status === 'complete' && t.status.complete}
                            {status === 'error' && t.status.error}
                        </span>
                    </div>
                </div>
            </section>

            {/* MESSAGE LIST */}
            <section className="flex-1 min-h-0 relative flex flex-col">
                <div className="flex justify-between items-center mb-2 px-1">
                    <h2 className="text-xs uppercase tracking-widest text-stone-500 font-bold">{t.context.title}</h2>
                    {status === 'captured' && (
                        <button
                            onClick={() => setSelectedIds(new Set(messages.map(m => m.id)))}
                            className="text-xs text-sand-500 hover:underline"
                        >
                            {t.context.selectAll}
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                    <AnimatePresence>
                        {messages.map((msg, index) => {
                            const isSelected = selectedIds.has(msg.id);
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => toggleSelection(msg.id)}
                                    className={clsx(
                                        "relative p-4 rounded-xl border cursor-pointer group transition-all duration-300",
                                        isSelected
                                            ? "bg-stone-900/80 border-sand-500/30 shadow-[0_0_15px_rgba(212,165,116,0.05)]"
                                            : "bg-surface border-stone-800/50 hover:border-stone-700"
                                    )}
                                >
                                    <div className="flex gap-3">
                                        <div className={clsx(
                                            "mt-1 w-4 h-4 rounded border flex items-center justify-center transition-colors",
                                            isSelected ? "bg-sand-500 border-sand-500" : "border-stone-600 group-hover:border-stone-400"
                                        )}>
                                            {isSelected && <CheckCircle2 className="w-3 h-3 text-stone-950" />}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                {msg.sender === 'user' ? <User className="w-3 h-3 text-stone-500" /> : <Bot className="w-3 h-3 text-sand-500" />}
                                                <span className="text-[10px] uppercase font-bold text-stone-500">{msg.sender === 'user' ? t.context.you : sourceAI}</span>
                                            </div>
                                            <p className={clsx(
                                                "text-sm leading-relaxed",
                                                msg.sender === 'user' ? "text-stone-200 font-serif italic" : "text-stone-300 font-sans"
                                            )}>
                                                {msg.text}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {messages.length === 0 && status !== 'listening' && (
                        <div className="flex flex-col items-center justify-center h-full text-stone-600 gap-2">
                            <CircleDashed className="w-8 h-8 animate-spin-slow opacity-20" />
                            <span className="text-sm">{t.context.empty}</span>
                        </div>
                    )}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="shrink-0 pt-4 pb-2">
                {status === 'sending' ? (
                    <div className="glass-panel p-6 flex flex-col items-center justify-center text-center gap-3 border-sand-500/30">
                        <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-sand-gradient"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: 'spring', stiffness: 50 }}
                            />
                        </div>
                        <p className="text-xs font-mono text-sand-500 animate-pulse">
                            {t.controls.encrypting}
                        </p>
                    </div>
                ) : (
                    <div className="glass-panel p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-xs text-stone-400">{t.controls.destination}</label>
                            <div className="flex bg-stone-950 rounded-lg p-1 border border-stone-800">
                                {(['ChatGPT', 'Gemini', 'Claude'] as const).map(option => (
                                    <button
                                        key={option}
                                        onClick={() => setTargetAI(option)}
                                        className={clsx(
                                            "px-3 py-1 text-xs rounded-md transition-all",
                                            targetAI === option ? "bg-stone-800 text-sand-500 shadow-sm" : "text-stone-500 hover:text-stone-300"
                                        )}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={selectedIds.size === 0 || status === 'listening'}
                            onClick={handleTeleport}
                            className={clsx(
                                "group relative w-full h-12 rounded-xl flex items-center justify-center gap-2 overflow-hidden transition-all duration-300",
                                selectedIds.size > 0
                                    ? "bg-sand-gradient text-stone-950 shadow-[0_0_20px_rgba(212,165,116,0.3)] hover:scale-[1.02]"
                                    : "bg-stone-800 text-stone-600 cursor-not-allowed"
                            )}
                        >
                            <span className="relative z-10 font-bold tracking-wide flex items-center gap-2">
                                <Zap className={clsx("w-4 h-4 transition-transform group-hover:translate-x-1", selectedIds.size > 0 && "fill-stone-950")} />
                                {selectedIds.size > 0 ? t.controls.teleportBtn(targetAI) : t.controls.selectMsgBtn}
                            </span>

                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </div>
                )}
            </footer>
        </div>
    );
}
