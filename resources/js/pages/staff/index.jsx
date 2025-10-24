import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { usePage } from "@inertiajs/react";
import { dummyClients } from "@/data/clients";
import TableClients from "@/components/shared/table/table-clients";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/shared/public/search-input";

// ⬇️ import komponen Dialog dari shadcn (punyamu di shared/ui/dialog.jsx)
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import DialogClient from "@/components/shared/dialog/dialog-client";

export default function ClientManagement() {
    const { props } = usePage();
    const user = props.auth?.user ?? { name: "Guest", role: "User" }; // fallback biar gak error

    // state untuk kontrol buka/tutup dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [mode, setMode] = useState("create");
    const [openDelete, setOpenDelete] = useState(false);
    console.log("Selected Client:", mode);

    // klik tombol edit
    const handleEdit = (client) => {
        setSelectedClient(client);
        setMode("edit");
        setOpenDialog(true);
    };

    // klik tombol tambah
    const handleAdd = () => {
        setSelectedClient(null);
        setMode("create");
        setOpenDialog(true);
    };

    const handleDetail = (client) => {
        setSelectedClient(client);
        setMode("detail");
        setOpenDialog(true);
    };

    // simpan hasil form
    const handleSave = (formData) => {
        if (mode === "edit") {
            console.log("Edit data:", formData);
        } else {
            console.log("Tambah data:", formData);
        }
    };

    const handleDelete = (client) => {
        setSelectedClient(client);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        setData(data.filter((d) => d.id !== selectedClient.id));
        setOpenDelete(false);
    };

    return (
        <DashboardLayout
            title="Manajemen Klien"
            user={user}
            header="Manajemen Klien"
        >
            <div className="space-y-2">
                <div className="flex bg-white px-4 py-2 items-center justify-between rounded-md">
                    <h2 className="text-primary-hijauTua text-lg font-bold">
                        Daftar & Kelola Informasi Klien
                    </h2>
                    <div className="flex items-center gap-2">
                        <SearchInput />
                        <DialogClient
                            open={openDialog}
                            setOpen={setOpenDialog}
                            onAdd={handleAdd}
                            mode={mode}
                            clientData={selectedClient}
                            onSubmit={handleSave}
                        />
                    </div>
                </div>

                <TableClients
                    data={dummyClients}
                    onDetail={handleDetail}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                    <DialogContent className="max-w-sm text-center">
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        </DialogHeader>
                        <p className="text-gray-600 mb-4">
                            Apakah Anda yakin ingin menghapus klien{" "}
                            <span className="font-semibold text-red-600">
                                {selectedClient?.name}
                            </span>
                            ?
                        </p>
                        <DialogFooter className="flex justify-center gap-3">
                            <Button
                                onClick={() => setOpenDelete(false)}
                                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={confirmDelete}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}
