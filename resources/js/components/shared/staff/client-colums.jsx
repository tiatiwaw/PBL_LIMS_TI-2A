import ActionColumn from "../tabel/action-column";

export const getClientColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone_number", header: "Nomor Telepon" },
    {
        accessorKey: "aksi",
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
