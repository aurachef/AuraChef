
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AddRecipe from './pages/AddRecipe';
import CalorieTracking from './pages/CalorieTracking';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-4 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/calorie-tracking" element={<CalorieTracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
