import React, { useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";

const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function TableMethodsOrd({ data = [], onSelectionChange, initialSelectedIds = [] }) {
    const [selectedIds, setSelectedIds] = useState(initialSelectedIds);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    const allData = useMemo(() => {
        if (!Array.isArray(data) || data.length === 0) {
             return [{ 
                id: 'dummy-1', 
                name: "Tidak Ada Data Metode", 
                harga: 0, 
                isDummy: true 
            }];
        }
        return data;
    }, [data]);
    
    const toggleSelect = (methodId) => {
        if (methodId === 'dummy-1') return;

        setSelectedIds((prev) => {
            const next = prev.includes(methodId) 
                ? prev.filter((i) => i !== methodId) 
                : [...prev, methodId];
            
            const selectedObjects = allData.filter(method => next.includes(method.id));
            onSelectionChange?.(selectedObjects); 
            
            return next;
        });
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-sm overflow-auto">
            <Table className="min-w-full">
                <TableHeader>
                    {/* Kembalikan hover di header */}
                    <TableRow className="bg-primary-hijauTua hover:bg-primary-hijauTua cursor-default">
                        <TableHead className="text-center text-white font-bold rounded-l-lg">ID</TableHead>
                        <TableHead className="text-left text-white font-bold">Nama Metode Analisis</TableHead>
                        <TableHead className="text-right text-white font-bold">Harga</TableHead>
                        <TableHead className="text-center text-white font-bold rounded-r-lg">Pilih</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {allData.map((row) => {
                        const checked = selectedIds.includes(row.id);
                        const isDummy = row.isDummy || false;

                        return (
                            <TableRow 
                                key={row.id} 
                                className={cn(
                                    "cursor-pointer", 
                                    isDummy 
                                        ? "bg-red-50" 
                                        : checked
                                      )}
                                onClick={() => !isDummy && toggleSelect(row.id)}
                            >
                                <TableCell className="text-center py-3 text-sm text-gray-700 font-semibold">{isDummy ? '-' : `M-${row.id}`}</TableCell>
                                <TableCell className="text-left py-3 text-sm text-gray-800 font-medium">{row.name}</TableCell>
                                <TableCell className="text-right py-3 text-sm font-semibold text-teal-600">
                                    {isDummy ? "N/A" : formatRupiah(row.harga)}
                                </TableCell>
                                <TableCell className="text-center py-3">
                                    {!isDummy && (
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() => toggleSelect(row.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-4 h-4 accent-teal-600 cursor-pointer"
                                            aria-label={`Pilih ${row.name}`}
                                        />
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}