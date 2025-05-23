import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Theme provider
import ThemeProvider from './theme/ThemeProvider';

// Context providers
import { AuthProvider } from './contexts/AuthContext';
import { GiftProvider } from './contexts/GiftContext';
import { CalendarProvider } from './contexts/CalendarContext';

// Components
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import HomePage from './pages/HomePage';
import GiftFinderPage from './pages/GiftFinderPage';
import AuthPage from './pages/AuthPage';
import CalendarPage from './pages/CalendarPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GiftProvider>
          <CalendarProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gifts" element={<GiftFinderPage />} />
                <Route path="/login" element={<AuthPage />} />
                
                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/history" element={<HistoryPage />} />
                </Route>
              </Routes>
            </Router>
          </CalendarProvider>
        </GiftProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
