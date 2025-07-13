import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LatestBlog from '@/components/LatestBlog'
import Link from 'next/link'


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-28 text-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('/globe.svg')] bg-center bg-no-repeat bg-cover pointer-events-none animate-pulse" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-xl tracking-tight">
            <span className="inline-block animate-fade-in-up">🚀 Welcome to</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient-x">LearnLoop</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-10 max-w-3xl mx-auto text-gray-200 font-medium animate-fade-in-up delay-100">
            Your source for{' '}
            <span className="font-bold text-pink-300">Programming</span>,{' '}
            <span className="font-bold text-blue-300">Web Dev</span>,{' '}
            <span className="font-bold text-purple-200">AI/ML</span>, and{' '}
            <span className="font-bold text-yellow-200">Data Insights</span>
          </p>
          <Link
            href="/blogs"
            className="inline-block relative font-bold px-10 py-4 rounded-full shadow-xl text-lg bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-200 border-2 border-transparent hover:border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-400/40 animate-bounce"
            style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
          >
            <span className="bg-white/10 px-6 py-2 rounded-full backdrop-blur-md">Explore Blogs</span>
          </Link>
        </div>
        {/* Decorative SVG Wave */}
        <svg className="absolute bottom-0 left-0 w-full" height="80" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="url(#wave-gradient)" fillOpacity="1" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,37.3C960,32,1056,32,1152,37.3C1248,43,1344,53,1392,58.7L1440,64L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z" />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a78bfa" />
              <stop offset="0.5" stopColor="#f472b6" />
              <stop offset="1" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </svg>
      </section>

      {/* Latest Blogs */}
      <LatestBlog />

      <Footer />
    </main>
  )
}
