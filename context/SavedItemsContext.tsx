import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { useToast } from './ToastContext';

interface SavedItemsContextType {
    savedItems: Product[];
    addToSaved: (product: Product) => void;
    removeFromSaved: (productId: string) => void;
    isSaved: (productId: string) => boolean;
    savedCount: number;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export const SavedItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { showToast } = useToast();
    const [savedItems, setSavedItems] = useState<Product[]>(() => {
        try {
            const saved = localStorage.getItem('savedItems');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
    }, [savedItems]);

    const addToSaved = (product: Product) => {
        setSavedItems(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                showToast('Item already saved', 'info');
                return prev; // Already saved
            }
            showToast('Item saved to wishlist ✓', 'success');
            return [...prev, product];
        });
    };

    const removeFromSaved = (productId: string) => {
        setSavedItems(prev => prev.filter(item => item.id !== productId));
        showToast('Item removed from saved', 'info');
    };

    const isSaved = (productId: string) => {
        return savedItems.some(item => item.id === productId);
    };

    const savedCount = savedItems.length;

    return (
        <SavedItemsContext.Provider value={{ savedItems, addToSaved, removeFromSaved, isSaved, savedCount }}>
            {children}
        </SavedItemsContext.Provider>
    );
};

export const useSavedItems = () => {
    const context = useContext(SavedItemsContext);
    if (context === undefined) {
        throw new Error('useSavedItems must be used within a SavedItemsProvider');
    }
    return context;
};

