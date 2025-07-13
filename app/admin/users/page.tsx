'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Link from 'next/link'

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    const snapshot = await getDocs(collection(db, 'users'))
    const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setUsers(userList)
    setFilteredUsers(userList)
    setLoading(false)
  }

  const toggleBanStatus = async (userId: string, currentStatus: string) => {
    const userRef = doc(db, 'users', userId)
    const newStatus = currentStatus === 'banned' ? 'active' : 'banned'
    await updateDoc(userRef, { status: newStatus })

    setUsers(prev =>
      prev.map(user => (user.id === userId ? { ...user, status: newStatus } : user))
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setSearchTerm(value)
    const filtered = users.filter(user =>
      user.name?.toLowerCase().includes(value) ||
      user.email?.toLowerCase().includes(value) ||
      user.role?.toLowerCase().includes(value)
    )
    setFilteredUsers(filtered)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-0 md:p-6 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-purple-950 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg"><span className='text-white'>👥</span> User Management</h2>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-full md:w-72 shadow"
            />
            <button
              onClick={fetchUsers}
              className="text-sm bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-5 py-2 rounded-lg font-bold shadow-lg border border-purple-400/40 transition-all"
            >
              Refresh
            </button>
            <Link href='/admin' className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-5 py-2 rounded-full font-bold shadow-lg border border-purple-400/40 hover:from-purple-700 hover:to-blue-600 transition-all'>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12l6-6M3 12l6 6" /></svg>
              Home
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-purple-900/20 shadow-xl bg-white/5 backdrop-blur-md">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-purple-900 via-gray-900 to-blue-900 text-purple-200">
              <tr>
                <th className="text-left px-6 py-4 font-bold">Name</th>
                <th className="text-left px-6 py-4 font-bold">Email</th>
                <th className="text-left px-6 py-4 font-bold">Role</th>
                <th className="text-left px-6 py-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-t border-purple-900/20 hover:bg-purple-900/30 transition-all">
                  <td className="px-6 text-gray-100 py-4">{user.name || '-'}</td>
                  <td className="px-6 text-gray-100 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.role === 'admin' ? (
                      <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-purple-700 to-blue-700 text-white font-semibold shadow">Admin</span>
                    ) : (
                      <span className="px-3 py-1 text-xs rounded-full bg-gray-700 text-gray-200 font-semibold">User</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'user' && (
                      <button
                        onClick={() => toggleBanStatus(user.id, user.status)}
                        className={`px-4 py-1.5 rounded-full text-white font-bold shadow transition-all ${user.status === 'banned'
                          ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                          }`}
                      >
                        {user.status === 'banned' ? 'Unban' : 'Ban'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && <p className="text-gray-400 text-sm mt-4">Loading users...</p>}
      </div>
    </div>
  )
}
