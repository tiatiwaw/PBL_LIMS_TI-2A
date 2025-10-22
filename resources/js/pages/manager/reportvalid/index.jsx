import DashboardLayout from "../../../components/layouts/dashboard-layout";
import DataTable from "../../../components/shared/tabel/tabels";
import { Copy,ListFilter } from "lucide-react";

// Data dummy untuk halaman ini (sudah diperbanyak)
const laporanData = [
    {
        id: 1,
        sample: "Cuka Apel",
        client: "CV Minyak Alami",
        analis: "Sari Wulandari",
    },
    {
        id: 2,
        sample: "Minyak Zaitun",
        client: "CV Minyak Alami",
        analis: "Rina Kusuma",
    },
    {
        id: 3,
        sample: "Cuka Apel",
        client: "CV Minyak Alami",
        analis: "Dedi Santoso",
    },
    {
        id: 4,
        sample: "Sabun Herbal",
        client: "PT Herbal Sehat",
        analis: "Andi Pratam",
    },
    {
        id: 5,
        sample: "Cuka Apel",
        client: "CV Minyak Alami",
        analis: "Dedi Santoso",
    },
    {
        id: 6,
        sample: "Minuman Kolagen",
        client: "PT Herbal Sehat",
        analis: "Sari Wulandari",
    },
    {
        id: 7,
        sample: "Cuka Apel",
        client: "CV Minyak Alami",
        analis: "Dedi Santoso",
    },
    {
        id: 8,
        sample: "Masker Spirulina",
        client: "CV Probiotik Sehat",
        analis: "Sari Wulandari",
    },
    {
        id: 9,
        sample: "Cuka Apel",
        client: "CV Minyak Alami",
        analis: "Rina Kusuma",
    },
    {
        id: 10,
        sample: "Masker Spirulina",
        client: "CV Probiotik Sehat",
        analis: "Sari Wulandari",
    },
    {
        id: 11,
        sample: "Masker Wajah",
        client: "CV Probiotik Sehat",
        analis: "Sari Wulandari",
    },
    {
        id: 12,
        sample: "Spirulina Kapsul",
        client: "CV Probiotik Sehat",
        analis: "Sari Wulandari",
    },
    {
        id: 13,
        sample: "Teh Hijau",
        client: "PT Herbal Sehat",
        analis: "Andi Pratam",
    },
    {
        id: 14,
        sample: "Kopi Herbal",
        client: "PT Herbal Sehat",
        analis: "Andi Pratam",
    },
    {
        id: 15,
        sample: "Suplemen Vitamin",
        client: "CV Minyak Alami",
        analis: "Rina Kusuma",
    },
    {
        id: 16,
        sample: "Obat Batuk",
        client: "PT Herbal Sehat",
        analis: "Dedi Santoso",
    },
    {
        id: 17,
        sample: "Shampoo Lidah Buaya",
        client: "CV Minyak Alami",
        analis: "Sari Wulandari",
    },
    {
        id: 18,
        sample: "Sabun Mandi",
        client: "PT Herbal Sehat",
        analis: "Andi Pratam",
    },
    {
        id: 19,
        sample: "Pasta Gigi Herbal",
        client: "CV Probiotik Sehat",
        analis: "Rina Kusuma",
    },
    {
        id: 20,
        sample: "Minyak Angin",
        client: "CV Minyak Alami",
        analis: "Dedi Santoso",
    },
    {
        id: 21,
        sample: "Jamu Kunyit Asam",
        client: "PT Herbal Sehat",
        analis: "Sari Wulandari",
    },
];

export default function ValidasiLaporanPage() {
    const user = { name: "BIJI", role: "Manager" };

    // Mendefinisikan kolom dan cara merender selnya
    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "sample", header:( 
                <div className="flex items-center gap-2">
                    Sample
                    <ListFilter size={16} />
                </div>
        ) },
        { accessorKey: "client", header: (
            <div className="flex items-center gap-2">
                Client
                <ListFilter size={16} />
            </div>
        ) },
        { accessorKey: "analis", header: (
            <div className="flex items-center gap-2">
                Analis
                <ListFilter size={16} />
            </div>
        ) },
        {
            accessorKey: "report",
            header: "Report",
            cell: ({ row }) => (
                <button className="flex items-center gap-1.5 text-xs bg-primary-hijauMuda hover:bg-primary-hijauTua text-white px-3 py-1.5 rounded-md font-semibold">
                    File <Copy size={12} />
                </button>
            ),
        },
        {
            accessorKey: "aksi",
            header: "Aksi",
            cell: ({ row }) => (
                <button className="text-xs bg-primary-hijauMuda hover:bg-primary-hijauTua text-white px-4 py-1.5 rounded-md font-semibold">
                    Detail
                </button>
            ),
        },
    ];

    return (
        <DashboardLayout
            title="Validasi Laporan"
            user={user}
            header="Validasi Laporan"
        >
            <DataTable
                columns={columns}
                data={laporanData}
                showSearch={true}
                showFilter={false}
            />
        </DashboardLayout>
    );
}
