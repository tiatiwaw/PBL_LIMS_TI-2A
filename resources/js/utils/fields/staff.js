export const editClientFields = [
    {
        name: "name",
        label: "Nama Perusahaan",
        placeholder: "Masukkan nama perusahaan",
    },
    {
        name: "contact_person",
        label: "Narahubung",
        placeholder: "Masukkan nama narahubung",
        initialValuePath: "users.name",
    },
    {
        name: "email",
        label: "Email Klien",
        placeholder: "Masukkan email",
    },
    {
        name: "password",
        label: "Password Klien",
        placeholder: "Masukkan password",
    },
    {
        name: "address",
        label: "Alamat Klien",
        placeholder: "Masukkan alamat",
    },
    {
        name: "phone_number",
        label: "Nomor Telepon Klien",
        placeholder: "Masukkan Nomor Telepon",
    },
    {
        name: "npwp_number",
        label: "NPWP Klien",
        placeholder: "Masukkan NPWP",
    },
];

export const editSampleFields = (categories = []) => {
    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));
    return [
        {
            name: "name",
            label: "Nama Sampel",
            placeholder: "Masukkan nama sampel",
        },
        {
            name: "sample_category_id",
            label: "Kategori Sampel",
            type: "select",
            placeholder: "Pilih kategori sampel",
            options: categoryOptions,
        },
        {
            name: "form",
            label: "Bentuk",
            placeholder: "Masukkan bentuk sampel",
            type: "select",
            options: [
                { value: "liquid", label: "Liquid" },
                { value: "solid", label: "Solid" },
                { value: "gas", label: "Gas" },
            ],
        },
        {
            name: "preservation_method",
            label: "Metode Pengawetan",
            placeholder: "Masukkan metode pengawetan sampel",
        },
        {
            name: "condition",
            label: "Kondisi",
            placeholder: "Masukkan kondisi sampel",
            type: "select",
            options: [
                { value: "good", label: "Baik" },
                { value: "damaged", label: "Rusak" },
                { value: "expired", label: "Kadaluarsa" },
            ],
        },
        {
            name: "storage_condition",
            label: "Kondisi Penyimpanan",
            placeholder: "Masukkan kondisi penyimpanan",
        },
    ];
};
