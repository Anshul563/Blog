import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1f1f1f] via-[#3b0764] to-[#111827] border-t border-purple-900/30 mt-16 rounded-t-3xl shadow-2xl backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-300">
        {/* Column 1: Logo & About */}
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 p-1 rounded-full mb-3 shadow-lg">
            <Image src="/Logo.png" alt="Logo" width={120} height={40} className="h-10 w-28 rounded-full bg-white/80 object-contain" />
          </div>

          <p className="text-gray-400 text-center md:text-left">Your daily source for Web Dev, Programming, AI, and more.</p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center">
          <h4 className="text-lg font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-purple-400 transition-colors font-semibold">Home</Link></li>
            <li><Link href="/blogs" className="hover:text-purple-400 transition-colors font-semibold">Blogs</Link></li>
            <li><Link href="/contact" className="hover:text-purple-400 transition-colors font-semibold">Contact</Link></li>
            <li><Link href="/login" className="hover:text-purple-400 transition-colors font-semibold">Login</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact & Socials */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="text-lg font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Contact</h4>
          <p className="text-gray-400">Email: <a href="mailto:support@techblog.com" className="hover:text-purple-400 transition-colors">support@techblog.com</a></p>
          <div className="flex gap-4 mt-4">
            <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors text-xl"><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.936 0 .39.045.765.127 1.124C7.728 8.89 4.1 7.13 1.671 4.149c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.014-.633A9.936 9.936 0 0 0 24 4.557z"/></svg></Link>
            <Link href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors text-xl"><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.624-5.475 5.921.43.372.823 1.104.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z"/></svg></Link>
            <Link href="mailto:support@techblog.com" className="hover:text-pink-400 transition-colors text-xl"><svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 13.065L.015 6.5A2.003 2.003 0 0 1 2 4h20a2.003 2.003 0 0 1 1.985 2.5L12 13.065zm11.985-4.5l-9.985 6.565-9.985-6.565A1.993 1.993 0 0 0 0 6.5v11A2.5 2.5 0 0 0 2.5 20h19a2.5 2.5 0 0 0 2.5-2.5v-11a1.993 1.993 0 0 0-1.015-1.935z"/></svg></Link>
          </div>
          <p className="mt-4 text-gray-500 text-xs">Made with <span className="text-pink-400">❤️</span> by Anshul Shakya</p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-purple-900/30">
        © {new Date().getFullYear()} LearnLoop. All rights reserved.
      </div>
    </footer>
  );
}
