import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { useMemo } from "react";
import { stats } from "@/data/client/dashboard";
import StatCard from "@/components/shared/card/stat-card";
import { CheckIcon, ClipboardList, Clock10Icon } from "lucide-react";
import { router } from "@inertiajs/react";
import { orders } from "@/data/manager/detail";
import { getOrdersColumns } from "@/components/shared/manager/order-columns";

const filterData = [
    { value: "all", label: "All Status" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
    { value: "Pending", label: "Pending" },
    { value: "Disapproved", label: "Disapproved" },
    { value: "Approved", label: "Approved" },
    { value: "Received", label: "Received" },
];

export default function ClientPage({ auth, ordersData }) {
    const handleShowDetail = (data) => {
        router.visit(`/client/orders/${data.id}`);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Client" };
    const parameters = ordersData || orders;

    const columns = useMemo(() => getOrdersColumns({ onShowDetail: handleShowDetail }), []);

    // const statCardsData = [
    //     { title: 'Total Sampel', value: 20, subtitle: 'Berdasarkan Bulan Terakhir', IconComponent: ClipboardList },
    //     { title: 'Sedang Diuji', value: 20, subtitle: 'Berdasarkan Bulan Terakhir', IconComponent: Clock10Icon },
    //     { title: 'Selesai', value: 20, subtitle: 'Berdasarkan Bulan Terakhir', IconComponent: CheckIcon },
    // ];

    // const tableData = [
    //     { kode: 'M-10', status: 'Sedang Diuji', tanggal: '12/10/25' },
    //     { kode: 'M-09', status: 'Sedang Diuji', tanggal: '10/10/25' },
    //     { kode: 'M-08', status: 'Selesai', tanggal: '07/10/25' },
    //     { kode: 'M-07', status: 'Selesai', tanggal: '12/10/25' },
    //     { kode: 'M-02', status: 'Selesai', tanggal: '12/10/25' },
    // ];

    return (
        <DashboardLayout title="Client" user={currentUser} header='Selamat Datang Client!'>
            <div className="space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>

                <ManagedDataTable
                    data={parameters}
                    columns={columns}
                    showFilter={true}
                    showCreate={false}
                    filterColumn="status"
                    filterOptions={filterData}
                />
            </div>
        </DashboardLayout>
    )
}