import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Logo from "../assets/images/Frame 2.png";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      alert('Login successful!');
      console.log('Logged in user:', data.user);
      navigate('/home');
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(240,51,40,0.1)] border border-[#f0e6de] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#F03328]/10 to-[#FF9E0C]/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-[#FF9E0C]/10 to-[#F03328]/10 rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex flex-col items-center">
            <Link to="/home" className="flex gap-2 items-center mb-6">
              <img src={Logo} alt="Foodie logo" className="w-10 h-10" />
              <div className="flex text-2xl font-extrabold font-nunito">
                <span className="text-[#F03328]">Foo</span>
                <span className="text-[#FF9E0C]">die</span>
              </div>
            </Link>
            <h2 className="text-3xl font-extrabold text-[#2d2d2d] font-nunito text-center">
              Welcome Back!
            </h2>
            <p className="mt-2 text-[#666666] font-nunito text-center">
              Log in to our delicious world
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#2d2d2d] font-nunito mb-1 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#f0e6de] placeholder-[#a0a0a0] text-[#2d2d2d] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F03328]/20 focus:border-[#F03328] transition-all duration-300 font-nunito"
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#2d2d2d] font-nunito mb-1 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-[#f0e6de] placeholder-[#a0a0a0] text-[#2d2d2d] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#F03328]/20 focus:border-[#F03328] transition-all duration-300 font-nunito"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#F03328] focus:ring-[#F03328] border-[#f0e6de] rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#666666] font-nunito cursor-pointer">
                  Remember Me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-bold text-[#F03328] hover:text-[#d42a20] transition-colors font-nunito">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-extrabold rounded-2xl text-white bg-gradient-to-r from-[#F03328] to-[#FF9E0C] hover:shadow-[0_10px_25px_rgba(240,51,40,0.3)] transform transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed font-nunito"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#666666] font-nunito">
              Don't have an account?{' '}
              <Link to="/register" className="font-extrabold text-[#F03328] hover:text-[#d42a20] transition-colors">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
