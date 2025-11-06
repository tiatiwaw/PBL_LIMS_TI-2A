import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Link, router } from "@inertiajs/react";
import { getSampleColumns } from "@/components/shared/analyst/sample-columns";
import SampleDetailsDialog from "@/components/shared/dialog/sample-detail-dialog";
import SampleConfirmDialog from "@/components/shared/dialog/sample-confirm-dialog";
import SampleUnConfirmDialog from "@/components/shared/dialog/sample-unconfirm-dialog";
import { Button } from "@/components/ui/button";
import { FileDown, FileUp, CheckCircle } from "lucide-react";

export default function OrderDetail({ order, samples }) {
    const user = {
        name: "Nardo",
        role: "Analyst",
        avatar: "https://i.pravatar.cc/150?img=3",
    };

    const [uploadSuccess, setUploadSuccess] = useState(false); // ✅ notifikasi upload sukses
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isUnConfirmDialogOpen, setIsUnConfirmDialogOpen] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);

    const handleShowDetail = (sample) => {
        setSelectedSample(sample);
        setIsDialogOpen(true);
    };

    const handleShowConfirm = (sample) => {
        setSelectedSample(sample);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmAction = (sample) => {
        router.post(`/analyst/samples/${sample.id}/confirm`);
        setIsConfirmDialogOpen(false);
    };
    
    const handleShowUnConfirm = (sample) => {
        setSelectedSample(sample);
        setIsUnConfirmDialogOpen(true);
    };
    
    const handleUnConfirmAction = (sample) => {
        setIsUnConfirmDialogOpen(false);
        router.post(`/analyst/samples/${sample.id}/unconfirm`);
    };

    const columns = useMemo(
        () =>
            getSampleColumns({
                onShowDetail: handleShowDetail,
                onShowConfirm: handleShowConfirm,
                onShowUnConfirm: handleShowUnConfirm,
            }),
        []
    );

    // ✅ Data dari database
    const orderDetails = [
        { label: "ID Pemesanan", value: order.order_number ?? "-" },
        { label: "ID Klien", value: order.client_id ?? "-" },
        { label: "Judul", value: order.title ?? "-" },
        { label: "Tipe Pemesanan", value: order.order_type ?? "-" },
        { label: "Tanggal Order", value: order.order_date ?? "-" },
        { label: "Estimasi Selesai", value: order.estimate_date ?? "-" },
        { label: "Nilai Hasil", value: order.result_value ?? "-" },
        { label: "Waktu Laporan", value: order.report_issued_at ?? "-" },
        { label: "Catatan", value: order.notes ?? "-" },
        { label: "Status", value: order.status ?? "-" },
    ];

    const filterData = [
        { value: "all", label: "All Status" },
        { value: "Done", label: "Done" },
        { value: "In Progress", label: "In Progress" },
    ];

    const handleUpload = (e) => {
        if (!e.target.files.length) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("laporan", file);

        router.post(`/analyst/order/${order.id}/upload`, formData, {
            onSuccess: () => {
                setUploadSuccess(true); // ✅ tampilkan popup sukses
                setTimeout(() => setUploadSuccess(false), 3000); // hilang otomatis
            },
        });
    };

    return (
        <DashboardLayout title="Analyst" user={user} header="Selamat Datang Analyst!">
            <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-8 text-primary-hijauTua p-4">

                {/* ✅ Popup sukses upload */}
                {uploadSuccess && (
                    <div className="absolute top-4 right-4 bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg shadow-md flex items-center gap-2 animate-fade-in-down">
                        <CheckCircle className="text-green-600" size={18} />
                        <span>File berhasil diupload!</span>
                    </div>
                )}

                {/* --- Bagian 1: Detail Pemesanan --- */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-xl font-bold mb-5 text-gray-800">Detail Pemesanan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-y-2 text-sm font-medium">
                        {orderDetails.map((item, index) => (
                            <React.Fragment key={index}>
                                <span className="text-gray-600">{item.label}</span>
                                <span className="ml-2">: {item.value}</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Unduh Laporan */}
                <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary-hijauMuda/30">
                            <FileDown className="text-primary-hijauTua" size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800">Laporan Pengujian</p>
                            <p className="text-xs text-gray-500">
                                {order.report_file_path ? (
                                    <span>File tersedia: <b>{order.report_file_path.split('/').pop()}</b></span>
                                ) : (
                                    "Belum ada file"
                                )}
                            </p>
                        </div>
                    </div>

                    {order.report_file_path ? (
                        <a
                            href={route('analyst.order.downloadReport', order.id)}
                            download
                            className="px-3 py-1.5 rounded-lg bg-primary-hijauTua text-white text-sm hover:bg-primary-hijauTua/90"
                        >
                            Download
                        </a>
                    ) : (
                        <span className="text-gray-500 text-sm">Tidak ada file</span>
                    )}
                </div>

                {/* Upload / Ganti Laporan */}
                <div className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary-hijauMuda/30">
                            <FileUp className="text-primary-hijauTua" size={20} />
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-gray-800">
                                Upload / Ganti Laporan
                            </label>
                            <p className="text-xs text-gray-500">Format PDF</p>
                        </div>
                    </div>

                    <label className="px-3 py-1.5 rounded-lg bg-gray-200 text-sm text-gray-700 cursor-pointer hover:bg-gray-300">
                        Pilih File
                        <input
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleUpload}
                        />
                    </label>
                </div>

                {/* Tabel Sampel */}
                <ManagedDataTable
                    data={samples}
                    columns={columns}
                    searchColumn="name"
                    showFilter={true}
                    filterColumn="status"
                    filterOptions={filterData}
                />

                {/* Dialogs */}
                <SampleDetailsDialog
                    sample={selectedSample}
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
                <SampleConfirmDialog
                    sample={selectedSample}
                    isOpen={isConfirmDialogOpen}
                    onOpenChange={setIsConfirmDialogOpen}
                    onConfirm={handleConfirmAction}
                />
                <SampleUnConfirmDialog
                    sample={selectedSample}
                    isOpen={isUnConfirmDialogOpen}
                    onOpenChange={setIsUnConfirmDialogOpen}
                    onUnconfirm={handleUnConfirmAction}
                />

                <div className="w-full flex justify-end mt-4">
                    <Button className="bg-primary-hijauTua">
                        <Link href="/analyst/order">Kembali</Link>
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
