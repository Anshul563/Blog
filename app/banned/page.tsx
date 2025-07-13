'use client'

import Link from 'next/link'

export default function BannedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 px-4 py-12">
      <div className="bg-white/5 backdrop-blur-md border border-purple-900/20 rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center max-w-lg w-full">
        <span className="text-6xl mb-4 animate-float">🚫</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-blue-400 drop-shadow-lg mb-3 text-center">Account Banned</h1>
        <p className="text-lg mb-6 text-center text-gray-200">
          Your account has been banned. Please contact the support team for more information.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-6 py-2.5 rounded-full shadow-lg border border-purple-400/40 hover:from-purple-700 hover:to-blue-600 transition-all font-bold text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8v13H3V8m9-6l9 6-9 6-9-6 9-6z" /></svg>
          Contact Support
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
