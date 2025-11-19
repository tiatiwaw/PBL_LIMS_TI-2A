import { Checkbox } from "@/components/ui/checkbox";

export const getTrainingAnalystColumns = ({ selectedItems, onSelect }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Pelatihan" },
    { accessorKey: "provider", header: "Penyedia" },
    { accessorKey: "date", header: "Tanggal Pelatihan" },
    { accessorKey: "result", header: "Hasil" },
    {
        accessorKey: "select",
        header: "Pilih",
        enableSorting: false,
        cell: ({ row }) => {
            const data = row;
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