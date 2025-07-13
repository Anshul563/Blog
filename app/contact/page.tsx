'use client'

import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import Link from 'next/link'


export default function ContactPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await addDoc(collection(db, 'contacts'), {
                ...form,
                createdAt: serverTimestamp(),
            })
            toast.success('Message sent! ✅')
            setForm({ name: '', email: '', subject: '', message: '' })
        } catch (error) {
            toast.error('Failed to send message ❌')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-blue-950 text-white px-2 sm:px-8 py-16 flex items-center justify-center">
            <div className="relative w-full max-w-3xl mx-auto bg-white/5 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-2xl border border-purple-900/20">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg"><span className='text-white'>📩</span> Contact Us</h1>
                    <Link href='/'>
                        <span className='inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-110 transition-all border-2 border-purple-400/40'>
                            &#10005;
                        </span>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-lg outline-none border border-purple-700 focus:ring-2 focus:ring-purple-500 text-base shadow"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-lg outline-none border border-purple-700 focus:ring-2 focus:ring-purple-500 text-base shadow"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        className="w-full bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-lg outline-none border border-purple-700 focus:ring-2 focus:ring-purple-500 text-base shadow"
                        value={form.subject}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows={5}
                        className="w-full bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-lg outline-none border border-purple-700 focus:ring-2 focus:ring-purple-500 text-base shadow resize-none"
                        value={form.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition-all text-lg border border-purple-400/40"
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    )
}
