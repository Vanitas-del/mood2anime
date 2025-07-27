export default function NavBar({ onBackClick, selectedMood }) {
  return (
    <div className="w-full px-4 py-3 bg-gradient-to-b from-zinc-950 to-black border-b border-zinc-800 shadow-md mb-6 rounded-b-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="btn btn-ghost text-white text-3xl hover:text-purple-400 transition duration-200"
        >
          ⛩️
        </button>

        {/* Center Title */}
        <h1 className="text-white font-bold text-2xl tracking-wide bg-gradient-to-r from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent transition-all">
          {selectedMood ? selectedMood : 'Mood2Anime'}
        </h1>

        {/* Home Icon */}
        <button
          onClick={onBackClick}
          className="btn btn-ghost btn-circle transition hover:bg-zinc-800 p-2"
        >
          <svg height="24px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="#ffffff"/>
          </svg>
        </button>

      </div>
    </div>
  );
}
