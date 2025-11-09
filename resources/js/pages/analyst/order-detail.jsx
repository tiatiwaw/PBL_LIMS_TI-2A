import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Link, router } from "@inertiajs/react";
import { getSampleColumns } from "@/components/shared/analyst/sample-columns";
import SampleDetailsDialog from "@/components/shared/dialog/sample-detail-dialog";
import SampleConfirmDialog from "@/components/shared/dialog/sample-confirm-dialog";
import SampleUnConfirmDialog from "@/components/shared/dialog/sample-unconfirm-dialog";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";

export default function OrderDetail({ order, samples }) {
    const user = {
        name: "Nardo",
        role: "Analyst",
        avatar: "https://i.pravatar.cc/150?img=3",
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isUnConfirmDialogOpen, setIsUnConfirmDialogOpen] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [testResults, setTestResults] = useState(
        samples.map(() => ({ result: "" }))
    );

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

    const handleResultChange = (index, value) => {
        const updated = [...testResults];
        updated[index].result = value;
        setTestResults(updated);
    };

    const handleSaveResults = () => {
        const payload = testResults.map((r, i) => ({
            sample_id: samples[i].id,
            result: r.result,
        }));
        router.post(route('analyst.saveReport', order.id), { results: payload });
        setIsEditing(false);
    };

    const handleSubmitResults = () => {
        router.post(route('analyst.submitReport', order.id));
    };

    const handleDownloadPDF = () => {
        router.get(route('analyst.downloadReport', order.id));
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

    return (
        <DashboardLayout title="Analyst" user={user} header="Selamat Datang Analyst!">
            <div className="relative w-full max-w-4xl mx-auto flex flex-col gap-8 text-primary-hijauTua p-4">

                {/* --- Detail Pemesanan --- */}
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

                {/* --- Tabel Sampel --- */}
                <ManagedDataTable
                    data={samples}
                    columns={columns}
                    searchColumn="name"
                    showFilter={true}
                    filterColumn="status"
                    filterOptions={filterData}
                />

                {/* --- Input Hasil Uji --- */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4 text-gray-800">
                        Input Hasil Uji Sampel
                    </h2>

                    <div className="flex flex-col gap-4">
                        {samples.map((sample, index) => (
                            <div key={sample.id} className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Hasil Sample {index + 1} ({sample.name ?? "Tanpa Nama"})
                                </label>
                                <input
                                    type="text"
                                    className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-hijauMuda ${
                                        !isEditing && "bg-gray-100 cursor-not-allowed"
                                    }`}
                                    disabled={!isEditing}
                                    value={testResults[index].result}
                                    onChange={(e) =>
                                        handleResultChange(index, e.target.value)
                                    }
                                    placeholder="Masukkan hasil uji..."
                                />
                            </div>
                        ))}
                    </div>

                    {/* Tombol Edit, Save, Submit */}
                    <div className="flex flex-wrap justify-end gap-3 mt-6">
                        {!isEditing ? (
                            <Button
                                className="bg-primary-hijauTua text-white"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </Button>
                        ) : (
                            <Button
                                className="bg-green-600 text-white"
                                onClick={handleSaveResults}
                            >
                                Save
                            </Button>
                        )}

                        <Button
                            onClick={handleSubmitResults}
                            className="bg-primary-hijauTua"
                        >
                            Submit
                        </Button>
                    </div>

                    {/* Tombol Download PDF di bawah semua */}
                    <div className="flex justify-end mt-6">
                        <Button
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 bg-blue-600 text-white"
                        >
                            <FileDown size={18} />
                            Download PDF
                        </Button>
                    </div>
                </div>

                {/* --- Dialogs --- */}
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

                {/* Tombol kembali */}
                <div className="w-full flex justify-end mt-4">
                    <Button className="bg-primary-hijauTua">
                        <Link href="/analyst/order">Kembali</Link>
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}
