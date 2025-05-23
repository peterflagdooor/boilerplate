import React, { createContext, useContext, useState, useEffect } from 'react';
import { BirthdayEvent } from '../types';
import { useAuth } from './AuthContext';

interface CalendarContextType {
  isConnected: boolean;
  isLoading: boolean;
  birthdays: BirthdayEvent[];
  connectGoogleCalendar: () => Promise<void>;
  disconnectGoogleCalendar: () => Promise<void>;
  refreshBirthdays: () => Promise<void>;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [birthdays, setBirthdays] = useState<BirthdayEvent[]>([]);
  const { currentUser } = useAuth();

  // Check if the user has already connected their calendar
  useEffect(() => {
    if (currentUser) {
      // In a real implementation, this would check if the user has connected their calendar
      // in Firebase or another database
      const checkConnection = async () => {
        setIsLoading(true);
        // Mock implementation
        setTimeout(() => {
          setIsConnected(false);
          setIsLoading(false);
        }, 1000);
      };
      
      checkConnection();
    } else {
      setIsConnected(false);
      setBirthdays([]);
    }
  }, [currentUser]);

  const connectGoogleCalendar = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would handle OAuth2 flow with Google
      // For now, let's simulate a successful connection
      setTimeout(() => {
        setIsConnected(true);
        setIsLoading(false);
        
        // After connecting, fetch birthdays
        refreshBirthdays();
      }, 1500);
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
      setIsLoading(false);
    }
  };

  const disconnectGoogleCalendar = async () => {
    if (!currentUser) return;
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would revoke access to Google Calendar
      setTimeout(() => {
        setIsConnected(false);
        setBirthdays([]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error disconnecting from Google Calendar:', error);
      setIsLoading(false);
    }
  };

  const refreshBirthdays = async () => {
    if (!currentUser || !isConnected) return;
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would fetch birthdays from Google Calendar
      setTimeout(() => {
        const today = new Date();
        const mockBirthdays: BirthdayEvent[] = [
          {
            id: '1',
            contactName: 'John Doe',
            date: new Date(today.getFullYear(), today.getMonth() + 1, 15),
            notified: false,
          },
          {
            id: '2',
            contactName: 'Jane Smith',
            date: new Date(today.getFullYear(), today.getMonth() + 2, 5),
            notified: false,
          },
        ];
        
        setBirthdays(mockBirthdays);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error fetching birthdays:', error);
      setIsLoading(false);
    }
  };

  const value = {
    isConnected,
    isLoading,
    birthdays,
    connectGoogleCalendar,
    disconnectGoogleCalendar,
    refreshBirthdays,
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export default CalendarContext;
