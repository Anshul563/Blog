'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Sidebar from '@/components/Sidebar'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Footer from '@/components/Footer'

const categories = ['All', 'Web Development', 'AI / ML', 'Programming', 'Data Analytics']

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
        const snapshot = await getDocs(q)
        const blogList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setBlogs(blogList)
      } catch (err) {
        console.error('Error fetching blogs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const filteredBlogs =
    selectedCategory === 'All'
      ? blogs
      : blogs.filter(blog => blog.category === selectedCategory)

  return (
    <div className="relative bg-gradient-to-br from-[#1f1f1f] to-[#3b0764] min-h-screen text-white flex flex-col">
      {/* Top Right Button */}
      <div className="md:block fixed top-6 right-6 z-50">
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold border border-blue-300/30"
        >
          🏠 Go to Home
        </Link>
      </div>

      {/* Hamburger (Mobile) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="text-white hover:text-purple-400 bg-[#1f1f1f]/80 p-2 rounded-full shadow-lg border border-purple-900/30"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Sidebar Desktop */}
      <div className="hidden md:block fixed left-0 top-0 w-[20%] h-full p-6">
        <Sidebar
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Sidebar Mobile */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-[#1f1f1f]/70 backdrop-blur-md flex">
          <div className="fixed top-0 left-0 w-72 h-full bg-gradient-to-br from-[#1f1f1f] via-[#3b0764] to-[#111827] p-6 shadow-2xl z-50 rounded-r-2xl border-r border-purple-900/30 flex flex-col">
            <button
              className="text-white absolute top-4 right-4 hover:text-red-400"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <X size={24} />
            </button>

            <Sidebar
              categories={categories}
              selected={selectedCategory}
              onSelect={(cat) => {
                setSelectedCategory(cat)
                setMobileSidebarOpen(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Blog List */}
      <main className="md:ml-[20%] mt-4 p-6 flex-1">
        <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg">📰 Blogs</h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="animate-pulse text-lg text-purple-300">Loading blogs...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <span className="text-gray-400">No blogs found in this category.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <div key={blog.id} className="rounded-2xl bg-white/5 backdrop-blur-md shadow-xl border border-purple-900/20 hover:scale-[1.02] transition-transform duration-200">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  )
}
