
import Link from 'next/link'
import Image from 'next/image'

export default function BlogCard({ blog }: { blog: any }) {
  return (
    <Link href={`/blogs/${blog.id}`} className="group">
      <div className="bg-white/5 backdrop-blur-md border border-purple-900/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-purple-600/40 hover:scale-[1.025] transition-all duration-300 cursor-pointer relative">
        {/* Image */}
        {blog.imageUrl && (
          <div className="w-full h-56 bg-[#170826] flex items-center justify-center overflow-hidden relative">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#170826]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-all duration-300" />
            <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-purple-400/40">
              {blog.category}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="p-5 space-y-2">
          {!blog.imageUrl && (
            <span className="inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow border border-purple-400/40 mb-2">
              {blog.category}
            </span>
          )}

          <h3 className="text-xl font-extrabold text-white group-hover:text-purple-300 line-clamp-2 transition-colors duration-200">
            {blog.title}
          </h3>

          <p className="text-base text-gray-300 line-clamp-3 font-medium">{blog.summary}</p>

          <div className="flex justify-between items-center text-xs text-gray-400 pt-4 border-t border-purple-900/30 mt-5">
            <span className="flex items-center gap-1"><span className="text-purple-300">👤</span> {blog.authorName || 'Unknown'}</span>
            <span className="flex items-center gap-1"><span className="text-blue-300">📅</span> {blog.createdAt?.toDate?.().toDateString?.() || 'Date unavailable'}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
