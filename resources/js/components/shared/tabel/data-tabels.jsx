import { useState, useMemo, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchFilter from "../dashboard/searchfilter";
import EditDialog from "../dialog/edit-dialog";
import DeleteDialog from "../dialog/delete-dialog";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

export default function DataTable({
    columns,
    data,
    showSearch = true,
    showFilter = false,
    filterOptions = [],
    filterColumn = "status",
    searchColumn = "user",
    pageSize: ITEMS_PER_PAGE = 10,
    onEdit,
    onDelete,
    meta = {},
    editFields = [],
    editUrl,
    deleteUrl,
    editTitle = "Edit Data",
    editDescription = "Ubah data dan klik simpan untuk menyimpan perubahan.",
    deleteTitle = "Konfirmasi Hapus Data",
    deleteDescription = "Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen.",
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterValue, setFilterValue] = useState("all");

    const [editDialog, setEditDialog] = useState({ open: false, data: null });
    const [deleteDialog, setDeleteDialog] = useState({ open: false, data: null });

    const filteredData = useMemo(() => {
        let result = data;
        if (showFilter && filterValue !== "all") {
            result = result.filter((item) => item[filterColumn] === filterValue);
        }
        if (showSearch && searchTerm) {
            result = result.filter((item) =>
                item[searchColumn]?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return result;
    }, [data, filterValue, searchTerm, showFilter, showSearch, filterColumn, searchColumn]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = filteredData.slice(startIndex, endIndex);

    const goToPage = (page) => {
        const safeTotalPages = totalPages > 0 ? totalPages : 1;
        if (page >= 1 && page <= safeTotalPages) setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filterValue, searchTerm]);

    const handleEdit = (row) => {
        if (onEdit) onEdit(row);
        else setEditDialog({ open: true, data: row });
    };

    const handleDelete = (row) => {
        if (onDelete) onDelete(row);
        else setDeleteDialog({ open: true, data: row });
    };

    const handleSaveEdit = (updatedData) => {
        if (onEdit) {
            onEdit(updatedData);
        } else if (editUrl && updatedData.id) {
            router.put(
                route(editUrl, updatedData.id),
                updatedData,
                toast.success("Data berhasil disimpan")
            );
        } else {
            console.warn("DataTable: Tidak ada prop 'onEdit' atau 'editUrl'. Aksi simpan tidak akan persisten.");
        }
        setEditDialog({ open: false, data: null });
    };

    const handleConfirmDelete = (deletedData) => {
        if (onDelete) {
            onDelete(deletedData);
        } else if (deleteUrl && deletedData.id) {
            router.delete(
                route(deleteUrl, deletedData.id),
                toast.success("Data berhasil dihapus")
            );
        } else {
            console.warn("DataTable: Tidak ada prop 'onDelete' atau 'deleteUrl'. Aksi hapus tidak akan persisten.");
        }
        setDeleteDialog({ open: false, data: null });
    };

    return (
        <Card className="w-full rounded-2xl shadow-lg border-none">
            <CardHeader className="pb-0">
                <SearchFilter
                    showSearch={showSearch}
                    showFilter={showFilter}
                    filterOptions={filterOptions}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filterValue={filterValue}
                    onFilterChange={setFilterValue}
                />
            </CardHeader>

            <CardContent className="pt-0">
                <Table className="border-separate border-spacing-y-3">
                    <TableHeader>
                        <TableRow className="bg-primary-hijauTua hover:bg-primary-hijauTua">
                            {columns.map((column, index) => (
                                <TableHead
                                    key={column.accessorKey || column.id}
                                    className={cn(
                                        "text-white font-bold",
                                        column.accessorKey === "no" && "text-center",
                                        index === 0 ? "rounded-l-lg" : "",
                                        index === columns.length - 1 ? "rounded-r-lg" : ""
                                    )}
                                >
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {currentData.length > 0 ? (
                            currentData.map((row, idx) => (
                                <TableRow
                                    key={idx}
                                    className={cn(
                                        "font-medium text-primary-hijauTua transition-colors duration-150 ease-in-out",
                                        "hover:bg-gray-100 hover:text-primary-hijauTua"
                                    )}
                                >
                                    {columns.map((column, index) => (
                                        <TableCell
                                            key={column.accessorKey || column.id}
                                            className={cn(
                                                "py-4 font-medium",
                                                column.accessorKey === "no" && "text-center",
                                                index === 0 ? "rounded-l-lg" : "",
                                                index === columns.length - 1 ? "rounded-r-lg" : ""
                                            )}
                                        >
                                            {column.accessorKey === "no"
                                                ? startIndex + idx + 1
                                                : column.cell
                                                    ? column.cell({
                                                        row,
                                                        onEdit: handleEdit,
                                                        onDelete: handleDelete,
                                                        ...meta,
                                                    })
                                                    : row[column.accessorKey]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center rounded-lg"
                                >
                                    Tidak ada data yang cocok.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>

            {totalPages > 0 && (
                <CardFooter className="flex justify-between items-center p-6 pt-4">
                    <p className="text-sm text-gray-500">
                        Halaman {currentPage} dari {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                size="sm"
                                variant={currentPage === page ? "default" : "ghost"}
                                onClick={() => goToPage(page)}
                                className={cn(
                                    currentPage === page &&
                                    "bg-primary-hijauTua hover:bg-primary-hijauTua/90"
                                )}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </CardFooter>
            )}

            <EditDialog
                open={editDialog.open}
                onOpenChange={(open) => setEditDialog({ open, data: null })}
                data={editDialog.data}
                onSave={handleSaveEdit}
                fields={editFields}
                title={editTitle}
                description={editDescription}
            />

            <DeleteDialog
                open={deleteDialog.open}
                onOpenChange={(open) => setDeleteDialog({ open, data: null })}
                data={deleteDialog.data}
                onConfirm={handleConfirmDelete}
                title={deleteTitle}
                description={deleteDescription}
            />
        </Card>
    );
}
