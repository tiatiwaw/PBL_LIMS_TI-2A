import DashboardLayout from "@/components/layouts/dashboard-layout";
import { AlertTriangle, ShoppingCart, Loader, CheckCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
} from "@/components/ui/card";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { getOrdersColumns } from "@/components/shared/analyst/incoming-order-columns";
import StatCard from "@/components/shared/card/stat-card";
import { useDashboard } from "@/hooks/useAnalyst";
import { useAuth } from "@/hooks/useAuth";
import Loading from "@/components/ui/loading";

const Dashboard = () => {
    const handleAccept = async (id, formData) => {
        acceptOrder.mutateAsync({ id, data: formData });
        window.location.href = "/analyst/dashboard";
    };

    const {
        data: dashboard,
        isLoading,
        error,
        update: acceptOrder,
    } = useDashboard();
    const orders = dashboard?.orders;
    const [selectedTest, setSelectedTest] = useState(null);

    const columns = useMemo(() => getOrdersColumns({ setSelectedTest }), []);

    const cards = [
        {
            title: "Total Pending Orders",
            value: String(dashboard?.stats?.pendingOrder ?? 0),
            subtitle: "Semua pesanan yang tercatat",
            icon: ShoppingCart,
        },
        {
            title: "Total Processed Order",
            value: String(dashboard?.stats?.processedOrder ?? 0),
            subtitle: "Pesanan sedang dikerjakan",
            icon: Loader,
        },
        {
            title: "Total Completed Order",
            value: String(dashboard?.stats?.completedOrder ?? 0),
            subtitle: "Pesanan selesai",
            icon: CheckCircle,
        },
    ];

    const filterData = [
        { value: "all", label: "Semua Tipe" },
        { value: "internal", label: "Internal" },
        { value: "external", label: "External" },
        { value: "regular", label: "Regular" },
        { value: "urgent", label: "Urgent" },
    ];

    if (isLoading) {
        return (
            <DashboardLayout
                title="Dashboard Analis" header="Dashboard Analis"
            >
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout
               title="Dashboard Analis" header="Dashboard Analis"
            >
                <div className="text-center text-red-500 py-8">
                    {error.message || "Terjadi kesalahan saat memuat data"}
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Dashboard Analis" header="Dashboard Analis">
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>

                <h2 className="font-bold text-lg mt-3 -mb-3">Tes Mendatang</h2>
                <ManagedDataTable
                    data={orders ?? []}
                    columns={columns}
                    pageSize={5}
                    showSearch={false}
                    showFilter={true}
                    searchColumn="id"
                    showCreate={false}
                    filterOptions={filterData}
                    filterColumn="order_type"
                />

                {/* Modal konfirmasi */}
                {selectedTest && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <Card className="border-0 w-[450px] bg-primary-hijauMuda relative rounded-2xl shadow-xl text-[#02364B]">
                            <button
                                onClick={() => setSelectedTest(null)}
                                className="absolute top-4 right-4 text-primary-hijauTua hover:opacity-80"
                            >
                                ✕
                            </button>
                            <CardHeader className="flex items-center justify-center pt-10">
                                <AlertTriangle className="w-20 h-20 text-primary-hijauTua" />
                            </CardHeader>
                            <CardContent className="text-center px-8 pb-8">
                                <p className="font-bold text-lg leading-relaxed">
                                    Apakah Anda yakin akan menerima pesanan?
                                </p>
                            </CardContent>
                            <CardFooter className="flex justify-center gap-4 pb-8">
                                <Button
                                    onClick={() => {
                                        handleAccept(selectedTest.id, {
                                            status: "in_progress",
                                        });
                                        setSelectedTest(null);
                                    }}
                                    className="rounded-lg px-6 bg-primary-hijauTua text-white hover:bg-primary-hijauTua/90"
                                >
                                    Terima
                                </Button>
                                <Button
                                    onClick={() => setSelectedTest(null)}
                                    variant="outline"
                                    className="rounded-lg px-6 border-primary-hijauTua text-primary-hijauTua hover:bg-primary-hijauTua hover:text-white"
                                >
                                    Batal
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
