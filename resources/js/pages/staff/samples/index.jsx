import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { usePage } from "@inertiajs/react";
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
import TableSample from "@/components/shared/table/table-samples";
import { dummySamples } from "@/data/samples";
import DialogSample from "@/components/shared/dialog/dialog-samples";

export default function SampleManagement() {
    const { props } = usePage();
    const user = props.auth?.user ?? { name: "Guest", role: "User" }; // fallback biar gak error

    // state untuk kontrol buka/tutup dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);
    const [mode, setMode] = useState("create");
    const [openDelete, setOpenDelete] = useState(false);
    console.log("Selected Sample:", mode);

    // klik tombol edit
    const handleEdit = (sample) => {
        setSelectedSample(sample);
        setMode("edit");
        setOpenDialog(true);
    };

    // klik tombol tambah
    const handleAdd = () => {
        setSelectedSample(null);
        setMode("create");
        setOpenDialog(true);
    };

    const handleDetail = (sample) => {
        setSelectedSample(sample);
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

    const handleDelete = (sample) => {
        setSelectedSample(sample);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        setData(data.filter((d) => d.id !== selectedSample.id));
        setOpenDelete(false);
    };

    return (
        <DashboardLayout
            title="Manajemen Sampel"
            user={user}
            header="Manajemen Sampel"
        >
            <div className="space-y-2">
                <div className="flex bg-white px-4 py-2 items-center justify-between rounded-md">
                    <h2 className="text-primary-hijauTua text-lg font-bold">
                        Daftar Informasi Sampel
                    </h2>
                    <div className="flex items-center gap-2">
                        <SearchInput />
                        <DialogSample
                            open={openDialog}
                            setOpen={setOpenDialog}
                            onAdd={handleAdd}
                            mode={mode}
                            sampleData={selectedSample}
                            onSubmit={handleSave}
                        />
                    </div>
                </div>

                <TableSample
                    data={dummySamples}
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
                            Apakah Anda yakin ingin menghapus sampel{" "}
                            <span className="font-semibold text-red-600">
                                {selectedSample?.name}
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
