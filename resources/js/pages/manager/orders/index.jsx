import DashboardLayout from "../../../components/layouts/dashboard-layout";
import DataTable from "../../../components/shared/tabel/tabels"; // Mengimpor komponen DataTable yang sama

const Badge = ({ value, type = 'status' }) => { // Default type adalah 'status'
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full text-center";

    // Semua varian gaya digabungkan di sini
    const variantClasses = {
        status: {
            'Completed': 'bg-green-100 text-green-800',
            'In Progress': 'bg-yellow-100 text-yellow-800',
            'Pending': 'bg-blue-100 text-blue-800',
            'Disapproved': 'bg-red-100 text-red-800',
            'Approved': 'bg-teal-100 text-teal-800',
            'Received': 'bg-purple-100 text-purple-800',
        },
        tipe: {
            'Eksternal': 'bg-primary-hijauMuda/20 text-primary-hijauTua',
            'Internal': 'bg-blue-100 text-blue-800',
            'Urgent': 'bg-red-200 text-red-800',
        }
    };

    // Memilih gaya yang tepat berdasarkan 'type' dan 'value'
    const specificClass = variantClasses[type]?.[value] || 'bg-gray-100 text-gray-800';

    return <span className={`${baseClasses} ${specificClass}`}>{value}</span>;
}

// Data dummy untuk halaman Orders
const ordersData = [
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Perlu disetujui supervisor', tipe: 'Eksternal', status: 'Completed' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Urgent untuk audit', tipe: 'Internal', status: 'In Progress' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Perlu revisi laporan', tipe: 'Eksternal', status: 'Pending' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Butuh hasil cepat', tipe: 'Urgent', status: 'Disapproved' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Butuh hasil cepat', tipe: 'Urgent', status: 'Disapproved' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Butuh hasil cepat', tipe: 'Urgent', status: 'Disapproved' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Butuh hasil cepat', tipe: 'Urgent', status: 'Disapproved' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Butuh hasil cepat', tipe: 'Urgent', status: 'Disapproved' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Butuh hasil cepat', tipe: 'Urgent', status: 'Disapproved' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Butuh hasil cepat', tipe: 'Urgent', status: 'Disapproved' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Butuh hasil cepat', tipe: 'Urgent', status: 'Disapproved' },
    { id: 'A1', user_id: '1P2', estimasi: '13 Oktober 2025', catatan: 'Butuh hasil cepat', tipe: 'Urgent', status: 'Disapproved' },
];

export default function OrdersPage() {
    const user = { name: 'BIJI', role: 'Manager' };

    // Mendefinisikan kolom yang berbeda untuk tabel Orders
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

    return (
        <DashboardLayout title="Orders" user={user} header='Orders'>
            <DataTable
                columns={columns}
                data={ordersData}
                showSearch={true} // Menampilkan search bar
                showFilter={true}  // Menampilkan filter juga!
            />
        </DashboardLayout>
    );
}

