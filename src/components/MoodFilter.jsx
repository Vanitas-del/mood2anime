import Button from "./Button";
import moods from "../assets/mood.js";
import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
};

export function MoodFilter({ selectedGenre, toggleGenre }) {
    return (
        <motion.div variants={container} initial="hidden" animate="show">
            <h1 className="my-6 text-center lg:text-5xl text-4xl font-extrabold text-primary">
                Discover Top-rated Anime Based on Your Mood
            </h1>
            <p className="text-center text-gray-500 mb-4">
                How are you feeling right now?
            </p>

            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mood-center-container px-2">
                {Object.entries(moods).map(([mood, genre], index) => (
                    <motion.div key={index} variants={item}>
                        <Button
                            text={mood}
                            className={"w-full"}
                            onClick={() => toggleGenre(mood, genre)}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
