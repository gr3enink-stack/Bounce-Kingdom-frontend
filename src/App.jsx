import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SEO from './components/SEO';
import Analytics from './components/Analytics';
import CookieConsent from './components/CookieConsent';
import DarkModeToggle from './components/DarkModeToggle';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import HowItWorks from './components/HowItWorks';
import SafetyFAQ from './components/SafetyFAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Booking from './components/Booking';
import KidsInteractive from './components/KidsInteractive';
import Confirmation from './components/Confirmation';
import Newsletter from './components/Newsletter';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import './App.css';
import './components/ResponsiveUtils.css';

function App() {
  return (
    <div className="App">
      <SEO />
      <Analytics />
      <CookieConsent />
      <DarkModeToggle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Products />
              <HowItWorks />
              <SafetyFAQ />
              <Testimonials />
              <KidsInteractive />
              <Booking />
              <Contact />
              <Newsletter />
            </>
          } />
          <Route path="/products" element={<Products />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/safety" element={<SafetyFAQ />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;