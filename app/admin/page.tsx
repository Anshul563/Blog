'use client'

import { useAuth } from '@/lib/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { ClipboardList, Users, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const { user, profile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || profile?.role !== 'admin') {
      router.push('/')
    }
  }, [user, profile])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1f1f] via-[#3b0764] to-[#111827] px-0 sm:px-10 py-12 text-white flex flex-col relative overflow-x-hidden">
      {/* Subtle animated background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-700/30 via-pink-500/20 to-blue-700/30 rounded-full blur-3xl opacity-60 animate-pulse z-0 pointer-events-none" />

      {/* Go to Homepage Button */}
      <div className="fixed top-6 right-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-full shadow-lg border border-blue-400/40 hover:from-blue-700 hover:to-pink-600 transition-all font-bold text-base backdrop-blur-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 01-1 1h-3m-6 0h6" /></svg>
          {/* Go to Homepage */}
        </Link>
      </div>

      <header className="mb-14 flex flex-col items-center z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-5xl animate-spin-slow">⚙️</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg animate-gradient-x">Admin Dashboard</h1>
        </div>
        <p className="text-gray-300 text-center max-w-2xl">Welcome, admin! Use the dashboard below to manage users and view analytics. Enjoy a streamlined and modern experience.</p>
      </header>

      <div className="flex justify-center w-full z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl justify-items-center">
          {/* Card: Manage Users */}
          <Link
            href="/admin/users"
            className="group bg-white/5 backdrop-blur-md border-2 border-purple-700/30 rounded-3xl p-10 shadow-2xl hover:shadow-3xl hover:scale-[1.04] transition-all duration-200 relative overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-gradient-to-br before:from-purple-400/60 before:to-pink-400/60 before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300 w-full max-w-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-purple-300 group-hover:text-white transition">👥 Manage Users</h2>
              <span className="bg-purple-900/30 p-3 rounded-full shadow-lg">
                <Users className="w-8 h-8 text-purple-300 group-hover:text-white transition" />
              </span>
            </div>
            <p className="text-gray-400 group-hover:text-gray-200 transition">Ban/unban users or change their roles.</p>
            <div className="absolute right-6 bottom-6 opacity-10 text-8xl pointer-events-none select-none animate-float">👥</div>
          </Link>

          {/* Card: Blog Analytics */}
          <Link
            href="/admin/analytics"
            className="group bg-white/5 backdrop-blur-md border-2 border-blue-700/30 rounded-3xl p-10 shadow-2xl hover:shadow-3xl hover:scale-[1.04] transition-all duration-200 relative overflow-hidden before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-gradient-to-br before:from-blue-400/60 before:to-purple-400/60 before:opacity-0 group-hover:before:opacity-100 before:transition-all before:duration-300 w-full max-w-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-300 group-hover:text-white transition">📊 Blog Analytics</h2>
              <span className="bg-blue-900/30 p-3 rounded-full shadow-lg">
                <BarChart3 className="w-8 h-8 text-blue-300 group-hover:text-white transition" />
              </span>
            </div>
            <p className="text-gray-400 group-hover:text-gray-200 transition">Track blog views, performance, and statistics.</p>
            <div className="absolute right-6 bottom-6 opacity-10 text-8xl pointer-events-none select-none animate-float">📊</div>
          </Link>
        </div>
      </div>

      {/* Custom keyframes for subtle animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease-in-out infinite;
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  )
}
