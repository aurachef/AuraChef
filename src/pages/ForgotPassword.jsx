import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-[#9D5CFF] to-[#6A0DAD] flex items-center justify-center p-4">
      <div className="bg-/20 backdrop-blur-md shadow-lg shadow-[#9D5CFF]/50 rounded-3xl p-8 w-full max-w-md border border-white/30">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-xl bg-white/90 shadow-md backdrop-blur-md border-none focus:ring-2 focus:ring-[#9D5CFF] outline-none text-gray-800 placeholder-gray-500 transition"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#004AAD] to-[#002F6C] text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
