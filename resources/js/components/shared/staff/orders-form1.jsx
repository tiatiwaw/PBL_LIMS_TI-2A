import React, { useState } from "react";
import { Clients } from "@/data/staff/clients"; // pastikan path ini benar

export default function OrdersForm() {
    const [formData, setFormData] = useState({
        searchKlien: "",
        selectedKlien: null,
        judulOrder: "",
        metodeAnalisis: "",
        nomorOrder: "Auto-Generate Nomor order",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update input biasa
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Jika yang diubah adalah searchKlien → cari di dummyClients
        if (name === "searchKlien") {
            const found = Clients.find(
                (user) =>
                    user.name.toLowerCase().includes(value.toLowerCase()) ||
                    user.id.toString() === value
            );
            setFormData((prev) => ({ ...prev, selectedKlien: found || null }));
        }
    };

    const metodeOptions = [
        "Metode Analisis 1",
        "Metode Analisis 2",
        "Metode Analisis 3",
        "Metode Analisis 4",
    ];

    return (
        <div className="p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                {/* Left Column - Pilih Klien */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Pilih Klien</h2>
                        <input
                            type="text"
                            name="searchKlien"
                            value={formData.searchKlien}
                            onChange={handleChange}
                            placeholder="Pilih berdasarkan nama klien atau id klien"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-teal-500 
                         focus:border-transparent"
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-1">Nama</h3>
                        <p className="text-gray-600 text-sm">
                            {formData.selectedKlien
                                ? formData.selectedKlien.name
                                : "-"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-1">Email</h3>
                        <p className="text-gray-600 text-sm">
                            {formData.selectedKlien
                                ? formData.selectedKlien.email
                                : "-"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-1">
                            Nomor Telepon
                        </h3>
                        <p className="text-gray-600 text-sm">
                            {formData.selectedKlien
                                ? formData.selectedKlien.phone_number
                                : "-"}
                        </p>
                    </div>
                </div>

                {/* Right Column - Judul Order & Metode */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Judul Order</h2>
                        <input
                            type="text"
                            name="judulOrder"
                            value={formData.judulOrder}
                            onChange={handleChange}
                            placeholder="Masukkan judul order"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-teal-500 
                         focus:border-transparent"
                        />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Metode Analisis
                        </h2>
                        <div className="relative">
                            <select
                                name="metodeAnalisis"
                                value={formData.metodeAnalisis}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                           bg-white text-gray-700 focus:outline-none 
                           focus:ring-2 focus:ring-teal-500 focus:border-transparent 
                           transition duration-200 ease-in-out appearance-none 
                           cursor-pointer hover:border-teal-400"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' 
                    fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%2300bfa5'%3E
                    %3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 1rem center",
                                    backgroundSize: "1.25rem",
                                }}
                            >
                                <option value="">Pilih Metode Analisis</option>
                                {metodeOptions.map((metode, index) => (
                                    <option key={index} value={metode}>
                                        {metode}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Nomor Order</h2>
                        <div
                            className="w-full px-4 py-3 bg-gray-300 border border-gray-300 
                            rounded-lg text-gray-700"
                        >
                            {formData.nomorOrder}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
