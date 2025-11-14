import { Checkbox } from "@/components/ui/checkbox";
import { Copy } from "lucide-react";

export const getTrainingAnalystColumns = ({ selectedTrainings, onSelectTraining }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Sertifikat" },
    { accessorKey: "provider", header: "Penyedia" },
    { accessorKey: "date", header: "Tanggal Pelatihan" },
    { accessorKey: "result", header: "Hasil" },
    {
        accessorKey: "select",
        header: "Pilih",
        cell: ({ row }) => {
            const data = row;
            const isSelected = selectedTrainings.some((s) => s.id === data.id);
            return (
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onSelectTraining(data)}
                />
            );
        },
    },
];

export const getCertificateAnalystColumns = ({ selectedCertificates, onSelectCertificate }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Pelatihan" },
    { accessorKey: "issued_date", header: "Tanggal Terbit" },
    { accessorKey: "expired_date", header: "Tanggal Kadaluarsa" },
    {
        accessorKey: "file_path",
        header: "File",
        enableSorting: true,
        cell: ({ row }) => (
            <button className="flex items-center gap-1.5 text-xs bg-primary-hijauMuda hover:bg-primary-hijauTua text-white px-3 py-1.5 rounded-md font-semibold">
                File <Copy size={12} />
            </button>
        ),
    },
    {
        accessorKey: "select",
        header: "Pilih",
        cell: ({ row }) => {
            const data = row;
            const isSelected = selectedCertificates.some((s) => s.id === data.id);
            return (
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onSelectCertificate(data)}
                />
            );
        },
    },
];