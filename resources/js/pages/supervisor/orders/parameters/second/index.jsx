// ParameterSecondPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Search, ChevronDown } from "lucide-react";

export default function ParameterSecondPage({ allDataProp }) {
    // --- 1. DATA & CONSTANTS ---
    const MOCK_DATA = [
        {
            id: "1111111111111111",
            name: "Metanol",
            kategori: "BarakKuda",
            standar: "Jarum",
        },
        {
            id: "2222222222222222",
            name: "Etanol",
            kategori: "BarakKuda",
            standar: "Jarum",
        },
        {
            id: "3333333333333333",
            name: "Isopropanol",
            kategori: "BarakKuda",
            standar: "Jarum",
        },
        {
            id: "4444444444444444",
            name: "Aseton",
            kategori: "BarakKuda",
            standar: "Jarum",
        },
        {
            id: "5555555555555555",
            name: "Air",
            kategori: "BarakKuda",
            standar: "Jarum",
        },
    ];
    const allData = allDataProp || MOCK_DATA;
    const sectionTypes = ["reagen", "equipment"]; // Helper untuk looping render

    // --- 2. STATE UTAMA ---
    // Menyimpan ID yang sudah fix dipilih
    const [selectedIds, setSelectedIds] = useState({
        reagen: new Set(),
        equipment: new Set(),
    });
    const [statuses, setStatuses] = useState({});

    // --- 3. STATE MODAL (Dipindah ke sini karena tidak ada komponen terpisah) ---
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: null,
    });
    const [searchTerm, setSearchTerm] = useState(""); // State search modal
    const [tempSelectedIds, setTempSelectedIds] = useState(new Set()); // State seleksi sementara modal

    // --- 4. LOGIC & EFFECT ---

    // Reset state modal saat dibuka
    useEffect(() => {
        if (modalConfig.isOpen && modalConfig.type) {
            setSearchTerm("");
            // Copy seleksi saat ini ke temporary state untuk diedit di modal
            setTempSelectedIds(new Set(selectedIds[modalConfig.type]));
        }
    }, [modalConfig.isOpen, modalConfig.type, selectedIds]);

    const getRandomStatus = () => (Math.random() < 0.5 ? "Good" : "Damaged");

    // Helper mengambil data lengkap (Derived State)
    const getList = (type) => {
        return allData
            .filter((item) => selectedIds[type].has(item.id))
            .map((item) => ({
                ...item,
                status: statuses[item.id] || "Good",
            }));
    };

    const reagenList = getList("reagen");
    const equipmentList = getList("equipment");
    const isListEmpty = reagenList.length === 0 && equipmentList.length === 0;

    // Data untuk list di dalam Modal (Filtered)
    const modalFilteredData = useMemo(() => {
        if (!modalConfig.isOpen) return [];
        return allData.filter(
            (d) =>
                d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.standar.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allData, searchTerm, modalConfig.isOpen]);

    // --- 5. HANDLERS ---

    const handleOpenModal = (type) => setModalConfig({ isOpen: true, type });

    const handleCloseModal = () =>
        setModalConfig({ ...modalConfig, isOpen: false });

    // Toggle checkbox di dalam modal (mengubah tempSelectedIds)
    const handleToggleTempItem = (id) => {
        setTempSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    // Simpan perubahan dari modal ke state utama
    const handleSaveChanges = () => {
        const type = modalConfig.type;
        const idsToSave = Array.from(tempSelectedIds);

        // Generate status baru jika item baru
        const newStatuses = { ...statuses };
        idsToSave.forEach((id) => {
            if (!newStatuses[id]) newStatuses[id] = getRandomStatus();
        });
        setStatuses(newStatuses);

        // Simpan ID
        setSelectedIds((prev) => ({
            ...prev,
            [type]: new Set(idsToSave),
        }));

        handleCloseModal();
    };

    const handleBack = () =>
        setSelectedIds({ reagen: new Set(), equipment: new Set() });

    // --- 6. RENDER (SATU RETURN BESAR) ---
    return (
        <DashboardLayout>
            <main className="flex-1 p-10 max-w-7xl mx-auto">
                {/* HEADER PAGE */}
                <header className="mb-12">
                    <h1
                        className="text-6xl font-extrabold pb-3 relative inline-block"
                        style={{
                            borderBottom: "8px solid #003D43",
                            paddingBottom: "10px",
                            display: "inline-block",
                            width: "fit-content",
                            paddingRight: "40px",
                        }}
                    >
                        Parameter
                    </h1>
                </header>

                {/* KONTEN UTAMA (EMPTY STATE / FILLED STATE) */}
                {isListEmpty ? (
                    // === TAMPILAN KOSONG (EMPTY STATE) ===
                    <>
                        {/* Loop render untuk Reagen & Equipment Empty State */}
                        {sectionTypes.map((type) => {
                            const title =
                                type === "reagen" ? "Reagen" : "Equipment";
                            return (
                                <section
                                    key={`empty-${type}`}
                                    className="bg-white rounded-2xl shadow-lg p-8 mb-10 relative min-h-[120px] text-center"
                                    style={{ color: "#7A9C9A" }}
                                >
                                    <h2 className="text-xl font-semibold text-[#003D43] text-left mb-4">
                                        {title}
                                    </h2>
                                    <button
                                        onClick={() => handleOpenModal(type)}
                                        className="absolute top-6 right-6 bg-white border border-gray-300 rounded-full px-4 py-1 text-sm text-[#003D43] hover:bg-gray-50 transition"
                                    >
                                        Manage/Edit {title}
                                    </button>
                                    <p className="pt-10">
                                        Belum ada {title} yang Dipilih
                                    </p>
                                </section>
                            );
                        })}

                        {/* Tombol Bawah (Empty) */}
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={handleBack}
                                className="bg-gray-300 rounded px-6 py-2 text-black hover:bg-gray-400 transition"
                            >
                                Back
                            </button>
                            <button className="bg-[#3DE67C] rounded px-6 py-2 text-white hover:bg-[#32b864] transition">
                                Selesai
                            </button>
                        </div>
                    </>
                ) : (
                    // === TAMPILAN TABEL (FILLED STATE) ===
                    <>
                        {/* Loop render untuk Reagen & Equipment Table */}
                        {sectionTypes.map((type) => {
                            const title =
                                type === "reagen" ? "Reagen" : "Equipment";
                            const dataList =
                                type === "reagen" ? reagenList : equipmentList;

                            return (
                                <section
                                    key={`table-${type}`}
                                    className="mb-10"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-xl font-semibold text-[#003D43]">
                                            {title}
                                        </h2>
                                        <button
                                            onClick={() =>
                                                handleOpenModal(type)
                                            }
                                            className="bg-white border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-50 transition"
                                        >
                                            Manage/Edit {title}
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto rounded-lg">
                                        <table className="w-full border-collapse text-[#003D43]">
                                            <thead>
                                                <tr className="bg-[#003D43] text-white text-left h-12">
                                                    <th className="py-3 px-6 rounded-tl-md">
                                                        ID
                                                    </th>
                                                    <th className="py-3 px-6">
                                                        Nama
                                                    </th>
                                                    <th className="py-3 px-6 rounded-tr-md">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataList.map((item, idx) => (
                                                    <tr
                                                        key={`${item.id}-${idx}`}
                                                        className={
                                                            idx % 2 === 0
                                                                ? "bg-[#EAF8F7]"
                                                                : "bg-white"
                                                        }
                                                    >
                                                        <td className="py-4 px-6 font-mono">
                                                            {item.id}
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            {item.name}
                                                        </td>
                                                        <td className="py-4 px-6">
                                                            <span
                                                                className={`inline-block px-3 py-1 rounded-full font-semibold text-white ${
                                                                    item.status ===
                                                                    "Damaged"
                                                                        ? "bg-red-500"
                                                                        : "bg-[#3DE67C]"
                                                                }`}
                                                            >
                                                                {item.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {dataList.length === 0 && (
                                                    <tr>
                                                        <td
                                                            colSpan="3"
                                                            className="text-center py-4 text-gray-500"
                                                        >
                                                            Data kosong
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            );
                        })}

                        {/* Tombol Bawah (Filled) */}
                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                onClick={handleBack}
                                className="bg-gray-300 rounded px-8 py-2 text-black hover:bg-gray-400 transition"
                            >
                                Back
                            </button>
                            <button className="bg-[#3DE67C] rounded px-8 py-2 text-white hover:bg-[#32b864] transition">
                                Selesai
                            </button>
                        </div>
                    </>
                )}

                {/* === MODAL (Render Kondisional Langsung Disini) === */}
                {modalConfig.isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 transition-opacity">
                        <div className="bg-[#CCF8F8] w-full max-w-5xl p-6 rounded-3xl shadow-2xl border-2 border-black flex flex-col max-h-[85vh]">
                            {/* SEARCH & FILTER BAR */}
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center bg-white border rounded-xl px-4 py-2 w-64 gap-2">
                                    <Search className="w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-full border-none focus:outline-none text-sm bg-transparent"
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleSaveChanges}
                                        className="bg-yellow-300 px-6 rounded-xl text-black font-semibold py-2 hover:bg-yellow-400 transition"
                                    >
                                        Pilih
                                    </button>
                                    <button className="bg-white border rounded-xl flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-50">
                                        Filters{" "}
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* TABLE HEADER MODAL */}
                            <div className="grid grid-cols-4 bg-[#003D43] text-white rounded-xl px-6 py-3 font-semibold text-sm">
                                <div className="col-span-2">Name Parameter</div>
                                <div>Kategori</div>
                                <div className="text-center">
                                    Standart Kualitas
                                </div>
                            </div>

                            {/* LIST DATA MODAL */}
                            <div
                                className="overflow-y-auto mt-3 pr-3 text-[#003D43]"
                                style={{ maxHeight: "60vh" }}
                            >
                                {modalFilteredData.map((item, idx) => {
                                    const isSelected = tempSelectedIds.has(
                                        item.id
                                    );
                                    return (
                                        <div
                                            key={`${item.id}-${idx}`}
                                            onClick={() =>
                                                handleToggleTempItem(item.id)
                                            }
                                            className={`grid grid-cols-4 items-center px-6 py-5 border-b-2 border-[#003D43] cursor-pointer transition-colors ${
                                                isSelected
                                                    ? "bg-[#DFFDFB]"
                                                    : "hover:bg-[#e0fbf9]"
                                            }`}
                                        >
                                            <div className="col-span-2 font-mono">
                                                {item.name}
                                            </div>
                                            <div>{item.kategori}</div>
                                            <div className="flex justify-end items-center gap-4">
                                                <span className="text-sm font-semibold">
                                                    {item.standar}
                                                </span>
                                                <div
                                                    className={`w-7 h-7 rounded-md flex items-center justify-center border-2 transition-all ${
                                                        isSelected
                                                            ? "bg-[#009EA5] border-[#004D54]"
                                                            : "bg-white border-[#004D54]"
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <svg
                                                            width="16"
                                                            height="16"
                                                            fill="none"
                                                            stroke="black"
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <polyline points="4,9 8,13 14,5" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {modalFilteredData.length === 0 && (
                                    <p className="p-10 text-center text-gray-500">
                                        Data tidak ditemukan
                                    </p>
                                )}
                            </div>

                            {/* FOOTER MODAL */}
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-200 px-6 py-2 rounded text-black font-semibold hover:bg-gray-300 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSaveChanges}
                                    className="bg-[#3DE67C] px-6 py-2 rounded text-white font-semibold hover:bg-[#32b864] transition"
                                >
                                    Pilih
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </DashboardLayout>
    );
}
