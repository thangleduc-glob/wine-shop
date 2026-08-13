import './App.css'

import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthPage from './pages/AuthPage'
import ProductsPage from './pages/ProductsPage'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage initialMode="login" />} />
        <Route path="/signup" element={<AuthPage initialMode="signup" />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
