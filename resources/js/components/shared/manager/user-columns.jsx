import ActionColumn from "../tabel/action-column";

export const getUsersColumns = ({ onShowDetail }) => [
    { accessorKey: "no", header: "No." },
    { accessorKey: "name", header: "Nama" },
    { accessorKey: "role", header: "Role" },
    { accessorKey: "email", header: "Email" },
    {
        accessorKey: "aksi",
        header: "Aksi",
        cell: ({ row }) => <ActionColumn onDetail={onShowDetail} row={row} />,
    },
];
