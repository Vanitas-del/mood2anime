export default function Button({ onClick, disabled, className = "", text }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition duration-200 px-5 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed ${className}`}
        >
            <span className="text-white text-sm md:text-base font-semibold uppercase">
                {text}
            </span>
        </button>
    );
}
