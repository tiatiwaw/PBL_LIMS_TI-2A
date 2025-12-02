import React, { useState, useMemo, useEffect } from "react";
import { usePage, Link, router } from '@inertiajs/react';
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { getSampleColumns } from "@/components/shared/analyst/sample-columns";
import SampleDetailsDialog from "@/components/shared/dialog/sample-detail-dialog";
import SampleConfirmDialog from "@/components/shared/dialog/sample-confirm-dialog";
import SampleUnConfirmDialog from "@/components/shared/dialog/sample-unconfirm-dialog";
import { Button } from "@/components/ui/button";
import { useOrderDetail, useResult } from "@/hooks/useAnalyst";
import { toast } from "sonner";

export default function OrderDetail({ orderId }) {
    const {
        data,
        isLoading,
    } = useOrderDetail(orderId);

    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const [isSaving, setIsSaving] = useState(false);

    const order = data?.order;
    const samples = data?.samples;

    const { saveResult } = useResult(); // Ambil saveResult dari hook

    const [viewMode, setViewMode] = useState("input"); // "table" | "input"
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isUnConfirmDialogOpen, setIsUnConfirmDialogOpen] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // State untuk hasil uji parameter
    const [testResults, setTestResults] = useState([]);

    // --- 1. STATE BARU: Untuk Hasil Input Reagen ---
    const [reagentResults, setReagentResults] = useState([]);

    useEffect(() => {
        if (samples) {
            // Inisialisasi Parameter (Kode Lama)
            setTestResults(
                samples.map((sample) => ({
                    id: sample.id,
                    parameter: [
                        {
                            id: sample.n_parameter_methods.test_parameters.id,
                            result: sample.n_parameter_methods.result ?? "",
                            test_method_id: sample.test_method_id ?? null,
                            equipment_id: sample.n_parameter_methods.equipment_id ?? null,
                            reagents: sample.n_parameter_methods.reagents ?? [],
                        }
                    ]
                }))
            );

            // --- 2. INISIALISASI STATE REAGEN ---
            setReagentResults(
                samples.map((sample) => ({
                    sample_id: sample.id,
                    reagents: sample.n_parameter_methods.reagents.map((r) => ({
                        reagent_id: r.id,
                        name: r.name,
                        // Asumsi backend mengirim data pivot (volume_used), jika tidak default 0
                        volume_used: r.pivot?.volume_used ?? 0
                    }))
                }))
            );
        }
    }, [samples]);

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

    // Handler Parameter (Kode Lama)
    const handleResultChange = (sampleId, value) => {
        setTestResults(prev =>
            prev.map(s =>
                s.id === sampleId
                    ? {
                        ...s,
                        parameter: s.parameter.map(p => ({
                            ...p,
                            result: value
                        }))
                    }
                    : s
            )
        );
    };

    // --- 3. HANDLER BARU: Input Reagen ---
    const handleReagentChange = (sampleId, reagentId, value) => {
        setReagentResults(prev =>
            prev.map(s =>
                s.sample_id === sampleId
                ? {
                    ...s,
                    reagents: s.reagents.map(r =>
                        r.reagent_id === reagentId
                        ? { ...r, volume_used: value }
                        : r
                    )
                }
                : s
            )
        );
    };

    // --- 4. FUNCTION BARU: Save Reagen ---
    // Fungsi ini mengirim data ke endpoint khusus untuk menyimpan pemakaian reagen
    const handleSaveReagents = () => {
        // Flatten data agar mudah diproses backend
        const payload = reagentResults.flatMap(sample =>
            sample.reagents.map(r => ({
                sample_id: sample.sample_id,
                reagent_id: r.reagent_id,
                volume_used: r.volume_used
            }))
        );

        // Contoh endpoint: '/analyst/reagent-usage/store'
        // Pastikan route ini ada di routes/web.php Anda
        router.post('/analyst/reagent-usage/store', { usages: payload }, {
            preserveScroll: true,
            onSuccess: () => {
                // Opsional: Toast khusus reagen jika mau
                // toast.success("Data reagen tersimpan.");
            },
            onError: (errors) => {
                console.error("Gagal simpan reagen:", errors);
                toast.error("Gagal menyimpan data reagen.");
            }
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
        // Asumsi confirmSample ada di import atau hook (tidak ada di snippet asli, tapi dibiarkan)
        // confirmSample.mutate(sample.id);
        setIsConfirmDialogOpen(false);
    };

    const handleShowUnConfirm = (sample) => {
        setSelectedSample(sample);
        setIsUnConfirmDialogOpen(true);
    };

    const handleUnConfirmAction = (sample) => {
        // unconfirmSample.mutate(sample.id);
        setIsUnConfirmDialogOpen(false);
    };

    // --- MODIFIKASI: Save Utama Memanggil Kedua Fungsi ---
    const handleSaveResults = async () => {
        setIsSaving(true);

        // 1. Simpan Reagen (Function Baru)
        handleSaveReagents();

        // 2. Simpan Parameter (Logic Lama)
        const results = testResults.flatMap(sample =>
            sample.parameter.map(param => ({
                sample_id: sample.id,
                parameter: { id: param.id },
                result: param.result?.trim() || null,
            }))
        );

        saveResult(
            order.id,
            { results },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    toast.success("Berhasil disimpan (Parameter & Reagen)!");
                },
                onError: (err) => {
                    toast.error("Gagal menyimpan parameter!");
                },
                onSettled: () => {
                    setIsSaving(false);
                },
            }
        );
    };

    const columns = useMemo(
        () =>
            getSampleColumns({
                onShowDetail: handleShowDetail,
                onShowConfirm: handleShowConfirm,
                onShowUnConfirm: handleShowUnConfirm,
            }),
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
        { label: "Judul ", value: order.title ?? "-" },
        { label: "Tipe Pemesanan", value: tipeLabelMap[order.order_type] ?? "-" },
        { label: "Tanggal Pesan", value: order.order_date ? new Date(order.order_date).toLocaleDateString("id-ID") : "-" },
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
                                const currentTest = testResults.find(tr => tr.id === sample.id);
                                const param = sample.n_parameter_methods.test_parameters;
                                const paramResult = currentTest?.parameter?.[0]?.result ?? "";

                                // Ambil data reagen dari state baru untuk sample ini
                                const currentReagents = reagentResults.find(r => r.sample_id === sample.id)?.reagents || [];

                                return (
                                    <div
                                        key={sample.id}
                                        className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100"
                                    >
                                        {/* Header */}
                                        <h1 className="text-sm p-3 font-semibold text-white bg-primary-hijauTua">
                                            Hasil Sample ({sample.name ?? "Tanpa Nama"})
                                        </h1>

                                        {/* Parameter Input */}
                                        <div className="flex flex-col gap-4 p-5">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                                <div className="flex flex-col w-full sm:w-1/3">
                                                    <label className="text-sm font-medium text-gray-700">
                                                        {param?.name}
                                                    </label>
                                                    <p className="text-[11px] text-gray-500 italic">
                                                        {param?.quality_standard}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2 w-full sm:w-2/3">
                                                    <input
                                                        type="text"
                                                        className={`w-full border rounded-lg px-3 py-2 text-sm shadow-sm
                                                            focus:outline-none focus:ring-2 focus:ring-primary-hijauMuda
                                                            ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
                                                        disabled={!isEditing}
                                                        value={paramResult}
                                                        onChange={(e) =>
                                                            handleResultChange(sample.id, e.target.value)
                                                        }
                                                        placeholder="Masukkan hasil uji..."
                                                    />

                                                    <span className="border bg-gray-50 text-gray-600 text-sm px-3 py-2 rounded-lg shadow-sm">
                                                        {param?.unit_values?.value}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Additional Info Section */}
                                        <div className="border-t border-gray-200 bg-gray-50 p-5 space-y-3">

                                            {/* --- 5. UI REAGEN UPDATE: Input Table --- */}
                                            <div className="border rounded-lg shadow-sm bg-white">
                                                <button
                                                    className="w-full flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-700"
                                                    onClick={() => toggleSection(`reagen-${sample.id}`)}
                                                >
                                                    Reagen (Input Pemakaian)
                                                    <span className="transition-transform duration-300"
                                                        style={{
                                                            transform:
                                                                openSection === `reagen-${sample.id}` ? "rotate(180deg)" : "rotate(0deg)"
                                                        }}
                                                    >
                                                        ▼
                                                    </span>
                                                </button>

                                                <div
                                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                        openSection === `reagen-${sample.id}` ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                                    }`}
                                                >
                                                    <div className="p-4">
                                                        {currentReagents.length > 0 ? (
                                                            <div className="space-y-3">
                                                                <div className="grid grid-cols-[2fr_1fr] gap-2 text-xs font-bold text-gray-500 uppercase border-b pb-2">
                                                                    <span>Nama Reagen</span>
                                                                    <span>Volume</span>
                                                                </div>
                                                                {currentReagents.map((r) => (
                                                                    <div key={r.reagent_id} className="grid grid-cols-[2fr_1fr] gap-2 items-center">
                                                                        <label className="text-sm text-gray-700 truncate" title={r.name}>
                                                                            {r.name}
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            step="any"
                                                                            placeholder="0"
                                                                            disabled={!isEditing}
                                                                            value={r.volume_used}
                                                                            onChange={(e) => handleReagentChange(sample.id, r.reagent_id, e.target.value)}
                                                                            className={`w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary-hijauMuda
                                                                                ${!isEditing ? "bg-gray-100" : "bg-white"}`}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-gray-400 italic text-center py-2">Tidak ada reagen.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Metode Pengujian */}
                                            <div className="border rounded-lg shadow-sm bg-white">
                                                <button
                                                    className="w-full flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-700"
                                                    onClick={() => toggleSection(`metode-${sample.id}`)}
                                                >
                                                    Metode Pengujian
                                                    <span className="transition-transform duration-300"
                                                        style={{
                                                            transform:
                                                                openSection === `metode-${sample.id}` ? "rotate(180deg)" : "rotate(0deg)"
                                                        }}
                                                    >
                                                        ▼
                                                    </span>
                                                </button>

                                                <div
                                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                        openSection === `metode-${sample.id}` ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                                    }`}
                                                >
                                                    <ul className="text-sm text-gray-600 list-disc ml-6 pb-3 pt-1">
                                                        {sample.test_method.map((m) => (
                                                            <li key={m.id}>{m.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* Alat */}
                                            <div className="border rounded-lg shadow-sm bg-white">
                                                <button
                                                    className="w-full flex justify-between items-center px-4 py-2 text-sm font-semibold text-gray-700"
                                                    onClick={() => toggleSection(`alat-${sample.id}`)}
                                                >
                                                    Alat
                                                    <span className="transition-transform duration-300"
                                                        style={{
                                                            transform:
                                                                openSection === `alat-${sample.id}` ? "rotate(180deg)" : "rotate(0deg)"
                                                        }}
                                                    >
                                                        ▼
                                                    </span>
                                                </button>

                                                <div
                                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                                        openSection === `alat-${sample.id}` ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                                    }`}
                                                >
                                                    <ul className="text-sm text-gray-600 list-disc ml-6 pb-3 pt-1">
                                                        {sample.n_parameter_methods.equipments.map((eq) => (
                                                            <li key={eq.id}>{eq.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                         </div>

                                    </div>

                                );
                            })}
                        </div>


                        {/* Tombol Edit / Save / Loading */}
                        <div className="flex justify-end mt-6">
                            {isEditing ? (
                                <Button
                                    onClick={handleSaveResults}
                                    disabled={isSaving}
                                    className="min-w-32 flex items-center gap-2 bg-primary-hijauTua hover:bg-primary-hijauMuda"
                                >
                                    {isSaving ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    fill="none"
                                                />
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v8z"
                                                />
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        "Simpan Hasil"
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsEditing(true)}
                                    variant="outline"
                                    className="border-primary-hijauTua text-primary-hijauTua hover:bg-primary-hijauTua hover:text-white"
                                >
                                    Edit Hasil Uji
                                </Button>
                            )}
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
