'use client'

import { useAuth } from '@/lib/authContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, profile, logout } = useAuth()
  const router = useRouter()
  const [myBlogs, setMyBlogs] = useState<any[]>([])
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const handleDeleteBlog = async (blogId: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    setDeletingId(blogId);
    try {
      await deleteDoc(doc(db, 'blogs', blogId));
      setMyBlogs((prev) => prev.filter((b) => b.id !== blogId));
    } catch (err: any) {
      alert(err.message || 'Failed to delete blog');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchMyBlogs = async () => {
      const q = query(collection(db, 'blogs'), where('authorId', '==', user.uid))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setMyBlogs(data)
    }

    fetchMyBlogs()
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1f1f] via-[#3b0764] to-[#111827] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto py-14 px-4">
        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg"><span className='text-white'>👤</span> My Profile</h1>

        <div className="bg-white/5 backdrop-blur-md border border-purple-900/20 rounded-2xl p-8 shadow-xl mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-lg font-bold mb-1 text-purple-300">{profile?.name || 'N/A'}</p>
            <p className="text-gray-300 text-sm">{profile?.email || 'N/A'}</p>
          </div>
          <button
            onClick={() => router.push('/change-password')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition border border-blue-300/30"
          >
            🔐 Change Password
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"><span className='text-white'>📝</span> My Blogs</h2>
        {myBlogs.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md border border-purple-900/20 rounded-xl p-6 text-center text-gray-400 shadow">
            You haven't posted any blogs yet.
          </div>
        ) : (
          <ul className="space-y-4">
            {myBlogs.map((blog) => (
              <li key={blog.id} className="bg-white/5 backdrop-blur-md border border-purple-900/20 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow hover:scale-[1.02] transition-transform duration-200">
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2">
                  <Link href={`/blogs/${blog.id}`} className="text-purple-300 font-semibold hover:underline text-lg">
                    {blog.title}
                  </Link>
                  <span className="text-xs text-gray-400">{blog.createdAt?.toDate?.().toDateString?.() || ''}</span>
                </div>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  disabled={deletingId === blog.id}
                  className="mt-2 md:mt-0 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold px-4 py-2 rounded-lg shadow transition-all border border-red-400/40 text-sm"
                >
                  {deletingId === blog.id ? 'Deleting...' : 'Delete Blog'}
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={logout}
          className="mt-12 w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all border border-red-400/40"
        >
          🚪 Logout
        </button>
      </div>

      <Footer />
    </div>
  )
}
