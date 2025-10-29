import ActionColumn from "../tabel/action-column";

export const getReagentsColumns = () => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama' },
    { accessorKey: 'supplier', header: 'Supplier' },
    { accessorKey: 'grade', header: 'Tingkatan' },
    { accessorKey: 'formula', header: 'Formula' },
    { accessorKey: 'batch_number', header: 'Nomor Batch' },
    { accessorKey: 'storage_location', header: 'Lokasi' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getGradesColumns = () => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];

export const getSuppliersColumns = () => [
    { accessorKey: 'no', header: 'No.' },
    { accessorKey: 'name', header: 'Nama' },
    { accessorKey: 'phone_number', header: 'Telepon' },
    { accessorKey: 'address', header: 'Alamat' },
    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row, onEdit, onDelete }) => (
            <ActionColumn onEdit={onEdit} onDelete={onDelete} row={row} />
        ),
    },
];