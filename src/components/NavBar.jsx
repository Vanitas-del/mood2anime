export default function NavBar({ onBackClick, selectedMood }) {
  return (
    <nav className="w-full mt-4 py-3 px-4 bg-white dark:bg-slate-800 shadow-md rounded-xl flex items-center justify-between max-w-5xl mx-auto">
      {/* Left - Back Icon */}
      <button
        onClick={onBackClick}
        className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 hover:scale-110 transition"
        title="Back"
      >
        ⛩️
      </button>

      {/* Center - Title */}
      <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wide">
        {selectedMood ? selectedMood : 'Mood2Anime'}
      </h1>

      {/* Right - Home Icon */}
      <button
        onClick={onBackClick}
        className="hover:scale-110 transition"
        title="Home"
      >
        <svg
          height="24"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="text-gray-700 dark:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" />
        </svg>
      </button>
    </nav>
  );
}
