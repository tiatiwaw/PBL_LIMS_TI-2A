import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getOrdersColumns } from "@/components/shared/supervisor/orders-columns";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import Loading from "@/components/ui/loading";
import { useOrders } from "@/hooks/useSupervisor";
import { router } from "@inertiajs/react";
import { useMemo } from "react";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "received", label: "Diterima" },
    { value: "paid", label: "Dibayar" },
    { value: "received_test", label: "Selesai Pengujian" },
];

export default function OrdersPage() {
    const { data: orders, isLoading, error } = useOrders();

    const handleShowDetail = (data) => {
        router.visit(route("supervisor.order.detail", data.id));
    };

    const columns = useMemo(
        () => getOrdersColumns({ onShowDetail: handleShowDetail }),
        []
    );

    if (isLoading) {
        return (
            <DashboardLayout title="Manajemen Order" header="Manajemen Order">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Manajemen Order" header="Manajemen Order">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Manajemen Order" header="Manajemen Order">
            <ManagedDataTable
                data={orders || []}
                columns={columns}
                showSearch={true}
                showFilter={true}
                showCreate={false}
                filterColumn="status"
                filterOptions={filterData}
            />

            {/* Status Legend */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                    Keterangan Status:
                </p>
                <div className="space-y-2">
                    <div className="flex items-start gap-3 text-sm">
                        <span className="text-teal-600 font-bold">●</span>
                        <p>
                            <span className="font-semibold">Diterima:</span>{" "}
                            Order telah diterima, Anda dapat melakukan validasi
                            atau repeat test
                        </p>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                        <span className="text-blue-600 font-bold">●</span>
                        <p>
                            <span className="font-semibold">Dibayar:</span>{" "}
                            Pembayaran sudah diterima, menunggu hasil akhir
                            pengujian
                        </p>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                        <span className="text-purple-600 font-bold">●</span>
                        <p>
                            <span className="font-semibold">
                                Selesai Pengujian:
                            </span>{" "}
                            Pengujian selesai, Anda dapat validasi hasil atau
                            request repeat test jika diperlukan
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
