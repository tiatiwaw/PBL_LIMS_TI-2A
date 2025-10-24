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

const alatData = [
     {
      no: 1,
      id: "LIMS-001",
      nama_alat: "Spektrofotometer UV",
      jenis: "Analitik",
      jumlah: "2 Unit",
      kondisi: "Baik",
      letak_penyimpanan: "Meja Analisis",
    },
    {
      no: 2,
      id: "LIMS-002",
      nama_alat: "High Performance Liquid Chromatography",
      jenis: "Analitik",
      jumlah: "1 Unit",
      kondisi: "Baik",
      letak_penyimpanan: "Ruang Analisis",
    },
    {
      no: 3,
      id: "LIMS-003",
      nama_alat: "Fourier Transform Infrared Spectrometer",
      jenis: "Analitik",
      jumlah: "1 Unit",
      kondisi: "Baik",
      letak_penyimpanan: "Meja Analisis",
    },
    {
      no: 4,
      id: "LIMS-004",
      nama_alat: "Atomic Absorption Spectrophotometer",
      jenis: "Analitik",
      jumlah: "1 Unit",
      kondisi: "Baik",
      letak_penyimpanan: "Ruang Kimia",
    },
];

export default function alatPage() {
    const user = { name: 'Ben', role: 'Admin' };

    const columns = [
        { accessorKey: 'no', header: 'No.' },
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'nama_alat', header: 'Nama Alat' },
        { accessorKey: 'jenis', header: 'Jenis' },
        { accessorKey: 'jumlah', header: 'Jumlah' },
        { accessorKey: 'kondisi', header: 'Kondisi' },
        { accessorKey: 'letak_penyimpanan', header: 'Letak Penyimpanan' },
    ];

    return (
        <DashboardLayout title="Alat & Bahan" user={user} header='Alat & Bahan'>
        <p className="text-3xl font-semibold text-primary-hijauTua">Peralatan :</p>
            <DataTable
                columns={columns}
                data={alatData}
                showSearch={false}
                showFilter={false}
            />
            
        </DashboardLayout>
        
    );
}