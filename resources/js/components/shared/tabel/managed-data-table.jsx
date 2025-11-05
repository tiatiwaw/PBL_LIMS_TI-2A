import { useState } from "react";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { DataTableCard, DataTableHeader, DataTableContent, DataTablePagination } from "./data-table";
import UpsertDialog from "../dialog/upsert-dialog";
import DeleteDialog from "../dialog/delete-dialog";
import { useTable } from "@/hooks/useTables";

export default function ManagedDataTable({
    data,
    columns,
    editFields,
    createUrl,
    editUrl,
    deleteUrl,

    // Props buat Konfigurasi
    filterOptions = [],
    searchColumn = "name",
    filterColumn = "status",
    showSearch = true,
    showFilter = false,
    showCreate = true,
    pageSize = 10,
    meta = {},

    // Props buat Teks (Opsional)
    editTitle = "Edit Data",
    editDescription = "Ubah data dan klik simpan untuk menyimpan perubahan.",
    deleteTitle = "Konfirmasi Hapus Data",
    deleteDescription = "Tindakan ini tidak dapat dibatalkan. Data akan dihapus permanen.",
    createTitle = "Tambah Data Baru",
    createDescription = "Tambahkan data baru dan klik simpan untuk menyimpan perubahan.",
}) {

    const table = useTable({
        data,
        defaultPageSize: pageSize,
        filterColumn,
        searchColumn,
        showFilter,
        showSearch,
    });

    const [formDialog, setFormDialog] = useState({
        open: false,
        data: null,
        mode: 'create'
    });
    const [deleteDialog, setDeleteDialog] = useState({ open: false, data: null });

    const handleOpenCreate = (row) => {
        setFormDialog({ open: true, data: null, mode: 'create' });
    };

    const handleOpenEdit = (row) => {
        setFormDialog({ open: true, data: row, mode: 'edit' });
    };

    const handleOpenDelete = (row) => {
        setDeleteDialog({ open: true, data: row });
    };

    const handleSave = (formData) => {
        const { mode, data: originalData } = formDialog;

        if (mode === 'edit') {
            if (!editUrl) {
                console.warn("editUrl diisi kocak!.");
                setFormDialog({ open: false, data: null, mode: 'idle' });
                return;
            }

            router.put(
                route(editUrl, originalData.id),
                formData,
                {
                    onSuccess: () => toast.success("Data berhasil disimpan"),
                    onError: (e) => toast.error("Gagal menyimpan data:", e),
                    onFinish: () => setFormDialog({ open: false, data: null, mode: 'idle' }),
                }
            );
        } else if (mode === 'create') {
            if (!createUrl) {
                console.warn("createUrl diisi kocak!.");
                setFormDialog({ open: false, data: null, mode: 'idle' });
                return;
            }

            router.post(
                route(createUrl),
                formData,
                {
                    onSuccess: () => toast.success("Data berhasil ditambahkan"),
                    onError: (e) => toast.error("Gagal menambahkan data:", e),
                    onFinish: () => setFormDialog({ open: false, data: null, mode: 'idle' }),
                }
            );
        }
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

    const isCreating = formDialog.mode === 'create';
    const dialogTitle = isCreating ? createTitle : editTitle;
    const dialogDescription = isCreating ? createDescription : editDescription;

    return (
        <>
            <DataTableCard>
                <DataTableHeader
                    showSearch={showSearch}
                    showFilter={showFilter}
                    showCreate={showCreate}
                    onCreate={handleOpenCreate}
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
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                    meta={meta}
                />

                <DataTablePagination
                    currentPage={table.currentPage}
                    totalPages={table.totalPages}
                    goToPage={table.goToPage}
                />
            </DataTableCard>

            <UpsertDialog
                open={formDialog.open}
                onOpenChange={(open) => setFormDialog({ open, data: null, mode: 'create' })}
                data={formDialog.data}
                onSave={handleSave}
                fields={editFields}
                title={dialogTitle}
                description={dialogDescription}
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