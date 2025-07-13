'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, limit, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import BlogCard from './BlogCard'
import Link from 'next/link'

export default function LatestBlog() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(
          collection(db, 'blogs'),
          orderBy('createdAt', 'desc'),
          limit(2)
        )
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setBlogs(data)
      } catch (error) {
        console.error('Error fetching latest blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) return (
    <div className="py-16 px-4 sm:px-10 bg-gray-900 text-white flex flex-col items-center">
      <div className="animate-pulse text-lg text-purple-300">Loading latest blogs...</div>
    </div>
  )

  return (
    <section className="py-16 px-4 sm:px-10 bg-gradient-to-br from-gray-900 via-gray-950 to-[#1f1f1f] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/globe.svg')] bg-center bg-no-repeat bg-cover pointer-events-none animate-pulse" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg">
          <span className='text-white'>🆕</span> Latest Blogs
        </h2>
        <div className="flex justify-center mb-10">
          <span className="block w-32 h-1 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogs.map((blog) => (
            <div key={blog.id} className="rounded-2xl bg-white/5 backdrop-blur-md shadow-xl border border-purple-900/20 hover:scale-[1.02] transition-transform duration-200">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-200 border-2 border-transparent hover:border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-400/40 text-lg"
          >
            <span>Show all</span>
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
