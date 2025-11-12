import { Badge } from "@/components/ui/badge";
import ActionColumn from "../tabel/action-column";
import { getEquipmentStatusVariant, getOrderTypeVariant } from "@/utils/statusUtils";

export const getEquipmentsColumns = ({ onShowDetail }) => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama Alat' },
    { accessorKey: 'purchase_year', header: 'Tahun Pembelian' },
    {
        accessorKey: "calibration_schedule",
        header: "Jadwal Kalibrasi",
        cell: ({ row }) => {
            const value = row.calibration_schedule;
            return (
                <Badge
                    variant={getOrderTypeVariant(value) || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const value = row.status;
            return (
                <Badge
                    variant={getEquipmentStatusVariant(value) || "outline"}
                    className="capitalize"
                >
                    {value}
                </Badge>
            );
        },
    },
    { accessorKey: 'location', header: 'Lokasi' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getBrandsColumns = ({ onShowDetail }) => [
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


