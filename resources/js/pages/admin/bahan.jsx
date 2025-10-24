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

const bahanData = [
      {
      no: 1,
      id: "LAB-001",
      nama_bahan: "Etanol 96%",
      kadaluwarsa: "Analitik",
      jumlah: "5 Liter",
      kondisi: "Baik",
      letak_penyimpnana: "Lemari Kimia A",
    },
    {
      no: 2,
      id: "LAB-002",
      nama_bahan: "Natrium Klorida",
      kadaluwarsa: "Analitik",
      jumlah: "2 kg",
      kondisi: "Baik",
      letak_penyimpnana: "Lemari Kimia B",
    },
    {
      no: 3,
      id: "LAB-003",
      nama_bahan: "Asam Sulfat",
      kadaluwarsa: "Analitik",
      jumlah: "3 Liter",
      kondisi: "Baik",
      letak_penyimpnana: "Lemari Asam",
    },
    {
      no: 4,
      id: "LAB-004",
      nama_bahan: "Buffer Sulfat",
      kadaluwarsa: "Analitik",
      jumlah: "1000 ml",
      kondisi: "Baik",
      letak_penyimpnana: "Kulkas Lab.",
    },
];

export default function bahanPage() {
    const user = { name: 'Ben', role: 'Admin' };

    const columns = [
        { accessorKey: 'no', header: 'No.' },
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'nama_bahan', header: 'Nama Bahan' },
        { accessorKey: 'kadaluwarsa', header: 'Kadaluarsa' },
        { accessorKey: 'jumlah', header: 'Jumlah' },
        { accessorKey: 'kondisi', header: 'Kondisi' },
        { accessorKey: 'letak_penyimpnana', header: 'Letak Penyimpanan' },
    ];

    return (
        <DashboardLayout title="Alat & Bahan" user={user} header='Alat & Bahan'>
        <p className="text-3xl font-semibold text-primary-hijauTua">Bahan :</p>
            <DataTable
                columns={columns}
                data={bahanData}
                showSearch={false} 
                showFilter={false}
            />
            
        </DashboardLayout>
        
    );
}