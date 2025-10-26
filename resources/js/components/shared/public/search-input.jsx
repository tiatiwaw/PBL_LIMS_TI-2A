import { Search } from "lucide-react";
import React from "react";

export default function SearchInput() {
    return (
        <div className="w-full rounded-md max-w-sm">
            <div className="relative">
                <input
                    className="w-full bg-transparent placeholder:text-primary-hijauTua text-primary-hijauTua text-sm border border-primary-hijauTua rounded-md pr-3 pl-14 py-2 transition duration-300 ease focus:outline-none focus:border-primary-hijauTua hover:border-primary-hijauTua shadow-sm focus:shadow"
                    placeholder="Search"
                />
                <button
                    className="absolute top-1 left-1 flex items-center rounded py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary-hijauTua focus:shadow-none active:bg-primary-hijauTua hover:bg-primary-toska active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                >
                    <Search size={16} className="mr-1 text-primary-hijauTua" />
                </button>
            </div>
        </div>
    );
}
