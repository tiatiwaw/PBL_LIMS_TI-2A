import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScrollArrow({ direction = "left", onClick }) {
    const isLeft = direction === "left";

    return (
        <button
            onClick={onClick}
            className="bg-primary-hijauTua text-white shadow-md p-2 rounded-full hover:bg-primary-hijauTua/80 transition hidden md:flex items-center justify-center"
        >
            {isLeft ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
    );
}
