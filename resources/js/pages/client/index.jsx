import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useMemo, useState } from "react";
import StatCard from "@/components/shared/card/stat-card";
import { CheckIcon, ClipboardList, Clock10Icon } from "lucide-react";
import { getOrdersColumns } from "@/components/shared/client/order-columns";
import Loading from "@/components/ui/loading";
import { router } from "@inertiajs/react";
import { useDashboard } from "@/hooks/useClient";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Disapproved", label: "Disapproved" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received" },
];

export default function ClientPage({ auth }) {

    const { 
        data: dashboard, 
        isLoading,
        error,
    } = useDashboard();

    const [downloadModal, setDownloadModal] = useState({
        open: false,
        options: [],
        order: null,
        loading: false,
    });

    const handleShowDetail = (orders) => {
        router.visit(route('client.orders.show', { id: orders.id }));
    };

    const handleShowHistory = (orders) => {
        router.visit(route('client.orders.status', { id: orders.id }));
    };

    const handlePayment = (orders) => {
        router.visit(route('client.orders.payment', { id: orders.id }));
    };

    const handleDownload = (orders) => {
        setDownloadModal({ ...downloadModal, loading: true });
        
        // Panggil API untuk ambil download options
        fetch(`/api/v1/client/orders/download-options/${orders.order_number}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setDownloadModal({
                    open: true,
                    options: data.data.options,
                    order: orders,
                    loading: false,
                });
            } else {
                alert('Gagal memuat opsi download: ' + data.message);
                setDownloadModal({ ...downloadModal, loading: false });
            }
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Terjadi kesalahan saat mengambil opsi download');
            setDownloadModal({ ...downloadModal, loading: false });
        });
    };

    const handleSelectDownload = (endpoint) => {
        // Buka endpoint di tab/window baru atau langsung download
        window.location.href = endpoint;
        
        // Tutup modal setelah beberapa ms
        setTimeout(() => {
            setDownloadModal({ open: false, options: [], order: null, loading: false });
        }, 500);
    };

    const handleCloseModal = () => {
        setDownloadModal({ open: false, options: [], order: null, loading: false });
    };

    const columns = useMemo(
        () => getOrdersColumns({
            onShowDetail: handleShowDetail, 
            onShowHistory: handleShowHistory,
            onPayment: handlePayment,
            onDownload: handleDownload,
        }),
        []
    );

    const stats = [
        { 
            title: 'Total Order', 
            value: dashboard?.data?.stats?.total_orders || 0, 
            subtitle: 'Semua order terdaftar', 
            IconComponent: ClipboardList 
        },
        { 
            title: 'Sedang Diuji', 
            value: dashboard?.data?.stats?.processing_orders || 0, 
            subtitle: 'Order dalam proses', 
            IconComponent: Clock10Icon 
        },
        { 
            title: 'Selesai', 
            value: dashboard?.data?.stats?.completed_orders || 0, 
            subtitle: 'Order telah selesai', 
            IconComponent: CheckIcon 
        },
    ];

    if (isLoading) {
        return (
            <DashboardLayout title="Dashboard Client"  header="Selamat Datang, Client!">
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout title="Dashboard Client"  header="Selamat Datang, Client!">
                <div className="text-center text-red-500 py-8">
                    {error.message || "Gagal memuat dashboard."}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Dashboard Client"  header="Selamat Datang, Client!">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Riwayat Order</h2>
                            <p className="text-sm text-gray-500 mt-1">Status order dan progres terbaru</p>
                        </div>
                    </div>
                    <ManagedDataTable
                        data={dashboard?.data?.orders || []}
                        columns={columns}
                        showFilter={true}
                        showCreate={false}
                        filterColumn="status"
                        filterOptions={filterData}
                    />
                </div>

            </div>

            {/* Download Modal */}
            {downloadModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Download Order
                            </h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Order: {downloadModal.order?.order_number}
                            </p>
                        </div>

                        {/* Loading State */}
                        {downloadModal.loading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin">
                                    <Clock10Icon className="w-8 h-8 text-blue-500" />
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Options List */}
                                <div className="space-y-3 mb-6">
                                    {downloadModal.options.length > 0 ? (
                                        downloadModal.options.map((option) => (
                                            <button
                                                key={option.type}
                                                onClick={() => handleSelectDownload(option.endpoint)}
                                                className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-left transition-colors duration-200"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl">📄</span>
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {option.label}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Klik untuk download
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-center text-gray-500 py-4">
                                            Tidak ada file yang tersedia untuk didownload
                                        </p>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCloseModal}
                                        className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors duration-200"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}