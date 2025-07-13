'use client';
import Link from 'next/link';
import { useAuth } from '@/lib/authContext';
import { useState } from 'react';
import { Users } from 'lucide-react';

export default function Navbar() {
  const { user, profile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-[#170826]/80 border-b border-purple-900/30 shadow-xl rounded-b-2xl px-4 sm:px-8 py-4 relative z-50">
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img src="/Logo.png" alt="Logo" className="h-10 w-auto hover:scale-110 transition-transform duration-200 drop-shadow-lg" />
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
          <Link href="/" className="text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-200">Home</Link>
          <Link href="/blogs" className="text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-200">Blogs</Link>
          <Link href="/contact" className="text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-200">Contact</Link>
          {user && <Link href="/post-blog" className="text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-200">Post Your Blog</Link>}
          {profile?.role === 'admin' && (
            <Link
              href="/admin"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-4 py-1.5 rounded-lg shadow hover:from-purple-700 hover:to-blue-600 transition-all font-bold border border-purple-400/40"
            >
              Admin DashBoard
            </Link>
          )}
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex flex-shrink-0 items-center ml-4">
          {!user ? (
            <Link
              href="/login"
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all font-bold border border-purple-400/40"
            >
              Login
            </Link>
          ) : (
            <Link href="/profile">
              <span className="cursor-pointer text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 px-5 py-2 rounded-lg shadow flex items-center gap-2 hover:from-purple-700 hover:to-blue-600 transition-all border border-purple-400/40">
                👋 {profile?.name || user.displayName || 'Anonymous'}
              </span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none hover:text-purple-400 transition-colors"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-4 rounded-2xl bg-[#170826]/90 shadow-lg border border-purple-900/30 px-4 pt-4">
          <Link
            href="/"
            className="block text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className="block text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className="block text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-200"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          {profile?.role === 'admin' && (
            <Link
              href="/admin"
              className="text-sm bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 px-4 py-1.5 rounded-lg text-white shadow hover:from-purple-700 hover:to-blue-600 transition-all font-bold border border-purple-400/40"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}
          {user && (
            <Link
              href="/post-blog"
              className="block text-white font-semibold hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Post Your Blog
            </Link>
          )}

          <div className="pt-2">
            {!user ? (
              <Link
                href="/login"
                className="inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all font-bold border border-purple-400/40"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            ) : (
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
              >
                <span className="cursor-pointer text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 px-5 py-2 rounded-lg shadow flex items-center gap-2 hover:from-purple-700 hover:to-blue-600 transition-all border border-purple-400/40">
                  👋 {profile?.name || user.displayName || 'Anonymous'}
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}