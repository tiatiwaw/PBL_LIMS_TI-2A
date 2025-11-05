import ActionColumn from "../tabel/action-column";

export const getActivitiesColumns = () => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama' },
    { accessorKey: 'role', header: 'Role' },
    { accessorKey: 'email', header: 'Email' },
];