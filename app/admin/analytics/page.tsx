'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AnalyticsChart from '@/components/AnalyticsChart'

export default function AdminAnalyticsPage() {
    return (
        <div className="bg-gradient-to-br from-[#1f1f1f] via-[#3b0764] to-[#111827] min-h-screen text-white flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center py-14 px-4">
                <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-purple-900/20 rounded-2xl p-10 shadow-2xl flex flex-col items-center">
                    <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-lg text-center">
                        📊 Admin Analytics
                    </h1>
                    <AnalyticsChart />
                </div>
            </main>
            <Footer />
        </div>
    )
}
