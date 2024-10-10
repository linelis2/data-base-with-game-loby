import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import GameRoom from './pages/GameRoom';
import Profile from './pages/Profile';
import TokenExchange from './pages/TokenExchange';
import Login from './pages/Login';
import Register from './pages/Register';
import { Web3Provider } from './contexts/Web3Context';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Web3Provider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/lobby" element={<ProtectedRoute><Lobby /></ProtectedRoute>} />
              <Route path="/game/:id" element={<ProtectedRoute><GameRoom /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/exchange" element={<ProtectedRoute><TokenExchange /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;