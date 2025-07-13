'use client'

import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in successfully')
      router.push('/')
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success('Google login successful')
      router.push('/')
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1f1f] via-[#3b0764] to-[#111827] flex items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-10 max-w-md w-full shadow-2xl border border-purple-900/20 flex flex-col items-center relative">
        {/* Cross Icon for Go to Homepage */}
        <Link
          href="/"
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Go to homepage"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
        <div className="p-1 rounded-full mb-4 shadow-lg">
          <img src="/Logo.png" alt="Logo" className="h-10 w-45 rounded-full " />
        </div>
        <h2 className="text-3xl font-extrabold mb-7 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-center drop-shadow-lg"><span className='text-white'>🔐</span> Login</h2>

        <form onSubmit={handleLogin} className="space-y-5 w-full">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-900/80 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 ring-purple-500 border border-purple-900/30 shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-900/80 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 ring-purple-500 border border-purple-900/30 shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all border border-purple-400/40"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="my-4 text-center text-gray-400 font-semibold">or</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white/90 text-gray-800 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition border border-purple-400/20 shadow"
          disabled={loading}
        >
          <FcGoogle size={24} /> Sign in with Google
        </button>
        <p className="text-right text-sm text-gray-400 mt-2 w-full">
          <a href="/forgot-password" className="hover:underline text-purple-400 font-semibold">
            Forgot Password?
          </a>
        </p>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don’t have an account? <a href="/register" className="text-purple-400 hover:underline font-semibold">Register</a>
        </p>
      </div>
    </div>
  )
}
