// resources/js/pages/client/detail/index.jsx
import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { FileDown, XCircle } from "lucide-react";
import { getSampleColumns } from "@/components/shared/client/sample-columns";
import SampleDetailsDialog from "@/components/shared/dialog/sample-detail-dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { useOrderDetail } from "@/hooks/useClient";
import SampleDetailSheet from "@/components/shared/sheet/sample-detail-sheet";
import Loading from "@/components/ui/loading";

export default function ClientOrderDetail({ auth, orderId }) {
    const {
        data: order,
        isLoading,
        isError,
        errorMessage,
    } = useOrderDetail(orderId);

    // 🔸 State dialog sample
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSample, setSelectedSample] = useState(null);

    const handleShowDetail = (sample) => {
        setSelectedSample(sample);
        setIsDialogOpen(true);
    };

    const columns = useMemo(() =>
        getSampleColumns({
            onShowDetail: handleShowDetail,
        })
    );

    // === STATE LOADING ===
    if (isLoading) {
        return (
            <DashboardLayout title="Detail Pemesanan" header="Memuat Data...">
                <Loading />
            </DashboardLayout>
        );
    }

    // === STATE ERROR ===
    if (isError) {
        return (
            <DashboardLayout
                title="Detail Pemesanan"
                header="Terjadi Kesalahan"
            >
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <XCircle className="w-12 h-12 text-red-500 mb-4" />
                    <p className="text-lg font-semibold text-red-600">
                        {errorMessage || "Gagal memuat data."}
                    </p>
                    <Link
                        href={route("client.index")}
                        className="mt-6 bg-primary-hijauTua hover:bg-primary-hijauGelap text-white px-6 py-3 rounded-xl shadow-lg"
                    >
                        Kembali
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    // === DATA BERHASIL DIMUAT ===
    return (
        <DashboardLayout title="Detail Pemesanan" header="Detail Pemesanan">
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 text-primary-hijauTua p-4">
                {/* --- Detail Pemesanan --- */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-xl font-bold mb-5 text-gray-800">
                        Detail Pemesanan
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-y-2 text-sm font-medium">
                        <span className="text-gray-600">Kode Pemesanan</span>
                        <span>
                            : {order?.data?.order_details?.id_pemesanan || "-"}
                        </span>

                        <span className="text-gray-600">Judul</span>
                        <span>
                            : {order?.data?.order_details?.judul || "-"}
                        </span>

                        <span className="text-gray-600">Metode Analisis</span>
                        <span>
                            :{" "}
                            {order?.data?.order_details?.metode_analisis || "-"}
                        </span>

                        <span className="text-gray-600">Tanggal Order</span>
                        <span>
                            : {order?.data?.order_details?.tanggal_order || "-"}
                        </span>

                        <span className="text-gray-600">Estimasi Selesai</span>
                        <span>
                            :{" "}
                            {order?.data?.order_details?.tanggal_estimasi ||
                                "-"}
                        </span>

                        <span className="text-gray-600">Catatan</span>
                        <span>
                            : {order?.data?.order_details?.catatan || "-"}
                        </span>
                    </div>
                </div>

                {/* --- Tabel Sampel --- */}
                <ManagedDataTable
                    data={order?.data?.table_data_sample || []}
                    columns={columns}
                    searchColumn="name"
                    showFilter={true}
                    showCreate={false}
                    filterColumn="status"
                    filterOptions={[
                        { value: "all", label: "Semua" },
                        { value: "pending", label: "Pending" },
                        { value: "in_progress", label: "Dalam Proses" },
                        { value: "done", label: "Selesai" },
                    ]}
                />

                <SampleDetailSheet
                    data={selectedSample}
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />

                {/* --- Tombol Kembali --- */}
                <div className="w-full flex justify-end mt-4">
                    <Link href={route("client.index")}>
                        <Button className="bg-primary-hijauTua text-white hover:bg-primary-hijauGelap">
                            Kembali
                        </Button>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
