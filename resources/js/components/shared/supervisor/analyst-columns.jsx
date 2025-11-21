import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const getAnalystColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Analis" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "specialist", header: "Spesialis" },
    {
        accessorKey: "select",
        header: "Aksi",
        cell: ({ row }) => {
            const data = row; // pastikan ambil data lengkap
            // const isSelected = selectedMethods.some((s) => s.id === data.id);
            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onShowDetail(data)}
                >
                    Detail
                </Button>
            );
        },
    },
];

export const getParameterAnalystColumns = ({ selectedItems, onSelect }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Analis" },
    { accessorKey: "spesialist", header: "Spesialis" },
    {
        accessorKey: "select",
        header: "Pilih",
        cell: ({ row }) => {
            const data = row; // pastikan ambil data lengkap
            const isSelected = selectedItems?.some((s) => s.id === data.id);
            return (
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onSelect(data)}
                />
            );
        },
    },
];
