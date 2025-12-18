'use client';

import React, { useState } from 'react';
import { ChevronLeft, X, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { supabase } from '../../lib/supabaseClient';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset errors
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    setLoading(true);

    try {
      // 1. Check for Demo Credentials (optional fast-path for testing)
      if (email === 'user@example.com' && password === 'password123') {
        console.log('Logged in via Demo Credentials');
        router.push('/dashboard');
        return;
      }

      // 2. Real Supabase Authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Login Error:', error.message);
        if (error.message.includes('Invalid login credentials')) {
          setPasswordError('Incorrect email or password.');
          // Or verify if it matches specific cases to set emailError
        } else {
          setEmailError(error.message);
        }
      } else {
        console.log('Logged in successfully:', data);
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setEmailError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">

      {/* 
        Container: Width 470px, Min-Height 642px (Changed to min-h to accommodate errors), Radius 16px, Padding 36px, Gap 36px
        Background implied white.
      */}
      <div className="w-[470px] min-h-[642px] bg-white rounded-[16px] p-[36px] flex flex-col gap-[36px] shadow-2xl relative transition-all duration-300">

        {/* 1. Nav Row: Width 398px, Height 24px, Justify Space Between */}
        <div className="w-full h-[24px] flex justify-between items-center shrink-0">
          <button
            onClick={handleBack}
            className="text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleBack}
            className="text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
          >
            <X size={24} />
          </button>
        </div>

        {/* 2. Main Content Section: Width 398px, Vertical layout, Gap 32px */}
        <div className="w-full flex flex-col gap-[32px] flex-1">

          {/* 2.1 Header Text Block: Width 324px (Centered in 398px), Height 68px, Gap 8px */}
          <div className="w-full flex flex-col items-center gap-[8px]">
            {/* Title: Log In */}
            <h1 className="w-[324px] h-[38px] font-['Familjen_Grotesk'] font-semibold text-[32px] leading-[38px] tracking-[-0.3px] text-center text-[#04330B]">
              Log In
            </h1>
            {/* Subtitle: Login into your account */}
            <p className="w-full text-center font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#587E67]">
              Login into your account
            </p>
          </div>

          {/* 2.2 Form Container: Width 398px, Gap 40px */}
          <form
            className="w-full flex flex-col gap-[40px]"
            onSubmit={handleLogin}
          >

            {/* Inputs Section: Width 398px, Gap 12px */}
            <div className="w-full flex flex-col gap-[12px]">

              {/* Inputs Wrapper: Width 398px, Gap 16px */}
              <div className="w-full flex flex-col gap-[16px]">

                {/* Email Input Group */}
                <div className="flex flex-col">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[46px] rounded-[8px] border border-[#E4F2EA] px-[16px] py-[12px] font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#587E67] placeholder-[#587E67] focus:outline-none focus:border-[#04330B] transition-colors bg-white"
                  />
                  {emailError && (
                    <p className="mt-[4px] font-['Familjen_Grotesk'] font-semibold text-[14px] leading-[18px] tracking-[-0.3px] text-[#EC4521]">
                      {emailError}
                    </p>
                  )}
                </div>

                {/* Password Input Group */}
                <div className="flex flex-col">
                  <div className="relative w-full h-[46px]">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-full rounded-[8px] border border-[#E4F2EA] px-[16px] py-[12px] font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#587E67] placeholder-[#587E67] focus:outline-none focus:border-[#04330B] transition-colors bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#587E67] hover:text-[#04330B] transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="mt-[4px] font-['Familjen_Grotesk'] font-semibold text-[14px] leading-[18px] tracking-[-0.3px] text-[#EC4521]">
                      {passwordError}
                    </p>
                  )}
                </div>

              </div>

              {/* Forgot Password Link - 12px gap from inputs */}
              <div className="flex justify-start h-[22px] mt-[0px]">
                <button
                  type="button"
                  onClick={() => router.push('/verifynumber')}
                  className="font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#0D5229] text-right hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Login Button - 40px gap from Forgot Password */}
            <button
              type="submit"
              disabled={loading}
              className="mt-[2px] w-full h-[46px] rounded-[8px] bg-[#0D5229] disabled:bg-gray-400 flex items-center justify-center gap-[10px] hover:bg-[#0a4220] transition-colors shrink-0"
            >
              <span className="font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-white">
                {loading ? 'Logging in...' : 'Login'}
              </span>
            </button>
          </form>

          {/* Social Signup Section - Adjusted gap to 40px to fit layout */}
          <div className="w-full flex flex-col gap-[16px] mt-[12px]">

            {/* Header: Signup with */}
            <p className="w-full text-center font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#04330B]">
              Signup with
            </p>

            {/* Buttons + Footer Container (Gap 36px) */}
            <div className="w-full flex flex-col gap-[36px]">

              {/* Social Buttons Row (Gap 16px) */}
              <div className="w-full flex justify-between gap-[16px]">

                {/* Google */}
                <button className="w-[122px] h-[46px] rounded-[8px] border border-[#B9D3C4] p-[12px] flex items-center justify-center gap-[8px] hover:bg-gray-50 transition-colors">
                  <div className="w-[20px] h-[20px] flex items-center justify-center">
                    <img src="/login/Google-login.svg" alt="Google" className="w-[20px] h-[20px]" />
                  </div>
                  <span className="font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#0D5229]">
                    Google
                  </span>
                </button>

                {/* Facebook */}
                <button className="w-[122px] h-[46px] rounded-[8px] border border-[#B9D3C4] p-[12px] flex items-center justify-center gap-[8px] hover:bg-gray-50 transition-colors">
                  <div className="w-[20px] h-[20px] flex items-center justify-center">
                    <img src="/login/Fb-login.svg" alt="Facebook" className="w-[20px] h-[20px]" />
                  </div>
                  <span className="font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#0D5229]">
                    Facebook
                  </span>
                </button>

                {/* Apple */}
                <button className="w-[122px] h-[46px] rounded-[8px] border border-[#B9D3C4] p-[12px] flex items-center justify-center gap-[8px] hover:bg-gray-50 transition-colors">
                  <div className="w-[20px] h-[20px] flex items-center justify-center">
                    <img src="/login/Apple-login.svg" alt="Apple" className="w-[20px] h-[20px]" />
                  </div>
                  <span className="font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#0D5229]">
                    Apple
                  </span>
                </button>
              </div>

              {/* Already have an account? Sign Up */}
              <div className="text-center w-full h-[22px]">
                <p className="font-['Familjen_Grotesk'] font-semibold text-[16px] leading-[22px] tracking-[-0.3px] text-[#04330B]">
                  Already have an account? <button onClick={() => router.push('/verifynumber?mode=signup')} className="hover:underline text-[#0D5229]">Sign Up</button>
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Footer
        <div className="text-center">
          <p className="font-['Familjen_Grotesk'] font-bold text-[15px] text-[#04330B]">
            Already have an account? <a href="#" className="hover:underline">Sign Up</a>
          </p>
        </div> */}
      </div>
    </div>
  );
}
