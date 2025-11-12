import ActionColumn from "../tabel/action-column";

export const getReagentsColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "formula", header: "Formula" },
    { accessorKey: "storage_location", header: "Lokasi" },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn
                onDetail={onShowDetail}
                onEdit={onEdit}
                onDelete={onDelete}
                row={row}
            />
        ),
    },
];

export const getGradesColumns = ({ onShowDetail}) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama" },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn 
                onDetail= {onShowDetail} 
                onEdit={onEdit} 
                onDelete={onDelete} 
                row={row} />
        ),
    },
];

export const getSuppliersColumns = ({ onShowDetail}) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "phone_number", header: "Telepon" },
    { accessorKey: "address", header: "Alamat" },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail= {onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];
