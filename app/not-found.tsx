"use client"
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 px-4 py-12">
      <div className="bg-white/5 backdrop-blur-md border border-purple-900/20 rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center max-w-lg w-full">
        <div className="flex flex-col items-center mb-6">
          <span className="text-7xl mb-2 animate-float">🚫</span>
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-blue-400 drop-shadow-lg mb-2">404</h1>
        </div>
        <p className="text-2xl font-bold text-white mb-2 text-center">Oops! Blog not found</p>
        <p className="text-gray-300 mb-6 text-center">The blog you’re looking for may have been deleted or never existed.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-6 py-2.5 rounded-full shadow-lg border border-purple-400/40 hover:from-purple-700 hover:to-blue-600 transition-all font-bold text-base">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 01-1 1h-3m-6 0h6" /></svg>
          Go to Homepage
        </Link>
      </div>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
