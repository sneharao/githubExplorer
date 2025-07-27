import { useState } from "react";

// SearchBar component for better organization
interface SearchBarProps {
    onSearchClick: (arg: string) => void; // For button click submission
    placeholder?: string;
}
function SearchBar({ onSearchClick, placeholder = "Search repositories..." }: SearchBarProps) {
    const [value, setValue] = useState('');
    return (<form className="w-100 m-6 flex rounded-lg shadow-sm overflow-hidden h-12">
        <input
            type="text"
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="flex-grow p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 rounded-l-lg"
        />
        <button
            type="button"
            onClick={(e) => { e.preventDefault(); onSearchClick(value) }}
            className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
            aria-label="Search" // Add aria-label for accessibility
        >
            {/* Inline SVG for the arrow icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
            >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </svg>
        </button>
    </form>);
}

export default SearchBar;
