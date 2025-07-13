'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/authContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ReactMarkdown from 'react-markdown'
import ShareButtons from '@/components/ShareButtons'

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: blogId } = use(params)
  const [blog, setBlog] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  // 📄 Fetch Blog Data
  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, 'blogs', blogId)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        router.push('/404')
        return
      }

      setBlog(docSnap.data())
      setLoading(false)
    }

    fetchBlog()
  }, [blogId, router])

  if (loading || !blog) return <p className="text-white p-10">Loading...</p>

  const fullUrl =
    typeof window !== 'undefined'
      ? window.location.href
      : `https://yourdomain.com/blogs/${blogId}`

  return (
    <div>
      <Navbar />

      <div className="min-h-screen px-4 sm:px-10 py-14 bg-gradient-to-br from-[#1f1f1f] via-[#3b0764] to-[#111827] text-white flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-900/20 p-8 flex flex-col items-center">
          {/* Blog Title */}
          <h1 className="text-4xl sm:text-5xl text-center font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg">
            {blog.title}
          </h1>

          {/* Category */}
          <p className="text-xs sm:text-sm uppercase tracking-widest font-bold text-purple-300 mb-2">
            {blog.category}
          </p>

          {/* Author & Date */}
          <p className="text-sm text-gray-300 text-center mb-6">
            By <span className="font-semibold text-purple-200">{blog?.authorName || 'Unknown'}</span> on{' '}
            <span className="font-semibold text-blue-200">{blog.createdAt?.toDate?.().toDateString?.() || 'Date unavailable'}</span>
          </p>

          {/* Blog Image */}
          {blog.imageUrl && (
            <div className="w-full max-w-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl mb-8 overflow-hidden flex items-center justify-center h-64 shadow-lg border border-purple-900/30">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                className="object-contain max-h-full max-w-full transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-invert max-w-3xl mb-10 text-lg">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          {/* Social Share */}
          <div className="w-full flex flex-col items-center gap-4">
            <ShareButtons url={fullUrl} title={blog.title} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
