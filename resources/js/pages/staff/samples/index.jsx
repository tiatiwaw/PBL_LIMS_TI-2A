import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/shared/public/search-input";
import {
    Dialog,
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
    const user = props.auth?.user ?? { name: "Guest", role: "User" };

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);
    const [mode, setMode] = useState("create");
    const [openDelete, setOpenDelete] = useState(false);

    const handleEdit = (sample) => {
        setSelectedSample(sample);
        setMode("edit");
        setOpenDialog(true);
    };

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

    const handleSave = (formData) => {
        if (mode === "edit") {
            console.log("Edit data:", formData);
            // TODO: Update data di state atau kirim ke backend
        } else {
            console.log("Tambah data:", formData);
            // TODO: Tambah data ke state atau kirim ke backend
        }
    };

    const handleDelete = (sample) => {
        setSelectedSample(sample);
        setOpenDelete(true);
    };

    const confirmDelete = () => {
        console.log("Hapus sample:", selectedSample);
        // TODO: Hapus data dari state atau backend
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
                        {/* Button Tambah dipindahkan ke sini */}
                        <Button cla
                            onClick={handleAdd}
                            className="!bg-primary-hijauMuda hover:!bg-primary-hijauTua"
                        >
                            Tambah Sampel Baru
                        </Button>
                    </div>
                </div>

                <TableSample
                    data={dummySamples}
                    onDetail={handleDetail}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {/* Dialog Sample - tanpa trigger */}
                <DialogSample
                    open={openDialog}
                    setOpen={setOpenDialog}
                    mode={mode}
                    sampleData={selectedSample}
                    onSubmit={handleSave}
                />

                {/* Dialog Delete */}
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