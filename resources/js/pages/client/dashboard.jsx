import DashboardLayout from "@/components/layouts/dashboard-layout";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
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

    const tableData = [
        { id: 'M-10', title: 'Uji kadar gula darah', status: 'In Progress', estimate_date: '12/10/25' },
        { id: 'M-09', title: 'Pengujian Makanan Ringan', status: 'In Progress', estimate_date: '10/10/25' },
        { id: 'M-08', title: 'Uji Kualitas Beras', status: 'Completed', estimate_date: '07/10/25' },
        { id: 'M-07', title: 'Tes Kandungan Air Mineral', status: 'Completed', estimate_date: '12/10/25' },
        { id: 'M-02', title: 'Analisis Kandungan Vitamin C', status: 'Completed', estimate_date: '12/10/25' },

        { id: 'M-11', title: 'Pengujian Air Minum', status: 'In Progress', estimate_date: '15/10/25' },
        { id: 'M-12', title: 'Tes Kadar Logam Berat', status: 'Pending', estimate_date: '18/10/25' },
        { id: 'M-13', title: 'Uji Kualitas Udara', status: 'In Progress', estimate_date: '20/10/25' },
        { id: 'M-14', title: 'Analisis Mikroorganisme', status: 'Completed', estimate_date: '05/10/25' },
        { id: 'M-15', title: 'Uji Nutrisi Pangan', status: 'In Progress', estimate_date: '22/10/25' },

        { id: 'M-16', title: 'Pengujian Bahan Kimia', status: 'Pending', estimate_date: '25/10/25' },
        { id: 'M-17', title: 'Tes Kadar Lemak', status: 'Completed', estimate_date: '01/10/25' },
        { id: 'M-18', title: 'Analisis Air Limbah', status: 'In Progress', estimate_date: '13/10/25' },
        { id: 'M-19', title: 'Uji Kandungan Vitamin D', status: 'Completed', estimate_date: '04/10/25' },
        { id: 'M-20', title: 'Pengujian Tekstur Makanan', status: 'Pending', estimate_date: '28/10/25' },

        { id: 'M-21', title: 'Uji Cemaran Bakteri', status: 'Completed', estimate_date: '06/10/25' },
        { id: 'M-22', title: 'Tes Toksisitas', status: 'In Progress', estimate_date: '14/10/25' },
        { id: 'M-23', title: 'Uji pH Bahan Cair', status: 'Completed', estimate_date: '03/10/25' },
        { id: 'M-24', title: 'Pengujian Stabilitas Sampel', status: 'Pending', estimate_date: '30/10/25' },
        { id: 'M-25', title: 'Analisis Kadar Garam', status: 'Completed', estimate_date: '02/10/25' },

        { id: 'M-26', title: 'Analisis Kadar Protein', status: 'In Progress', estimate_date: '17/10/25' },
        { id: 'M-27', title: 'Pengujian Aroma Makanan', status: 'Completed', estimate_date: '09/10/25' },
        { id: 'M-28', title: 'Tes Kontaminasi Jamur', status: 'Pending', estimate_date: '26/10/25' },
        { id: 'M-29', title: 'Uji Warna & Pigmen', status: 'In Progress', estimate_date: '19/10/25' },
        { id: 'M-30', title: 'Analisis Kandungan Air', status: 'Completed', estimate_date: '08/10/25' },
    ];


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
                    data={tableData}
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
