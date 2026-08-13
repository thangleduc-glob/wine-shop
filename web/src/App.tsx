import './App.css'

import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import Footer from './components/Footer'
import AuthPage from './pages/AuthPage'
import ProductsPage from './pages/ProductsPage'
import SupabaseProductsPage from './pages/SupabaseProductsPage'

import { Routes, Route, useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()
  const hideChrome = location.pathname === '/login' || location.pathname === '/signup'

  return (
    <div className="app-root">
      {!hideChrome && <Header />}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage initialMode="login" />} />
          <Route path="/signup" element={<AuthPage initialMode="signup" />} />
          <Route path="/products" element={<SupabaseProductsPage />} />
          {/* <Route path="/supabase" element={<SupabaseProductsPage />} /> */}
        </Routes>
      </main>

      {!hideChrome && <Footer />}
    </div>
  )
}

export default App
