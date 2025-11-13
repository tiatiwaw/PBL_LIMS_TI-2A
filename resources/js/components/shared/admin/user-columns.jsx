import ActionColumn from "../tabel/action-column";

export const getUsersColumns = ({ onShowDetail }) => [
    { accessorKey: 'no', header: 'No.', enableSorting: false },
    { accessorKey: 'name', header: 'Nama', enableSorting: true },
    { accessorKey: 'role', header: 'Role', enableSorting: true },
    { accessorKey: 'email', header: 'Email', enableSorting: true },
    {
        id: "aksi",
        header: "Aksi",
        enableSorting: false,
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onDetail={onShowDetail} onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];