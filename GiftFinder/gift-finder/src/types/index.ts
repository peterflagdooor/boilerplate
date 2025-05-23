// User related types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

// Gift finder related types
export interface DemographicProfile {
  gender: 'Male' | 'Female' | 'Other';
  relationship: 'Friend' | 'Partner' | 'Family' | 'Coworker' | 'Other';
  ageRange: 'Child' | 'Teen' | 'Young Adult' | 'Adult' | 'Senior';
  interests: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  occasion?: string;
}

export interface GiftProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  productUrl: string;
  source: 'amazon' | 'aliexpress';
}

export interface GiftSearchResult {
  id: string;
  createdAt: Date;
  profile: DemographicProfile;
  products: GiftProduct[];
}

// Calendar related types
export interface BirthdayEvent {
  id: string;
  contactName: string;
  date: Date;
  notified: boolean;
}

// History related types
export interface HistoryItem {
  id: string;
  timestamp: Date;
  profile: DemographicProfile;
  results: GiftProduct[];
  archived: boolean;
}
