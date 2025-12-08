export const buildBrandsSection = (brands) => {
    const columns = [
        "No",
        "Nama Brand",
    ];

    const rows = brands.map((brand, index) => [
        index + 1,
        brand.name
    ]);

    return { columns, rows };
};

export const buildEquipmentsSection = (equipments) => {
    const columns = [
        "No",
        "Nama Alat",
        "Brand/Tipe",
        "Nomor Seri",
        "Tahun Pembelian",
        "Jadwal Kalibrasi",
        "Status",
        "Lokasi Penyimpanan",
    ];

    const rows = equipments.map((equipment, index) => [
        index + 1,
        equipment.name,
        equipment.brand_types ? `${equipment.brand_types.name}` : equipment.type,
        equipment.serial_number,
        equipment.purchase_year,
        equipment.calibration_schedule,
        equipment.status,
        equipment.location,
    ]);

    return { columns, rows };
};

export const buildGradesSection = (grades) => {
    const columns = [
        "No",
        "Grade"
    ];

    const rows = grades.map((grade, index) => [
        index + 1,
        grade.name
    ]);

    return { columns, rows };
};

export const buildReagentsSection = (reagents) => {
    const columns = [
        "No",
        "Nama Reagen",
        "Supplier",
        "Grade",
        "Formula",
        "Stok",
        "Batch Number",
        "Lokasi Penyimpanan"
    ];

    const rows = reagents.map((reagent, index) => [
        index + 1,
        reagent.name,
        reagent.suppliers.name,
        reagent.grades.name,
        reagent.formula,
        reagent.stock,
        reagent.batch_number,
        reagent.storage_location,
    ]);

    return { columns, rows };
};

export const buildSuppliersSection = (reagents) => {
    const columns = [
        "No",
        "Nama Supplier",
        "Nama PIC",
        "No Telepon",
        "Alamat"
    ];

    const rows = reagents.map((supplier, index) => [
        index + 1,
        supplier.name,
        supplier.contact_person,
        supplier.phone_number,
        supplier.address
    ]);

    return { columns, rows };
};


