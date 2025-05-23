import axios from 'axios';
import { DemographicProfile, GiftProduct } from '../types';

// In a real implementation, this would be stored securely and not exposed in client-side code
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const AMAZON_AFFILIATE_ID = process.env.REACT_APP_AMAZON_AFFILIATE_ID || 'your-affiliate-id';
const ALIEXPRESS_AFFILIATE_ID = process.env.REACT_APP_ALIEXPRESS_AFFILIATE_ID || 'your-affiliate-id';

/**
 * Generates gift suggestions based on demographic profile using OpenAI API
 */
export const generateGiftSuggestions = async (
  profile: DemographicProfile, 
  count: number = 8
): Promise<GiftProduct[]> => {
  try {
    // In a real implementation, you would call OpenAI API here
    // For demo purposes, we'll return mock data

    // This would be the prompt for OpenAI in a real implementation
    const prompt = createAIPrompt(profile, count);
    
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response
    return getMockProducts(profile, count);
  } catch (error) {
    console.error('Error generating gift suggestions:', error);
    throw error;
  }
};

/**
 * Creates a prompt for the AI based on demographic profile
 */
const createAIPrompt = (profile: DemographicProfile, count: number): string => {
  const { gender, relationship, ageRange, interests, priceRange, occasion } = profile;
  
  return `
    Find ${count} gift ideas for a ${gender.toLowerCase()} ${relationship.toLowerCase()} 
    who is a ${ageRange.toLowerCase()} and is interested in ${interests.join(', ')}.
    ${priceRange ? `The gift should cost between $${priceRange.min} and $${priceRange.max}.` : ''}
    ${occasion ? `The occasion is ${occasion}.` : ''}
    
    Provide each gift as a JSON object with the following properties:
    - name: The name of the product
    - description: A brief description
    - price: Approximate price in USD
    - productUrl: A link to either Amazon or AliExpress
    - imageUrl: A link to an image of the product
    - source: Either "amazon" or "aliexpress"
  `;
};

/**
 * Adds affiliate IDs to product URLs
 */
export const addAffiliateCode = (url: string, source: 'amazon' | 'aliexpress'): string => {
  try {
    const productUrl = new URL(url);
    
    if (source === 'amazon') {
      // Add Amazon affiliate tag to URL
      productUrl.searchParams.set('tag', AMAZON_AFFILIATE_ID);
    } else if (source === 'aliexpress') {
      // Add AliExpress affiliate parameters
      // Implementation depends on AliExpress affiliate program specifics
      productUrl.searchParams.set('aff_id', ALIEXPRESS_AFFILIATE_ID);
    }
    
    return productUrl.toString();
  } catch (error) {
    console.error('Error adding affiliate code to URL:', error);
    return url; // Return original URL if there's an error
  }
};

/**
 * Returns mock product data for development purposes
 * In a real implementation, this would be replaced with actual API calls
 */
