'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Bar, Pie } from 'react-chartjs-2'
import Link from 'next/link'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js'

// Register required Chart.js modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
)

export default function AnalyticsChart() {
    const [blogData, setBlogData] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(collection(db, 'blogs'))
            const data = snapshot.docs.map(doc => doc.data())
            setBlogData(data)
        }

        fetchData()
    }, [])

    // ✅ Group blogs by month
    const monthlyCounts: Record<string, number> = {}
    blogData.forEach(blog => {
        const date = blog.createdAt?.toDate?.()
        if (date) {
            const month = date.toLocaleString('default', { month: 'short', year: 'numeric' })
            monthlyCounts[month] = (monthlyCounts[month] || 0) + 1
        }
    })

    const barData = {
        labels: Object.keys(monthlyCounts),
        datasets: [
            {
                label: 'Blogs per Month',
                data: Object.values(monthlyCounts),
                backgroundColor: '#6366f1',
            },
        ],
    }

    // ✅ Count blogs by category
    const categoryCount: Record<string, number> = {}
    blogData.forEach(blog => {
        const cat = blog.category || 'Unknown'
        categoryCount[cat] = (categoryCount[cat] || 0) + 1
    })

    const pieData = {
        labels: Object.keys(categoryCount),
        datasets: [
            {
                label: 'Blogs per Category',
                data: Object.values(categoryCount),
                backgroundColor: ['#6366f1', '#22d3ee', '#f43f5e', '#10b981', '#f59e0b'],
            },
        ],
    }

    return (
        <div className="text-white p-0 md:p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg mb-2 md:mb-0">📊 Blog Analytics</h2>
                <Link href='/admin' className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:from-purple-700 hover:to-blue-600 transition-all border border-purple-400/40'>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    Back
                </Link>
            </div>

            {/* Bar Chart: Blogs per Month */}
            <div className="flex w-full gap-8 flex-col md:flex-row">
                <div className="bg-white/5 backdrop-blur-md w-full md:w-1/2 p-8 rounded-2xl shadow-xl border border-purple-900/20 flex flex-col items-center mb-6 md:mb-0">
                    <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Monthly Blog Posts</h3>
                    <Bar data={barData} options={{ responsive: true }} />
                </div>

                {/* Pie Chart: Blogs per Category */}
                <div className="bg-white/5 backdrop-blur-md w-full md:w-1/2 p-8 rounded-2xl shadow-xl border border-purple-900/20 flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Blogs by Category</h3>
                    <Pie data={pieData} options={{ responsive: true }} />
                </div>
            </div>
        </div>
    )
}
