'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/authContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Navbar from '@/components/Navbar'

// Import CSS for the editor
import 'react-markdown-editor-lite/lib/index.css'
// import 'github-markdown-css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const categories = ['Web Development', 'Programming', 'AI / ML', 'Data Analytics']

export default function PostBlog() {
  const { user } = useAuth()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        imageUrl,
        category,
        content,
        authorName: user?.displayName || '',
        authorEmail: user?.email || '',
        authorId: user?.uid,
        createdAt: serverTimestamp(),
        approved: false
      })

      toast.success('🎉 Blog posted successfully!')
      router.push('/blogs')
    } catch (err: any) {
      console.error('🔥 Firebase Error:', err)
      toast.error(err.message || 'Failed to post blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-[#1f1f1f] via-[#3b0764] to-[#111827] min-h-screen text-white">
      <Navbar />
      <div className="py-14 px-4 flex justify-center">
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-purple-900/20 rounded-2xl p-10 shadow-2xl flex flex-col items-center relative">
          
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-center drop-shadow-lg mb-8"><span className='text-white'>📝</span> Post a New Blog</h1>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <input
              type="text"
              placeholder="Blog Title"
              className="w-full bg-gray-900/80 px-4 py-3 rounded-lg text-white outline-none focus:ring-2 ring-purple-500 border border-purple-900/30 shadow"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Image URL"
              className="w-full bg-gray-900/80 px-4 py-3 rounded-lg text-white outline-none focus:ring-2 ring-purple-500 border border-purple-900/30 shadow"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />

            <select
              className="w-full bg-gray-900/80 px-4 py-3 rounded-lg text-white outline-none focus:ring-2 ring-purple-500 border border-purple-900/30 shadow"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div data-color-mode="dark">
              <MDEditor
                value={content}
                onChange={(value) => setContent(value || '')}
                height={400}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all border border-purple-400/40"
            >
              {loading ? 'Posting...' : '🚀 Post Blog'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
