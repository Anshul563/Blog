interface Props {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

export default function Sidebar({ categories, selected, onSelect }: Props) {
  return (
    <aside className="rounded-2xl bg-white/5 backdrop-blur-md shadow-xl border border-purple-900/20 p-6 flex flex-col items-center">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className=" p-1 rounded-full mb-2 shadow-lg">
          <img
            src="/Logo.png"
            alt="Logo"
            className="h-10 w-48 rounded-full hover:scale-110 transition-transform duration-200 shadow"
          />
        </div>
        
      </div>
      <h2 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">📂 Categories</h2>
      <ul className="flex flex-col gap-3 w-full">
        {categories.map((category, idx) => (
          <li
            key={idx}
            onClick={() => onSelect(category)}
            className={`cursor-pointer px-4 py-2 rounded-full text-center font-semibold transition-all duration-200 border border-transparent
              ${selected === category
                ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white shadow-lg border-purple-400/40 scale-105'
                : 'bg-white/10 text-purple-200 hover:bg-purple-400/20 hover:text-white'}
            `}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  )
}
