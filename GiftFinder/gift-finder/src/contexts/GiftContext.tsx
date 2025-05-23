import React, { createContext, useContext, useState, useEffect } from 'react';
import { DemographicProfile, GiftProduct, HistoryItem } from '../types';
import { generateGiftSuggestions, getMoreMockProducts } from '../services/aiService';
import { useAuth } from './AuthContext';

interface GiftContextType {
  isSearching: boolean;
  searchResults: GiftProduct[];
  searchHistory: HistoryItem[];
  currentProfile: DemographicProfile | null;
  searchGifts: (profile: DemographicProfile) => Promise<void>;
  loadMoreGifts: () => Promise<void>;
  saveToHistory: (item: HistoryItem) => void;
  clearResults: () => void;
  archiveHistoryItem: (id: string) => void;
  deleteHistoryItem: (id: string) => void;
}

const GiftContext = createContext<GiftContextType | undefined>(undefined);

// Key for storing history in localStorage
const HISTORY_STORAGE_KEY = 'gift_finder_history';

export const useGift = () => {
  const context = useContext(GiftContext);
  if (context === undefined) {
    throw new Error('useGift must be used within a GiftProvider');
  }
  return context;
};

export const GiftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<GiftProduct[]>([]);
  const [searchHistory, setSearchHistory] = useState<HistoryItem[]>([]);
  const [currentProfile, setCurrentProfile] = useState<DemographicProfile | null>(null);
  const { currentUser } = useAuth();
  
  // Load history from localStorage on initial render
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        // Convert string dates back to Date objects
        const formattedHistory = parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setSearchHistory(formattedHistory);
      }
    } catch (error) {
      console.error('Error loading search history from localStorage:', error);
    }
  }, []);
  
  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(searchHistory));
    } catch (error) {
      console.error('Error saving search history to localStorage:', error);
    }
  }, [searchHistory]);
  
  const searchGifts = async (profile: DemographicProfile) => {
    setIsSearching(true);
    setCurrentProfile(profile);
    
    try {
      // Call our AI service to get gift suggestions
      const results = await generateGiftSuggestions(profile, 8);
      
      setSearchResults(results);
      
      // Save to history
      const historyItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: new Date(),
        profile,
        results,
        archived: false,
      };
      
      saveToHistory(historyItem);
    } catch (error) {
      console.error('Error searching for gifts:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const loadMoreGifts = async () => {
    if (!currentProfile) return;
    
    setIsSearching(true);
    
    try {
      // In a real implementation, this would call the API with pagination
      // For now, we'll use our mock data service
      const moreResults = await getMoreMockProducts(currentProfile, 8);
      
      setSearchResults([...searchResults, ...moreResults]);
    } catch (error) {
      console.error('Error loading more gifts:', error);
    } finally {
      setIsSearching(false);
    }
  };
  
  const saveToHistory = (item: HistoryItem) => {
    // Save to our history state (which will sync to localStorage via useEffect)
    setSearchHistory((prev) => [item, ...prev]);
    
    // In a real implementation, if the user is logged in, we would also save to Firebase
    if (currentUser) {
      // Save to Firebase (mock implementation)
      console.log('Saving to Firebase for user:', currentUser.id);
    }
  };
  
  const clearResults = () => {
    setSearchResults([]);
    setCurrentProfile(null);
  };
  
  const archiveHistoryItem = (id: string) => {
    setSearchHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, archived: true } : item
      )
    );
  };
  
  const deleteHistoryItem = (id: string) => {
    setSearchHistory((prev) => prev.filter((item) => item.id !== id));
  };
  
  const value = {
    isSearching,
    searchResults,
    searchHistory,
    currentProfile,
    searchGifts,
    loadMoreGifts,
    saveToHistory,
    clearResults,
    archiveHistoryItem,
    deleteHistoryItem,
  };
  
  return <GiftContext.Provider value={value}>{children}</GiftContext.Provider>;
};

export default GiftContext;
