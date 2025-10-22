import DashboardLayout from "../../../components/layouts/dashboard-layout";
import DataTable from "../../../components/shared/tabel/tabels"; // Mengimpor komponen DataTable yang sama

// Data dummy
const usersData = [
    { id: 'A1', nama: 'Bahlil', role: 'Admin', email: 'korup@gmail.com'},
    { id: 'A1', nama: 'Ahmad', role: 'Admin', email: 'test@gmail.com'},
    { id: 'A1', nama: 'Bagas', role: 'Admin', email: 'bagas@gmail.com' },
    { id: 'A1', nama: 'Sahroni', role: 'Admin', email: 'sahroni@gmail.com'},
    { id: 'A1', nama: 'Bahlil', role: 'Admin', email: 'korup@gmail.com'},
    { id: 'A1', nama: 'Ahmad', role: 'Admin', email: 'test@gmail.com'},
    { id: 'A1', nama: 'Bagas', role: 'Admin', email: 'bagas@gmail.com' },
    { id: 'A1', nama: 'Sahroni', role: 'Admin', email: 'sahroni@gmail.com'},
    { id: 'A1', nama: 'Bahlil', role: 'Admin', email: 'korup@gmail.com'},
    { id: 'A1', nama: 'Ahmad', role: 'Admin', email: 'test@gmail.com'},
    { id: 'A1', nama: 'Bagas', role: 'Admin', email: 'bagas@gmail.com' },
    { id: 'A1', nama: 'Sahroni', role: 'Admin', email: 'sahroni@gmail.com'},
];

export default function OrdersPage() {
    const user = { name: 'BIJI', role: 'Manager' };

    // Mendefinisikan kolom yang berbeda untuk tabel Orders
    const columns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'nama', header: 'Nama' },
        { accessorKey: 'role', header: 'Role' },
        { accessorKey: 'email', header: 'Email' },

    ];

    return (
        <DashboardLayout title="Users" user={user} header='Users'>
            <DataTable
                columns={columns}
                data={usersData}
                showSearch={true} // Menampilkan search bar
                showFilter={true}  // Menampilkan filter juga!
            />
        </DashboardLayout>
    );
}
