import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { orders } from "@/data/analyst/orders";
import { useMemo } from "react";
import { stats } from "@/data/client/dashboard";
import StatCard from "@/components/shared/card/stat-card";
import { getOrdersColumns } from "@/components/shared/client/order-columns";

const dashboard = () => {

    const user = {
        name: 'Nardo',
        role: 'Client',
        avatar: 'https://i.pravatar.cc/150?img=3',
    };

    const filterData = [
        { value: "all", label: "All Status" },
        { value: "Completed", label: "Completed" },
        { value: "In Progress", label: "In Progress" },
        { value: "Pending", label: "Pending" },
        { value: "Disapproved", label: "Disapproved" },
        { value: "Approved", label: "Approved" },
        { value: "Received", label: "Received" },
    ]


    const columns = useMemo(() => getOrdersColumns(), []);


    return (
        <DashboardLayout title="Client" user={user} header='Selamat Datang Client!'>
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-center text-primary-hijauTua">
                    Daftar Pesanan
                </h2>

                <ManagedDataTable
                    data={orders}
                    columns={columns}
                    searchColumn="title"
                    showFilter={true}
                    filterColumn="status"
                    filterOptions={filterData}
                />
            </div>
        </DashboardLayout>
    )
}

export default dashboard;
