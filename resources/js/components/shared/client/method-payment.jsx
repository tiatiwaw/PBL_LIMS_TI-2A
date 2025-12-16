import React from "react";
import { method_payment } from "@/data/client/method_payment";

export default function MethodPayment({ selected, setSelected, channels = [] }) {
    const payment = method_payment[0];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
                Pilih Metode Pembayaran :{" "}
                <span className="text-primary-hijauTua">
                {channels.find(c => c.code === selected)?.name || " "}
                </span>
            </h2>


            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {channels.map((channel, i) => {
                const isActive = selected === channel.code;

                return (
                    <div
                        key={i}
                        onClick={() => setSelected(channel.code)}
                        className={`
                            cursor-pointer flex flex-col items-center justify-center 
                            p-3 rounded-lg transition bg-white text-center
                            ${isActive ? "border-4 border-primary-hijauTua" : "border-2 border-gray-300 hover:border-gray-400"}
                        `}
                    >
                        {/* LOGO */}
                        <img
                            src={`/logo_payment/${channel.code}.jpeg`}
                            alt={channel.name}
                            className="w-16 h-16 object-contain mb-2"
                            onError={(e) => {
                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect fill='%23f0f0f0' width='64' height='64'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='12' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                            }}
                        />

                        {/* Nama metode */}
                        <span className="text-sm font-medium text-gray-700">{channel.name}</span>
                    </div>
                );
            })}
            </div>
        </div>
    );
}