const getMockProducts = (profile: DemographicProfile, count: number): GiftProduct[] => {
  const mockProducts: GiftProduct[] = [
    {
      id: '1',
      name: 'Wireless Noise Cancelling Headphones',
      description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life',
      price: 249.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B0756CYWWD', 'amazon'),
      source: 'amazon',
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Track your workouts, heart rate, sleep, and more with this waterproof fitness tracker',
      price: 179.95,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B07V5JPVD3', 'amazon'),
      source: 'amazon',
    },
    {
      id: '3',
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof, durable speaker with rich sound and 24-hour battery life',
      price: 129.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B07P39MLKH', 'amazon'),
      source: 'amazon',
    },
    {
      id: '4',
      name: 'Smartphone Photography Kit',
      description: 'Complete kit with lenses, tripod, and remote for professional-quality smartphone photos',
      price: 39.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.aliexpress.com/item/1005001621843079.html', 'aliexpress'),
      source: 'aliexpress',
    },
    {
      id: '5',
      name: 'Premium Coffee Sampler',
      description: 'Collection of gourmet single-origin coffee beans from around the world',
      price: 48.00,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1559056211-efdc528b5d5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B07HGRH9ZV', 'amazon'),
      source: 'amazon',
    },
    {
      id: '6',
      name: 'Handcrafted Leather Wallet',
      description: 'Genuine leather wallet with RFID blocking and multiple card slots',
      price: 29.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.aliexpress.com/item/1005003099362969.html', 'aliexpress'),
      source: 'aliexpress',
    },
    {
      id: '7',
      name: 'Smart Home Starter Kit',
      description: 'Voice-controlled smart hub with compatible smart bulbs and plug',
      price: 169.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055e2a8a58a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B07VRH8Q7T', 'amazon'),
      source: 'amazon',
    },
    {
      id: '8',
      name: 'Essential Oil Diffuser',
      description: 'Ultrasonic aromatherapy diffuser with LED mood lighting and auto shut-off',
      price: 25.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1608571423539-e951a50e05e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.aliexpress.com/item/1005004033628125.html', 'aliexpress'),
      source: 'aliexpress',
    },
  ];
  
  // Return a subset of mock products based on count
  return mockProducts.slice(0, count);
};

// Additional mock products for "load more" functionality
export const getMoreMockProducts = (profile: DemographicProfile, count: number): GiftProduct[] => {
  const moreProducts: GiftProduct[] = [
    {
      id: '9',
      name: 'Gourmet Cooking Gift Set',
      description: 'Premium spice collection with recipe book for culinary enthusiasts',
      price: 59.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1532635241-17e820acc59f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B08JVFZ2M7', 'amazon'),
      source: 'amazon',
    },
    {
      id: '10',
      name: 'Wireless Charging Station',
      description: '3-in-1 charging dock for smartphone, smartwatch, and earbuds',
      price: 42.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.aliexpress.com/item/1005003172153372.html', 'aliexpress'),
      source: 'aliexpress',
    },
    {
      id: '11',
      name: 'Bamboo Bath Caddy',
      description: 'Expandable bath tray with wine holder, book stand, and phone slot',
      price: 36.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1620800845867-0a9d3b0d22fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B07MBQML2Z', 'amazon'),
      source: 'amazon',
    },
    {
      id: '12',
      name: 'Indoor Herb Garden Kit',
      description: 'Self-watering indoor garden with LED grow light and 6 herb pods',
      price: 99.95,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1617169610136-7e981be476f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B07CKK8Z78', 'amazon'),
      source: 'amazon',
    },
    {
      id: '13',
      name: 'Vintage Vinyl Record Player',
      description: 'Bluetooth-compatible turntable with built-in speakers and USB recording',
      price: 69.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1603867352548-9b34530a4953?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.aliexpress.com/item/1005003560832045.html', 'aliexpress'),
      source: 'aliexpress',
    },
    {
      id: '14',
      name: 'Personalized Star Map',
      description: 'Custom star map showing the night sky from any location and date',
      price: 39.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B07WNLW3P8', 'amazon'),
      source: 'amazon',
    },
    {
      id: '15',
      name: 'Luxury Scented Candle Set',
      description: 'Set of 4 premium soy wax candles with essential oils and long burn time',
      price: 49.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1608181831718-c9ffd8dff23f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.amazon.com/dp/B074QMFZ3C', 'amazon'),
      source: 'amazon',
    },
    {
      id: '16',
      name: 'Insulated Tumbler',
      description: 'Vacuum-insulated stainless steel tumbler that keeps drinks hot or cold for hours',
      price: 27.99,
      currency: '$',
      imageUrl: 'https://images.unsplash.com/photo-1575414004048-2f145de2c6c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      productUrl: addAffiliateCode('https://www.aliexpress.com/item/1005003778026519.html', 'aliexpress'),
      source: 'aliexpress',
    },
  ];
  
  return moreProducts.slice(0, count);
};
