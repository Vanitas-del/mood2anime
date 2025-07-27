import Button from "./Button";
import moods from "../assets/mood.js";

export default function MoodFilter({ selectedGenre, toggleGenre }) {
  return (
    <div className="text-center px-4 py-8 text-white transition-all duration-300 ease-in-out">
      <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-wide bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
        Discover top-rated Anime based on your mood
      </h1>
      <p className="text-gray-400 text-lg mb-8 font-light">How are you feeling right now?</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
        {Object.entries(moods).map(([mood, genre], index) => (
          <Button
            key={index}
            text={mood}
            className={`w-full text-sm ${
              selectedGenre.includes(genre) ? 'bg-purple-800' : 'btn-outline border-purple-500'
            }`}
            onClick={() => toggleGenre(mood, genre)}
          />
        ))}
      </div>
    </div>
  );
}
