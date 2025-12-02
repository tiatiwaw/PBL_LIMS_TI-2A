export const buildCategorySection = (categories) => {
    const columns = [
        "No",
        "Nama Kategori",
    ];

    const rows = categories.map((category, index) => [
        index + 1,
        category.name
    ]);

    return { columns, rows };
};