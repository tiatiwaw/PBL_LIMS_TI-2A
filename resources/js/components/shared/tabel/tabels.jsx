import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { ChevronRight, ChevronLeft } from "lucide-react";
import DataTableToolbar from "@/components/shared/dashboard/searchfilter"; // Mengimpor toolbar dengan path absolut

// Komponen ini sekarang menerima: columns, data, dan opsi untuk toolbar
export default function DataTable({
    columns,
    data,
    showSearch = true,
    showFilter = false,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, endIndex);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full rounded-2xl p-6">
            {/* 1. Memanggil Toolbar dengan opsi yang bisa diatur */}
            <DataTableToolbar showSearch={showSearch} showFilter={showFilter} />

            {/* Bagian Tabel */}
            <Table>
                <TableHeader>
                    <TableRow className="bg-primary-hijauTua hover:bg-primary-hijauTua border-none">
                        {/* 2. Membuat header tabel secara dinamis dari 'columns' */}
                        {columns.map((column, index) => (
                            <TableHead
                                key={column.accessorKey}
                                className={`text-white font-bold ${
                                    index === 0 ? "rounded-l-lg" : ""
                                } ${
                                    index === columns.length - 1
                                        ? "rounded-r-lg"
                                        : ""
                                }`}
                            >
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((row) => (
                        <TableRow key={row.id} className="font-medium border-b-gray-200 bg-white text-primary-hijauTua">
                            {/* 3. Membuat sel tabel secara dinamis dari 'columns' */}
                            {columns.map((column) => (
                                <TableCell
                                    key={column.accessorKey}
                                    className="py-4 font-mediumx"
                                >
                                    {/* Memanggil fungsi 'cell' untuk merender konten */}
                                    {column.cell
                                        ? column.cell({ row })
                                        : row[column.accessorKey]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Bagian Pagination (tidak berubah) */}
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
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-3 py-1 text-sm rounded-md ${
                                    currentPage === page
                                        ? "bg-primary-hijauTua text-white font-bold"
                                        : "text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {page}
                            </button>
                        )
                    )}
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