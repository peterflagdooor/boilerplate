import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { 
  User as FirebaseUser,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithRedirect,
  signInWithPopup,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { User } from '../types';

// Custom useEffectOnce hook
const useEffectOnce = (effect: React.EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(effect, []);
};

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const appUser: User = {
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || undefined,
          photoURL: user.photoURL || undefined,
        };
        setCurrentUser(appUser);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    try {
      // Try to use redirect first, which is more reliable on mobile
      await signInWithRedirect(auth, googleProvider);
    } catch (error: any) {
      console.error('Google sign-in redirect error:', error);
      
      // If redirect fails with popup-blocked, try a different approach
      if (error.code === 'auth/popup-blocked') {
        try {
          // Inform the user they need to enable popups
          alert('Please enable popups for this site to use Google sign-in');
          
          // Try again with a direct approach that might work better
          await signInWithPopup(auth, googleProvider);
        } catch (popupError: any) {
          console.error('Google sign-in popup error:', popupError);
          throw popupError;
        }
      } else if (error.code === 'auth/configuration-not-found') {
        console.error('Firebase project not properly configured for authentication');
        throw error;
      } else {
        throw error;
      }
    }
  };

  // Handle the redirect result when the component mounts
  useEffectOnce(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // This will trigger the onAuthStateChanged listener
          console.log('Google sign-in successful');
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }
    };

    handleRedirectResult();
  });

  const logout = async () => {
    await signOut(auth);
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
