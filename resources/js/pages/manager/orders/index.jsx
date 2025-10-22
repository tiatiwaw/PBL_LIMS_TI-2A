import { ordersData } from "@/data/manager/orders";
import DashboardLayout from "../../../components/layouts/dashboard-layout";
import DataTable from "../../../components/shared/tabel/tabels";

const Badge = ({ value, type = 'status' }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full text-center";

    const variantClasses = {
        status: {
            'Completed': 'bg-green-100 text-green-800',
            'In Progress': 'bg-yellow-100 text-yellow-800',
            'Pending': 'bg-blue-200 text-blue-700',
            'Disapproved': 'bg-red-200 text-red-800',
            'Approved': 'bg-teal-100 text-teal-800',
            'Received': 'bg-purple-100 text-purple-800',
        },
        tipe: {
            'Eksternal': 'bg-primary-hijauMuda/20 text-primary-hijauTua',
            'Internal': 'bg-blue-100 text-blue-800',
            'Urgent': 'bg-red-200 text-red-800',
        }
    };

    const specificClass = variantClasses[type]?.[value] || 'bg-gray-100 text-gray-800';

    return <span className={`${baseClasses} ${specificClass}`}>{value}</span>;
}

export default function OrdersPage() {
    const user = { name: 'BIJI', role: 'Manager' };

    const columns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'user_id', header: 'User ID' },
        { accessorKey: 'estimasi', header: 'Estimasi Waktu' },
        { accessorKey: 'catatan', header: 'Catatan' },
        { 
            accessorKey: 'tipe', 
            header: 'Tipe Order',
            cell: ({ row }) => <Badge value={row.tipe} type='tipe' />
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => <Badge value={row.status} type='status' />
        },
    ];

    const filterData = [
        { value: 'all', label: 'All Items' },
        { value: 'completed', label: 'Completed' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'pending', label: 'Pending' },
        { value: 'disapproved', label: 'Disapproved' },
        { value: 'approved', label: 'Approved' },
        { value: 'received', label: 'Received' },
    ];

    return (
        <DashboardLayout title="Orders" user={user} header='Orders'>
            <DataTable
                columns={columns}
                data={ordersData}
                showSearch={true}
                showFilter={true}
                filterOptions={filterData}
            />
        </DashboardLayout>
    );
}

