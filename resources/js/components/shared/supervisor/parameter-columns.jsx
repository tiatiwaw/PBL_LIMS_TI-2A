import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    getConditionTypeLabel,
    getConditionTypeVariant,
} from "@/utils/statusUtils";

export const getParameterColumns = ({ onSelectParameter }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Parameter" },
    { accessorKey: "kategori", header: "Kategori" },
    { accessorKey: "unit_value", header: "Unit" },
    { accessorKey: "reference", header: "Standar Mutu" },
    {
        accessorKey: "select",
        header: "Aksi",
        cell: ({ row }) => {
            const data = row;
            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectParameter(data)}
                >
                    Pilih
                </Button>
            );
        },
    },
];

export const getMetodeColumns = ({ onSelectMetode }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Metode" },
    { accessorKey: "applicable_parameter", header: "Cakupan Parameter" },
    { accessorKey: "reference", header: "Standar Mutu" },
    {
        accessorKey: "select",
        header: "Aksi",
        cell: ({ row }) => {
            const data = row;
            return (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectMetode(data)}
                >
                    Pilih
                </Button>
            );
        },
    },
];

export const getReagenColumns = () => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nama", header: "Nama Reagen" },
    { accessorKey: "formula", header: "Formula" },
    { accessorKey: "supplier", header: "Supplier" },
    { accessorKey: "grade", header: "Grade" },
    { accessorKey: "storage_location", header: "Lokasi Penyimpanan" },
];

export const getEquipmentColumns = () => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "nama", header: "Nama Equipment" },
    { accessorKey: "brand_type", header: "Brand" },
    { accessorKey: "serial_number", header: "Nomor Serial" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.status;
            return (
                <Badge
                    variant={getConditionTypeVariant(status)}
                    className="capitalize"
                >
                    {getConditionTypeLabel(status)}
                </Badge>
            );
        },
    },
    { accessorKey: "location", header: "Lokasi Peralatan" },
];
