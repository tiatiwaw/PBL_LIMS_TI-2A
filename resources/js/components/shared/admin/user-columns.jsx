import ActionColumn from "../tabel/action-column";

export const getUsersColumns = () => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'email', header: 'Email' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];