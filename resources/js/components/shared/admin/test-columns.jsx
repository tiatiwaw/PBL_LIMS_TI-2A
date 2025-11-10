import { Badge } from "@/components/ui/badge";
import ActionColumn from "../tabel/action-column";
import { getCategoryTypeVariant, getDetectionTypeVariant } from "@/utils/statusUtils";

export const getParametersColumns = ({ onShowDetail }) => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama Parameter' },
    { accessorKey: 'unit_value', header: 'Satuan' },
    { accessorKey: 'reference', header: 'Referensi' },
    {
        accessorKey: "category",
        header: "Kategori",
        cell: ({ row }) => {
            const value = row.category;
            return (
                <Badge
                    variant={getCategoryTypeVariant(value) || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    {
        accessorKey: "detection_limit",
        header: "Detection Limit",
        cell: ({ row }) => {
            const value = row.detection_limit;
            return (
                <Badge
                    variant={getDetectionTypeVariant(value) || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    { accessorKey: 'quality_standard', header: 'Standar Kualitas' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getMethodsColumns = ({onShowDetail}) => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'reference', header: 'Referensi' },
    { accessorKey: 'name', header: 'Nama Metode' },
    { accessorKey: 'applicable_parameter', header: 'Parameter Berlaku' },
    { accessorKey: 'duration', header: 'Durasi' },
    { accessorKey: 'validity_period', header: 'Masa Berlaku' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getUnitsColumns = ({onShowDetail}) => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'value', header: 'Satuan' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail}  onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getStandardsColumns = ({onShowDetail}) => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama Alat' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getSampleCategoriesColumns = ({onShowDetail}) => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama Kategori' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

