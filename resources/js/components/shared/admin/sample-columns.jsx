import { Badge } from "@/components/ui/badge";
import ActionColumn from "../tabel/action-column";

const formVariantMap = {
    solid: "warning",
    liquid: "info",
    gas: "success",
};

const conditionVariantMap = {
    good: "success",
    damaged: "warning",
    expired: "error",
};

const temperatureVariantMap = {
    temperature: "warning",
    time: "info",
};

export const getSamplesColumns = () => [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'sample_category', header: 'Kategori Sampel' },
    { accessorKey: 'name', header: 'Nama Sampel' },
    {
        accessorKey: "form",
        header: "Bentuk",
        cell: ({ row }) => {
            const value = row.form;
            return (
                <Badge
                    variant={formVariantMap[value] || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    { accessorKey: 'preservation_method', header: 'Metode Pengawetan' },
    { accessorKey: 'sample_volume', header: 'Volume Sampel' },
    {
        accessorKey: "condition",
        header: "Kondisi",
        cell: ({ row }) => {
            const value = row.condition;
            return (
                <Badge
                    variant={conditionVariantMap[value] || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    {
        accessorKey: "temperature",
        header: "Temperature",
        cell: ({ row }) => {
            const value = row.temperature;
            return (
                <Badge
                    variant={temperatureVariantMap[value] || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getSampleCategoriesColumns = () => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama Kategori' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];
