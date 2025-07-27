import { motion } from "framer-motion";

export default function Button({ onClick, disabled, className = "", text }) {
    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`px-5 py-2 rounded-xl font-semibold tracking-wide transition-all duration-300 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white'} bg-white text-primary border border-primary`}
        >
            {text}
        </motion.button>
    );
}
