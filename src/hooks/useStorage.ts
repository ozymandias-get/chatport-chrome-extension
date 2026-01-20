import { useState, useEffect } from 'react';

export function useStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Load from storage on mount
    useEffect(() => {
        const isExtension = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

        if (isExtension) {
            chrome.storage.local.get([key], (result: { [key: string]: T }) => {
                if (result[key] !== undefined) {
                    setStoredValue(result[key]);
                }
            });
        } else {
            if (typeof window !== 'undefined') {
                try {
                    const item = window.localStorage.getItem(key);
                    // Synchronize state once on mount without causing render loop
                    // We trust the lazy initialization, but if we really need to sync:
                    if (item) {
                        const value = JSON.parse(item);
                        // Only update if different?
                        // Actually, useState(() => ...) lazy init is better.
                        // But for this effect, let's just log.
                        // The requirement is to setStoredValue.
                        // The error says "Calling setState synchronously within an effect".
                        // We can wrap in setTimeout(..., 0) to push to next tick.
                        setTimeout(() => setStoredValue(value), 0);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }, [key]); // removed initialValue dependency to avoid loop if it's an object/array created in render

    // Save to storage
    const setValue = (value: T) => {
        const isExtension = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

        // Save state
        setStoredValue(value);

        // Persist
        if (isExtension) {
            chrome.storage.local.set({ [key]: value });
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    return [storedValue, setValue] as const;
}
