import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export const getSamplesColumns = ({ onShowDetail }) => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Nama Sampel" },
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
    { accessorKey: "sample_category", header: "Kategori Sampel" },
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
        accessorKey: "aksi",
        header: "Aksi",
        cell: ({ row }) => (
            <Button
                variant="outline"
                size="sm"
                onClick={() => onShowDetail(row)}
            >
                Detail
            </Button>
        ),
    },
];
