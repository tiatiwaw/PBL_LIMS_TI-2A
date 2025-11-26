import React from "react";
import { methods as defaultMethods } from "@/data/client/methods";
import ScrollArrow from "@/components/ui/scroll-arrow"; // ⬅️ IMPORT DI SINI

export default function AnalysisMethodList({ methods = defaultMethods }) {
    const formatRupiah = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const scrollLeft = () => {
        document.getElementById("method-scroll")?.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        document.getElementById("method-scroll")?.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    };

    return (
        <div className="bg-[#E9F8F8] rounded-xl p-6 relative">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
                Nama dan Harga Metode
            </h2>

            <div className="relative">
                {/* Tombol Scroll Kiri */}
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                    <ScrollArrow direction="left" onClick={scrollLeft} />
                </div>

                {/* Tombol Scroll Kanan */}
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 z-10 hidden md:block">
                    <ScrollArrow direction="right" onClick={scrollRight} />
                </div>

                {/* Scroll Container */}
                <div
                    id="method-scroll"
                    className="overflow-x-auto scroll-smooth pb-4"
                >
                    <div className="flex gap-6 min-w-max">
                        {methods.map((item) => (
                            <div
                                key={item.id}
                                className="p-5 rounded-xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-all w-[350px] flex-shrink-0"
                            >
                                <p className="text-sm text-gray-500 font-semibold">
                                    Nama Metode
                                </p>
                                <p className="text-lg font-bold text-primary-hijauTua mb-3">
                                    {item.name}
                                </p>

                                <p className="text-sm text-gray-500 font-semibold">
                                    Harga
                                </p>
                                <p className="text-lg font-bold text-primary-hijauTua">
                                    {formatRupiah(item.harga)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
