import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { DataTableCard, DataTableHeader, DataTableContent, DataTablePagination } from "./data-table";
import EditDialog from "../dialog/edit-dialog";
import DeleteDialog from "../dialog/delete-dialog";
import { useTable } from "@/hooks/useTables";

export default function ManagedDataTable({
    data,
    columns,
    editFields,
    editUrl,
    deleteUrl,

    // Props buat Konfigurasi
    filterOptions = [],
    searchColumn = "user",
    filterColumn = "status",
    showSearch = true,
    showFilter = false,
    pageSize = 10,
    meta = {},

    // Props buat Teks (Opsional)
    editTitle = "Edit Data",
    editDescription = "Ubah data dan klik simpan untuk menyimpan perubahan.",
    deleteTitle = "Konfirmasi Hapus Data",
    deleteDescription = "Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen.",
}) {

    const table = useTable({
        data,
        defaultPageSize: pageSize,
        filterColumn,
        searchColumn,
        showFilter,
        showSearch,
    });

    const [editDialog, setEditDialog] = useState({ open: false, data: null });
    const [deleteDialog, setDeleteDialog] = useState({ open: false, data: null });

    const handleEdit = (row) => {
        setEditDialog({ open: true, data: row });
    };

    const handleDelete = (row) => {
        setDeleteDialog({ open: true, data: row });
    };

    const handleSaveEdit = (updatedData) => {
        if (!editUrl) {
            console.warn("ManagedDataTable: Prop 'editUrl' tidak disediakan.");
            setEditDialog({ open: false, data: null });
            return;
        }

        router.put(
            route(editUrl, updatedData.id),
            updatedData,
            {
                onSuccess: () => toast.success("Data berhasil disimpan"),
                onError: (e) => toast.error("Gagal menyimpan data:", e),
                onFinish: () => setEditDialog({ open: false, data: null }),
            }
        );
    };

    const handleConfirmDelete = (deletedData) => {
        if (!deleteUrl) {
            console.warn("ManagedDataTable: Prop 'deleteUrl' tidak disediakan.");
            setDeleteDialog({ open: false, data: null });
            return;
        }

        router.delete(
            route(deleteUrl, deletedData.id),
            {
                onSuccess: () => toast.success("Data berhasil dihapus"),
                onError: (e) => toast.error("Gagal menghapus data:", e),
                onFinish: () => setDeleteDialog({ open: false, data: null }),
            }
        );
    };

    return (
        <>
            <DataTableCard>
                <DataTableHeader
                    showSearch={showSearch}
                    showFilter={showFilter}
                    filterOptions={filterOptions}
                    searchTerm={table.searchTerm}
                    onSearchChange={table.setSearchTerm}
                    filterValue={table.filterValue}
                    onFilterChange={table.setFilterValue}
                />

                <DataTableContent
                    columns={columns}
                    data={table.currentData}
                    startIndex={table.startIndex}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    meta={meta}
                />

                <DataTablePagination
                    currentPage={table.currentPage}
                    totalPages={table.totalPages}
                    goToPage={table.goToPage}
                />
            </DataTableCard>

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
        </>
    );
}