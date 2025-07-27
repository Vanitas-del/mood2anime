import Button from "./Button";
import moods from "../assets/mood.js";

export default function MoodFilter({ selectedGenre, toggleGenre }) {
    return (
        <section className="text-center mt-10 px-4">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                Discover Top-Rated Anime Based on Your Mood
            </h1>
            <p className="text-base lg:text-lg text-gray-400 mb-6">
                How are you feeling right now?
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 place-items-center">
                {Object.entries(moods).map(([mood, genre], index) => (
                    <Button
                        key={index}
                        text={mood}
                        className="btn-outline transition duration-200 hover:scale-105"
                        onClick={() => toggleGenre(mood, genre)}
                        aria-label={`Select mood: ${mood}`}
                    />
                ))}
            </div>
        </section>
    );
}
