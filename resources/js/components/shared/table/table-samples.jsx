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

export default function TableSample({ data, onDetail }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState([]); // simpan id sample yang dicentang
    const ITEMS_PER_PAGE = 10;

    // Pastikan data adalah array
    const dataLength = data?.length || 0;
    const totalPages = Math.ceil(dataLength / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = data ? data.slice(startIndex, endIndex) : [];

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const hasData = dataLength > 0;
    const showLeftArrow = totalPages > 1 && currentPage > 1;
    const showRightArrow = totalPages > 1 && currentPage < totalPages;

    return (
        <div className="w-full bg-white rounded-2xl shadow-md p-6">
            <Table>
                <TableHeader>
                    <TableRow className="bg-primary-hijauTua border-none rounded-lg overflow-hidden hover:bg-primary-hijauTua cursor-default">
                        <TableHead className="text-center text-white font-bold rounded-l-lg">ID</TableHead>
                        <TableHead className="text-center text-white font-bold">Nama</TableHead>
                        <TableHead className="text-center text-white font-bold">Bentuk</TableHead>
                        <TableHead className="text-center text-white font-bold">Kategori</TableHead>
                        <TableHead className="text-center text-white font-bold">Kondisi</TableHead>
                        <TableHead className="text-center text-white font-bold rounded-r-lg">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {currentData.map((s, index) => {
                        const isEven = index % 2 === 0;
                        const rowBg = isEven ? "bg-[#024D601A]" : "bg-white";
                        const isChecked = selected.includes(s.id);

                        return (
                            <TableRow
                                key={s.id}
                                className={`${rowBg} border-b-gray-200 hover:bg-opacity-80 transition-colors`}
                            >
                                <TableCell className="text-center py-4 text-gray-500">{s.id}</TableCell>
                                <TableCell className="text-center font-medium text-gray-800">{s.name}</TableCell>
                                <TableCell className="text-center py-4 text-gray-500">{s.bentuk}</TableCell>
                                <TableCell className="text-center text-gray-500">{s.kategori}</TableCell>
                                <TableCell className="text-center text-gray-500">{s.kondisi}</TableCell>

                                

                                <TableCell className="flex items-center justify-center gap-1">
                                    <button
                                        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                                        onClick={() => onDetail(s)}
                                    >
                                        <List color="#02364B" size={18} />
                                    </button>
                                    
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {!hasData && (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                Tidak ada data Sample yang tersedia.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {hasData && (
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-1">
                        {showLeftArrow && (
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                        )}

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
