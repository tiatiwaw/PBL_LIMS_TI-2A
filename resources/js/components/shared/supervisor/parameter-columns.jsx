import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    getEquipmentStatusVariant,
    getEquipmentStatusLabel,
} from "@/utils/statusUtils";
import { Checkbox } from "@/components/ui/checkbox";

export const getParameterColumns = ({ onSelectParameter }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Parameter" },
    { accessorKey: "category", header: "Kategori" },
    {
        accessorKey: "unit_value",
        header: "Satuan Unit",
        cell: ({ row }) => row.unit_values.value,
    },
    {
        accessorKey: "reference",
        header: "Standar Mutu",
        cell: ({ row }) => row.reference_standards.name,
    },
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
    {
        accessorKey: "reference",
        header: "Standar Mutu",
        cell: ({ row }) => row.reference_standards.name,
    },
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

export const getReagenColumns = [
    { accessorKey: "no", header: "No.", size: 80 },
    { accessorKey: "name", header: "Nama Reagen", size: 150 },
    { accessorKey: "batch_number", header: "Batch Number", size: 120 },
    {
        accessorKey: "stock",
        header: "Stok",
        size: 120,
    },
    {
        accessorKey: "storage_location",
        header: "Lokasi Penyimpanan",
        size: 150,
    },
];

export const getEquipmentColumns = [
    { accessorKey: "no", header: "No.", size: 80 },
    {
        accessorKey: "name",
        header: "Nama Peralatan",
        size: 150,
    },
    {
        accessorKey: "brand_type",
        header: "Brand",
        size: 120,
        cell: ({ row }) => row.brand_types.name,
    },
    {
        accessorKey: "serial_number",
        header: "Serial Number",
        size: 130,
    },
    {
        accessorKey: "status",
        header: "Status",
        size: 100,
        cell: ({ row }) => {
            const status = row.status;
            return (
                <Badge
                    variant={getEquipmentStatusVariant(status)}
                    className="capitalize"
                >
                    {getEquipmentStatusLabel(status)}
                </Badge>
            );
        },
    },
];

export const getAnalystColumns = [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Analis" },
    { accessorKey: "specialist", header: "Spesialis" },
];

// Column definitions untuk ManagedDataTable
export const getReagentSelectorColumns = ({ selectedItems, onSelect }) => [
    {
        accessorKey: "no",
        header: "No.",
        size: 80,
    },
    {
        accessorKey: "name",
        header: "Nama Reagen",
        size: 150,
    },
    {
        accessorKey: "batch_number",
        header: "Batch Number",
        size: 120,
    },
    {
        accessorKey: "stock",
        header: "Stok",
        size: 120,
    },
    {
        accessorKey: "select",
        header: "Pilih",
        size: 100,
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

export const getEquipmentSelectorColumns = ({ selectedItems, onSelect, usedEquipmentIds = [] }) => [
    {
        accessorKey: "no",
        header: "No.",
        size: 80,
    },
    {
        accessorKey: "name",
        header: "Nama Peralatan",
        size: 150,
    },
    {
        accessorKey: "brand_type",
        header: "Brand",
        size: 120,
        cell: ({ row }) => row.brand_types.name,
    },
    {
        accessorKey: "serial_number",
        header: "Serial Number",
        size: 130,
    },
    {
        accessorKey: "status",
        header: "Status",
        size: 100,
        cell: ({ row }) => {
            const status = row.status;
            return (
                <Badge
                    variant={getEquipmentStatusVariant(status)}
                    className="capitalize"
                >
                    {getEquipmentStatusLabel(status)}
                </Badge>
            );
        },
    },
    {
        accessorKey: "select",
        header: "Pilih",
        size: 100,
        cell: ({ row }) => {
            const data = row;
            const isSelected = selectedItems?.some((s) => s.id === data.id);
            const isUsed = usedEquipmentIds?.includes(data.id);
            return (
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={isSelected}
                        disabled={isUsed && !isSelected}
                        onCheckedChange={() => onSelect(data)}
                    />
                    {isUsed && !isSelected && (
                        <span className="text-xs text-gray-500">
                            Sudah digunakan
                        </span>
                    )}
                </div>
            );
        },
    },
];

export const getParameterAnalystColumns = ({ selectedItems, onSelect }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama Analis" },
    { accessorKey: "specialist", header: "Spesialis" },
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
