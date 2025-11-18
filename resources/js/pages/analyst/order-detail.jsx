import React, { useState, useMemo, useEffect } from "react";
import { usePage } from '@inertiajs/react';
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { Link, router } from "@inertiajs/react";
import { getSampleColumns } from "@/components/shared/analyst/sample-columns";
import SampleDetailsDialog from "@/components/shared/dialog/sample-detail-dialog";
import SampleConfirmDialog from "@/components/shared/dialog/sample-confirm-dialog";
import SampleUnConfirmDialog from "@/components/shared/dialog/sample-unconfirm-dialog";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useOrderDetail } from "@/hooks/analyst/useOrderDetail"; // Asumsi path hook Anda
import { useResult } from "@/hooks/analyst/useResult"; // Asumsi path hook Anda

export default function OrderDetail({ orderId }) {
    // Menggunakan hook useOrderDetail untuk mengambil data
    const {
        order,
        samples,
        isLoading,
        confirmSample,
        unconfirmSample,
    } = useOrderDetail(orderId);

	const { saveResult, isSaving, submitResult, isSubmitting, downloadResult, isDownloading } = useResult();

    const [viewMode, setViewMode] = useState("input"); // "table" | "input"
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isUnConfirmDialogOpen, setIsUnConfirmDialogOpen] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    // State untuk hasil uji, diinisialisasi ulang saat 'samples' berubah (setelah fetch)
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        if (samples) {
            setTestResults(
                samples.map((sample) => ({
                    id: sample.id,
                    parameter: sample.parameter.map((param) => ({
                        id: param.id,
                        result: param.pivot?.result ?? "",
                    })),
                }))
            );
        }
    }, [samples]); // Re-initialize when samples data changes

    const statusLabelMap = {
        completed: "Completed",
        in_progress: "In Progress",
        pending: "Pending",
        disapproved: "Disapproved",
        approved: "Approved",
        received: "Received",
    };

    const tipeLabelMap = {
        external: "External",
        internal: "Internal",
        urgent: "Urgent",
        regular: "Regular",
    };

    const handleResultChange = (sampleId, paramId, value) => {
        setTestResults((prev) => {
            return prev.map((sample) => {
                if (sample.id === sampleId) {
                    const updatedParameters = sample.parameter.map((param) => {
                        if (param.id === paramId) {
                            return { ...param, result: value };
                        }
                        return param;
                    });
                    return { ...sample, parameter: updatedParameters };
                }
                return sample;
            });
        });
    };

    const handleShowDetail = (sample) => {
        setSelectedSample(sample);
        setIsDialogOpen(true);
    };

    const handleShowConfirm = (sample) => {
        setSelectedSample(sample);
        setIsConfirmDialogOpen(true);
    };

    const handleConfirmAction = (sample) => {
        confirmSample.mutate(sample.id);
        setIsConfirmDialogOpen(false);
    };

    const handleShowUnConfirm = (sample) => {
        setSelectedSample(sample);
        setIsUnConfirmDialogOpen(true);
    };

    const handleUnConfirmAction = (sample) => {
        unconfirmSample.mutate(sample.id);
        setIsUnConfirmDialogOpen(false);
    };

    const handleSaveResults = () => {      
        const payload = testResults.flatMap((sample) =>
            sample.parameter.map((param) => ({
                sample_id: sample.id,
                parameter: { id: param.id }, 
                result: param.result,
            }))
        );

		console.log(payload)
        
        saveResult({ 
            orderId: order.id, 
            payload: payload 
        }, {
            onSuccess: () => {
                setIsEditing(false);
            }
        });
    };

    const handleSubmitResults = () => {
		submitResult(order.id);
    };

	const handleDownloadPDF = () => {
		if (!order.result_value) {
			toast.error("Laporan belum digenerate.");
			return;
		}
		downloadResult(order.id);
	};

    const columns = useMemo(
        () =>
            getSampleColumns({
                onShowDetail: handleShowDetail,
                onShowConfirm: handleShowConfirm,
                onShowUnConfirm: handleShowUnConfirm,
            }),
        [confirmSample.isLoading, unconfirmSample.isLoading] 
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Detail Pesanan" user={usePage().props.auth.user} header="Kelola Data Pesanan">
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-gray-500">Memuat detail pesanan...</p>
                </div>
            </DashboardLayout>
        );
    }

    if (!order || !samples) {
        return (
            <DashboardLayout title="Detail Pesanan" user={usePage().props.auth.user} header="Kelola Data Pesanan">
                <div className="flex flex-col justify-center items-center h-64">
                    <p className="text-xl text-red-500">Detail Pesanan tidak ditemukan.</p>
                    <Button className="bg-primary-hijauTua mt-4">
                        <Link href="/analyst/order">Kembali</Link>
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    const orderDetails = [
        { label: "ID Pemesanan", value: order.order_number ?? "-" },
        { label: "Judul", value: order.title ?? "-" },
        { label: "Tipe Pemesanan", value: tipeLabelMap[order.order_type] ?? "-" },
        { label: "Tanggal Order", value: order.order_date ? new Date(order.order_date).toLocaleDateString("id-ID") : "-" },
        { label: "Estimasi Selesai", value: order.estimate_date ? new Date(order.estimate_date).toLocaleDateString("id-ID") : "-" },
        { label: "Waktu Laporan", value: order.report_issued_at ? new Date(order.report_issued_at).toLocaleDateString("id-ID") : "-" },
        { label: "Catatan", value: order.notes ?? "-" },
        { label: "Status", value: statusLabelMap[order.status] ?? "-" },
    ];

    const filterData = [
        { value: "all", label: "All Status" },
        { value: "done", label: "Done" },
        { value: "in_progress", label: "In Progress" },
    ];

    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <DashboardLayout title="Detail Pesanan" user={user} header="Kelola Data Pesanan">
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

                {/* --- Toggle Table / Input --- */}
                <div className="flex gap-3 mb-4">
                    <Button
                        className={`${viewMode === "input" ? "bg-primary-hijauTua text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setViewMode("input")}
                    >
                        Input Hasil Uji
                    </Button>
                    <Button
                        className={`${viewMode === "table" ? "bg-primary-hijauTua text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setViewMode("table")}
                    >
                        Tabel Sampel
                    </Button>
                </div>

                {/* --- Tabel Sampel --- */}
                {viewMode === "table" && (
                    <ManagedDataTable
                        data={samples}
                        columns={columns}
                        searchColumn="name"
                        showFilter={true}
                        showCreate={false}
                        filterColumn="status"
                        filterOptions={filterData}
                    />
                )}

                {/* --- Input Hasil Uji --- */}
                {viewMode === "input" && (
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">
                            Input Hasil Uji Sampel
                        </h2>

                        <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
                            {samples.map((sample) => {
                                // Temukan hasil uji yang sesuai dari testResults state
                                const currentTestResults = testResults.find(tr => tr.id === sample.id);
                                
                                return (
                                <div key={sample.id} className="bg-white flex flex-col shadow-md rounded-lg overflow-hidden">
                                    <h1 className="text-sm p-3 font-medium text-white bg-primary-hijauTua">
                                        Hasil Sample ({sample.name ?? "Tanpa Nama"})
                                    </h1>

                                    {console.log(sample.id)}
                                    {console.log(sample.parameter)}
                                    <div className="flex flex-col gap-2 p-3 py-6">
                                        {sample.parameter.map((param) => {
                                            const currentParamResult = currentTestResults?.parameter.find(p => p.id === param.id);
                                            
                                            return (
                                                <div key={param.id} className="flex items-center justify-between w-full">
                                                    <label className="text-sm text-gray-600">
                                                        {param.name} ({param.unit_values.value}) :
                                                    </label>

                                                    <input
                                                        type="text"
                                                        className={`w-1/2 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-hijauMuda ${
                                                            !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                                                        }`}
                                                        disabled={!isEditing}
                                                        value={currentParamResult?.result ?? ""} // Gunakan value dari state
                                                        onChange={(e) =>
                                                            handleResultChange(sample.id, param.id, e.target.value)
                                                        }
                                                        placeholder="Masukkan hasil uji..."
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )})}
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

							{isSubmitting ? 
								(<Button
									disabled
									className="bg-primary-hijauTua"
								>
									Generating...
								</Button>)
								:
								(<Button
									onClick={handleSubmitResults}
									className="bg-primary-hijauTua"
									disabled={confirmSample.isLoading || unconfirmSample.isLoading} // Tambahkan disable saat proses berjalan
								>
									Submit & Generate Laporan (PDF)
								</Button>)
							}
                        </div>
                    </div>
                )}

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
                    isPending={confirmSample.isLoading} // Tambahkan isPending
                />
                <SampleUnConfirmDialog
                    sample={selectedSample}
                    isOpen={isUnConfirmDialogOpen}
                    onOpenChange={setIsUnConfirmDialogOpen}
                    onUnconfirm={handleUnConfirmAction}
                    isPending={unconfirmSample.isLoading} // Tambahkan isPending
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