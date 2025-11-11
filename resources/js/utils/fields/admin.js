export const editEquipmentFields = (data) =>{
    return [
        {
            name: "name",
            label: "Nama Alat",
            placeholder: "Masukkan nama alat",
        },
        {
            name: "brand_type",
            label: "Brand / Tipe",
            type: "select",
            placeholder: "Masukkan brand / tipe alat",
            options: data.map((item) => ({ value: item.id, label: item.name })),
        },
        {
            name: "serial_number",
            label: "Nomor Seri",
            placeholder: "Masukkan nomor seri alat",
        },
        {
            name: "purchase_year",
            label: "Tahun Pembelian",
            placeholder: "Masukkan tahun pembelian alat",
        },
        {
            name: "calibration_schedule",
            label: "Jadwal Kalibrasi",
            type: "select",
            placeholder: "Masukkan jadwal kalibrasi alat",
            options: [
                {value: "internal", label: "Internal"},
                {value: "eksternal",label: "Eksternal"}
            ]
        },
        {
            name: "status",
            label: "Status",
            type: "select",
            placeholder: "Pilih status alat",
            options: [
                { value: "active", label: "Aktif" },
                { value: "maintenance", label: "Perbaikan" },
                { value: "broken", label: "Rusak" },
            ],
        },
        {
            name: "location",
            label: "Lokasi",
            placeholder: "Masukkan lokasi alat",
        },
    ];
}

export const editBrandFields = [
    {
        name: "name",
        label: "Nama Brand",
        placeholder: "Masukkan nama brand",
    },
];

export const editReagentFields = (dataSupplier, dataGrade) =>{
    return [
        {
        name: "name",
        label: "Nama Reagen",
        placeholder: "Masukkan nama reagen",
    },
    {
        name: "supplier",
        label: "Pemasok",
        placeholder: "Masukkan pemasok reagen",
        type: "select",
        options: dataSupplier?dataSupplier.map((item) => ({ value: item.id, label: item.name })):[],

    },
    {
        name: "grade",
        label: "Tingkatan",
        placeholder: "Masukkan tingkatan reagen",
        type: "select",
        options: dataGrade?dataGrade.map((item) => ({ value: item.id, label: item.name })):[],

    },
    {
        name: "formula",
        label: "Formula",
        placeholder: "Masukkan formula reagen",
    },
    {
        name: "batch_number",
        label: "Nomor Batch",
        placeholder: "Masukkan nomor batch reagen",
    },
    {
        name: "storage_location",
        label: "Lokasi Penyimpanan",
        placeholder: "Masukkan lokasi penyimpanan reagen",
    },
    ]
    
};

export const editGradeFields = [
    {
        name: "name",
        label: "Nama Grade",
        placeholder: "Masukkan nama grade",
    },
];

export const editSupplierFields = [
    {
        name: "name",
        label: "Nama Pemasok",
        placeholder: "Masukkan nama pemasok",
    },
    {
        name: "phone_number",
        label: "Nomor Telepon",
        placeholder: "Masukkan nomor telepon pemasok",
    },
    {
        name: "address",
        label: "Alamat",
        placeholder: "Masukkan alamat pemasok",
    },
];

export const editSampleFields = [
    {
        name: "name",
        label: "Nama Sampel",
        placeholder: "Masukkan nama sampel",
    },
    {
        name: "sample_category",
        label: "Kategori Sampel",
        placeholder: "Masukkan kategori sampel",
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
        name: "sample_volume",
        label: "Volume Sampel",
        placeholder: "Masukkan volume sampel",
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
        ]
    },
    {
        name: "temperature",
        label: "Suhu",
        placeholder: "Masukkan suhu sampel",
        type: "select",
        options: [
            { value: "temperature", label: "Suhu" },
            { value: "time", label: "Waktu" },
        ]
    },
];

export const editCategorySampleFields = [
    {
        name: "name",
        label: "Nama Kategori Sampel",
        placeholder: "Masukkan nama kategori sampel",
    },
];

export const editParameterFields = [
    {
        name: "name",
        label: "Nama Parameter",
        placeholder: "Masukkan nama parameter",
    },
    {
        name: "unit_value",
        label: "Nilai Satuan",
        placeholder: "Masukkan satuan parameter",
    },
    {
        name: "reference",
        label: "Standar Referensi",
        placeholder: "Masukkan standar parameter",
    },
    {
        name: "category",
        label: "Kategori",
        placeholder: "Masukkan kategori parameter",
        type: "select",
        options: [
            { value: "fisika", label: "Fisika" },
            { value: "mikrobiologi", label: "Mikrobiologi" },
            { value: "kimia", label: "Kimia" },
            { value: "klinik", label: "Klinik" },
        ],
    },
    {
        name: "detection_limit",
        label: "Detection Limit",
        placeholder: "Masukkan detection limit parameter",
        type: "select",
        options: [
            { value: "LOD", label: "LOD" },
            { value: "LOQ", label: "LOQ" },
        ],
    },
    {
        name: "quality_standard",
        label: "Standar Kualitas",
        placeholder: "Masukkan standar kualitas parameter",
    },
];

export const editMethodFields = [
    {
        name: "name",
        label: "Nama Metode",
        placeholder: "Masukkan nama metode",
    },
    {
        name: "reference",
        label: "Referensi",
        placeholder: "Masukkan referensi metode",
    },
    {
        name: "applicable_parameter",
        label: "Parameter Berlaku",
        placeholder: "Masukkan parameter berlaku metode",
    },
    {
        name: "duration",
        label: "Durasi",
        placeholder: "Masukkan durasi metode",
    },
    {
        name: "validity_period",
        label: "Masa Berlaku",
        placeholder: "Masukkan masa berlaku metode",
    },
];

export const editUnitFields = [
    {
        name: "value",
        label: "Nilai Satuan",
        placeholder: "Masukkan nilai satuan",
    },
];

export const editStandardFields = [
    {
        name: "name",
        label: "Nama Standar",
        placeholder: "Masukkan nama standar",
    },
];

export const editUsersFields = [
    {
        name: "name",
        label: "Nama Pengguna",
        placeholder: "Masukkan nama pengguna",
    },
    {
        name: "email",
        label: "Email Pengguna",
        placeholder: "Masukkan email pengguna",
    },
    {
        name: "role",
        label: "Role Pengguna",
        placeholder: "Masukkan role pengguna",
    },
];
