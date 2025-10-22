import React, { useState } from 'react';
// 1. Impor semua yang dibutuhkan oleh tabel di sini
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Search, Copy, ChevronRight, ChevronLeft } from "lucide-react";

export default function LaporanTable({ data }) {
    // --- LOGIKA PAGINASI DIMULAI DI SINI ---
    // 3. State untuk melacak halaman saat ini
    const [currentPage, setCurrentPage] = useState(1);
    // 4. Batasan item per halaman
    const ITEMS_PER_PAGE = 10;

    // 5. Menghitung total halaman
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    // 6. Menghitung data yang akan ditampilkan di halaman saat ini
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, endIndex);

    // 7. Fungsi untuk navigasi halaman
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-md p-6">
            
            {/* Bagian Search Bar */}
            <div className="mb-4 relative">
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="w-1/4 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-hijauMuda" 
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Bagian Tabel */}
            <Table>
                <TableHeader>
                    <TableRow className="bg-primary-hijauTua hover:bg-primary-hijauTua border-none">
                        <TableHead className="text-white font-bold rounded-l-lg">ID</TableHead>
                        <TableHead className="text-white font-bold">Sample</TableHead>
                        <TableHead className="text-white font-bold">Client</TableHead>
                        <TableHead className="text-white font-bold">Analis</TableHead>
                        <TableHead className="text-white font-bold">Report</TableHead>
                        <TableHead className="text-white font-bold rounded-r-lg">Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* 8. Gunakan .map() pada 'currentData' (bukan 'data' lagi) */}
                    {currentData.map((laporan) => (
                        <TableRow key={laporan.id} className="border-b-gray-200">
                            <TableCell className="py-4 text-gray-500">{laporan.id}</TableCell>
                            <TableCell className="font-medium text-gray-800">{laporan.sample}</TableCell>
                            <TableCell className="text-gray-500">{laporan.client}</TableCell>
                            <TableCell className="text-gray-500">{laporan.analis}</TableCell>
                            <TableCell>
                                <button className="flex items-center gap-1.5 text-xs bg-primary-hijauMuda hover:bg-primary-hijauTua text-white px-3 py-1.5 rounded-md font-semibold">
                                    File <Copy size={12} />
                                </button>
                            </TableCell>
                            <TableCell>
                                <button className="text-xs bg-primary-hijauMuda hover:bg-primary-hijauTua text-white px-4 py-1.5 rounded-md font-semibold">
                                    Detail
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* 9. Bagian Pagination yang sudah dinamis */}
            <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-500">
                    Showing page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-1">
                    <button 
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    {/* Membuat tombol angka secara dinamis */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button 
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1 text-sm rounded-md ${
                                currentPage === page 
                                ? 'bg-primary-hijauTua text-white font-bold' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button 
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

        </div>
    );
}

