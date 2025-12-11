const LABELS = {
    status: {
        in_progress: "Sedang Diproses",
        completed: "Selesai",
        pending: "Menunggu",
    },
    parameterStatus: {
        success: "Berhasil",
        failed: "Gagal",
    },
    equipmentStatus: {
        available: "Tersedia",
        unavailable: "Dipakai",
        maintenance: "Perbaikan",
        broken: "Rusak",
    },
    orderStatus: {
        completed: "Selesai",
        in_progress: "Sedang Diproses",
        pending: "Menunggu",
        disapproved: "Ditolak",
        approved: "Disetujui",
        received: "Diterima",
        pending_payment: "Menunggu Pembayaran",
        paid: "Sudah Dibayar",
        received_test: "Sampel Diterima",
        revision_test: "Revisi Pengujian",
    },
    conditionType: {
        good: "Baik",
        damaged: "Rusak",
        expired: "Kadaluarsa",
    },
};

const VARIANTS = {
    orderType: {
        external: "warning",
        internal: "success",
        regular: "info",
        urgent: "error",
    },
    orderStatus: {
        completed: "success",
        in_progress: "info",
        pending: "warning",
        disapproved: "error",
        approved: "approved",
        received: "received",
        pending_payment: "pending_payment",
        paid: "paid",
        received_test: "received_test",
        revision_test: "revision_test",
    },
    sampleStatus: {
        success: "success",
        failed: "error",
    },
    equipmentStatus: {
        available: "success",
        unavailable: "info",
        maintenance: "warning",
        broken: "error",
    },
    categoryType: {
        kimia: "success",
        mikrobiologi: "info",
        fisika: "warning",
        klinik: "error",
    },
    detectionType: {
        LOD: "info",
        LOQ: "success",
    },
    formType: {
        solid: "warning",
        liquid: "info",
        gas: "success",
    },
    conditionType: {
        good: "success",
        damaged: "warning",
        expired: "error",
    },
    temperatureType: {
        temperature: "warning",
        time: "info",
    },
};

export const filterStatusOrder = [
    { value: "all", label: "Semua Status" },
    { value: "received", label: "Diterima" },
    { value: "disapproved", label: "Ditolak" },
    { value: "pending_payment", label: "Menunggu Pembayaran" },
    { value: "paid", label: "Sudah Dibayar" },
    { value: "in_progress", label: "Sedang Diproses" },
    { value: "received_test", label: "Sampel Diterima" },
    { value: "revision_test", label: "Revisi Pengujian" },
    { value: "pending", label: "Menunggu" },
    { value: "completed", label: "Selesai" },
];

const getValue = (map, category, key, fallback = "default") => {
    return map?.[category]?.[key] || fallback;
};

export const getStatusLabel = (status) =>
    getValue(LABELS, "status", status, status);
export const getStatusParameterLabel = (status) =>
    getValue(LABELS, "parameterStatus", status, status);
export const getEquipmentStatusLabel = (status) =>
    getValue(LABELS, "equipmentStatus", status, status);
export const getOrderStatusLabel = (status) =>
    getValue(LABELS, "orderStatus", status, status);
export const getConditionTypeLabel = (type) =>
    getValue(LABELS, "conditionType", type, type);

export const getOrderTypeVariant = (type) =>
    getValue(VARIANTS, "orderType", type);
export const getOrderStatusVariant = (status) =>
    getValue(VARIANTS, "orderStatus", status);
export const getSampleStatusVariant = (status) =>
    getValue(VARIANTS, "sampleStatus", status);
export const getEquipmentStatusVariant = (status) =>
    getValue(VARIANTS, "equipmentStatus", status);
export const getCategoryTypeVariant = (type) =>
    getValue(VARIANTS, "categoryType", type);
export const getDetectionTypeVariant = (type) =>
    getValue(VARIANTS, "detectionType", type);
export const getFormTypeVariant = (type) =>
    getValue(VARIANTS, "formType", type);
export const getConditionTypeVariant = (type) =>
    getValue(VARIANTS, "conditionType", type);
export const getTemperatureTypeVariant = (type) =>
    getValue(VARIANTS, "temperatureType", type);
