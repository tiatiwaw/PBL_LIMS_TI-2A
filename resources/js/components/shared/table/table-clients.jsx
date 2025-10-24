import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { List, Pencil, Trash2, ChevronRight, ChevronLeft } from "lucide-react";

export default function TableClients({ data, onDetail, onEdit, onDelete }) {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;
    
    // Pastikan data adalah array untuk menghindari error
    const dataLength = data?.length || 0; 
    const totalPages = Math.ceil(dataLength / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    // Gunakan array kosong jika data tidak ada
    const currentData = data ? data.slice(startIndex, endIndex) : [];

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // Logika untuk menampilkan arrow navigasi
    const showLeftArrow = totalPages > 1 && currentPage > 1;
    const showRightArrow = totalPages > 1 && currentPage < totalPages;
    // Cek apakah ada data sama sekali
    const hasData = dataLength > 0;

    return (
        <div className="w-full rounded-2xl p-6">
            {/* Bagian Tabel */}
            <Table>
                <TableHeader>
                    {/* Tambahkan overflow-hidden untuk memastikan rounded header terlihat mulus */}
                    <TableRow className="bg-primary-hijauTua hover:bg-primary-hijauTua border-none rounded-lg overflow-hidden"> 
                        <TableHead className="text-center text-white font-bold rounded-l-lg">ID</TableHead>
                        <TableHead className="text-center text-white font-bold">Nama</TableHead>
                        <TableHead className="text-center text-white font-bold">Akun</TableHead>
                        <TableHead className="text-center text-white font-bold">Alamat</TableHead>
                        <TableHead className="text-center text-white font-bold">Nomor</TableHead>
                        <TableHead className="text-center text-white font-bold rounded-r-lg">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {/* Logika Warna Selang-seling (Zebra Stripping) */}
                    {currentData.map((c, index) => {
                        // Tentukan warna latar belakang
                        const isEven = index % 2 === 0;
                        // Warna #024D601A dalam bentuk Tailwind
                        const rowBg = isEven ? 'bg-[#024D601A]' : 'bg-white'; 

                        return (
                            <TableRow key={c.id} className={`${rowBg} border-b-gray-200 hover:bg-opacity-80 transition-colors`}>
                                <TableCell className="text-center py-4 text-gray-500">{c.id}</TableCell>
                                <TableCell className="text-center font-medium text-gray-800">{c.name}</TableCell>
                                <TableCell className="text-center py-4 text-gray-500">{c.akun}</TableCell>
                                <TableCell className="text-center text-gray-500">{c.alamat}</TableCell>
                                <TableCell className="text-center text-gray-500">{c.nomor}</TableCell>
                                <TableCell className="flex items-center justify-center gap-1">
                                    {/* Detail */}
                                    <button
                                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                                        onClick={() => onDetail(c)}
                                    >
                                        <List color="#02364B" size={18} />
                                    </button>

                                    {/* Edit */}
                                    <button
                                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                                        onClick={() => onEdit(c)}
                                    >
                                        <Pencil color="#2891DD" size={18} />
                                    </button>

                                    {/* Delete */}
                                    <button
                                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                                        onClick={() => onDelete(c)}
                                    >
                                        <Trash2 color="red" size={18} />
                                    </button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {/* Tampilkan pesan jika tidak ada data */}
                    {!hasData && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                Tidak ada data klien yang tersedia.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination hanya tampil jika ada data */}
            {hasData && (
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-1">
                        
                        {/* ARROW KIRI DINAMIS */}
                        {showLeftArrow && (
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                        )}
                        
                        {/* Tombol Nomor Halaman */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                    currentPage === page
                                        ? "bg-primary-hijauTua text-white font-bold"
                                        : "text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* ARROW KANAN DINAMIS */}
                        {showRightArrow && (
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        )}
                    </div>

                    <p className="text-sm text-gray-500">
                        Menampilkan halaman {currentPage} dari {totalPages}
                    </p>
                </div>
            )}
        </div>
    );
}
