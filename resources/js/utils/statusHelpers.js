export const getStatusLabel = (status) => {
    const statuses = {
        in_progress: "Sedang Diproses",
        completed: "Selesai",
        pending: "Menunggu",
    };
    return statuses[status] || status;
};

export const getStatusParameterLabel = (status) => {
    const statuses = {
        success: "Berhasil",
        failed: "Gagal",
    };
    return statuses[status] || status;
};

export const getEquipmentStatusLabel = (status) => {
    const statuses = {
        active: "Aktif",
        maintenance: "Perbaikan",
        broken: "Rusak",
    };
    return statuses[status] || status;
};

export const getOrderStatusLabel = (status) => {
    const statuses = {
        completed: "Selesai",
        in_progress: "Sedang Diproses",
        pending: "Menunggu",
        disapproved: "Ditolak",
        approved: "Disetujui",
        received: "Diterima",
    };
    return statuses[status] || status;
};

export const getOrderTypeLabel = (type) => {
    const types = {
        eksternal: "Eksternal",
        internal: "Internal",
        urgent: "Urgent",
    };
    return types[type] || type;
};

export const getOrderTypeVariant = (type) => {
    const variants = {
        eksternal: "warning",
        internal: "info",
        urgent: "error",
    };
    return variants[type] || "default";
};

export const getOrderStatusVariant = (type) => {
    const variants = {
        completed: "success",
        in_progress: "info",
        pending: "warning",
        disapproved: "error",
        approved: "approved",
        received: "received",
    };
    return variants[type] || "default";
};

export const getSampleStatusVariant = (type) => {
    const variants = {
        failed: "error",
        success: "success",
    };
    return variants[type] || "default";
};

export const getEquipmentStatusVariant = (type) => {
    const variants = {
        active: "success",
        maintenance: "warning",
        broken: "error",
    };
    return variants[type] || "default";
};
