'use client'

import { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await updateProfile(user, {
        displayName: fullName,
      })

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: fullName,
        email: user.email,
        avatar: '',
        role: 'user',
        createdAt: new Date(),
      })

      toast.success('Account created! 🎉')
      router.push('/')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email,
          avatar: user.photoURL || '',
          role: 'user',
          createdAt: new Date(),
        })
      }

      toast.success('Signed up with Google!')
      router.push('/')
    } catch (err: any) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
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
        <div className=" p-1 rounded-full mb-4 ">
          <img src="/Logo.png" alt="Logo" className="h-10 w-45 rounded-full " />
        </div>
        <h2 className="text-3xl font-extrabold mb-7 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-center drop-shadow-lg"><span className='text-white'>📝</span> Register</h2>

        <form onSubmit={handleRegister} className="space-y-5 w-full">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-gray-900/80 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 ring-purple-500 border border-purple-900/30 shadow"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="my-4 text-center text-gray-400 font-semibold">or</div>

        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white/90 text-gray-800 font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition border border-purple-400/20 shadow"
          disabled={loading}
        >
          <FcGoogle size={24} /> Sign up with Google
        </button>
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account? <Link href="/login" className="text-purple-400 hover:underline font-semibold">Login</Link>
        </p>
      </div>
    </div>
  )
}