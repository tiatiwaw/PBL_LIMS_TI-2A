import DashboardLayout from "../../components/layouts/dashboard-layout";
import DataTable from "../../components/shared/tabel/tabels";

const Badge = ({ value, type = 'status' }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full text-center";

    const variantClasses = {
        tipe: {
            'Eksternal': 'bg-primary-hijauMuda/20 text-primary-hijauTua',
            'Internal': 'bg-blue-100 text-blue-800',
            'Urgent': 'bg-red-200 text-red-800',
        }
    };

    const specificClass = variantClasses[type]?.[value] || 'bg-gray-100 text-gray-800';

    return <span className={`${baseClasses} ${specificClass}`}>{value}</span>;
}

const userData = [
     {
        id: "1",
        nama: "Febby",
        role: "Admin",
        status: "Aktif",
        tanggal_bergabung: "12/03/2021",
        keterangan: "Mengelola Data Alat & Bahan",

    },
    {
        id: "2",
        nama: "Febby",
        role: "Admin",
        status: "Aktif",
        tanggal_bergabung: "12/03/2021",
        keterangan: "Mengelola Data Alat & Bahan",
    },
    {
        id: "3",
        nama: "Febby",
        role: "Admin",
        status: "Aktif",
        tanggal_bergabung: "12/03/2021",
        keterangan: "Mengelola Data Alat & Bahan",
    },
    {
        id: "4",
        nama: "Febby",
        role: "Admin",
        status: "Aktif",
        tanggal_bergabung: "12/03/2021",
        keterangan: "Mengelola Data Alat & Bahan",
    },
    {
        id: "5",
        nama: "Febby",
        role: "Admin",
        status: "Aktif",
        tanggal_bergabung: "12/03/2021",
        keterangan: "Mengelola Data Alat & Bahan",
    },
];

export default function penggunaPage() {
    const user = { name: 'Ben', role: 'Admin' };

    const columns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'nama', header: 'Nama' },
        { accessorKey: 'role', header: 'Role' },
        { accessorKey: 'status', header: 'Status' },
        { accessorKey: 'tanggal_bergabung', header: 'Tanggal Bergabung' },
        { accessorKey: 'keterangan', header: 'Keterangan' },

    ];

    return (
        <DashboardLayout title="Aktivitas Log" user={user} header='Pengguna'>
            <DataTable
                columns={columns}
                data={userData}
                showSearch={true}
                showFilter={true}
            />
            
        </DashboardLayout>
        
    );
}