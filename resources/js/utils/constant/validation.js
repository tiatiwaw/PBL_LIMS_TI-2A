import { Check, X, FileText, RotateCcw } from "lucide-react";

// Color variants untuk button - menggunakan style object untuk avoid Tailwind purge issue
const COLOR_VARIANTS = {
    accept: {
        bg: "#22c55e", // green-500
        bgHover: "#16a34a", // green-600
    },
    reject: {
        bg: "#ef4444", // red-500
        bgHover: "#dc2626", // red-600
    },
    info: {
        bg: "#3b82f6", // blue-500
        bgHover: "#2563eb", // blue-600
    },
    warning: {
        bg: "#eab308", // yellow-500
        bgHover: "#ca8a04", // yellow-600
    },
};

export const VALIDATION_CONFIG = {
    received: {
        title: "Terima atau Tolak Order",
        description: "Review informasi order dan lakukan validasi",
        actions: [
            {
                id: "accept",
                label: "Terima Order",
                icon: Check,
                colorVariant: "accept",
                variant: "default",
                type: "accept",
            },
            {
                id: "reject",
                label: "Tolak Order",
                icon: X,
                colorVariant: "reject",
                variant: "destructive",
                type: "reject",
            },
        ],
    },
    disapproved: {
        title: "Order Ditolak",
        description: "Order telah ditolak oleh supervisor",
        actions: [],
    },
    pending_payment: {
        title: "Menunggu Pembayaran",
        description: "Order menunggu pembayaran dari client",
        actions: [
            {
                id: "payment_confirm",
                label: "Konfirmasi Pembayaran",
                icon: Check,
                colorVariant: "accept",
                variant: "default",
                type: "payment_confirm",
            },
        ],
    },
    paid: {
        title: "Isi Data Parameter",
        description:
            "Pembayaran sudah diterima, silahkan isi data parameter order",
        actions: [
            {
                id: "fill_parameters",
                label: "Isi Data Parameter",
                icon: FileText,
                colorVariant: "info",
                variant: "default",
                type: "fill_parameters",
            },
        ],
    },
    in_progress: {
        title: "Order Sedang Diproses",
        description: "Order sedang dalam proses pengujian oleh analis",
        actions: [],
    },
    received_test: {
        title: "Validasi Hasil Test",
        description:
            "Hasil pengujian sudah diterima, lakukan quality control atau uji ulang",
        actions: [
            {
                id: "validate_test",
                label: "Validasi Order & Buat Laporan",
                icon: Check,
                colorVariant: "accept",
                variant: "default",
                type: "validate_test",
            },
            {
                id: "repeat_test",
                label: "Lakukan Repeat Test",
                icon: RotateCcw,
                colorVariant: "warning",
                variant: "default",
                type: "repeat_test",
            },
        ],
    },
    revision_test: {
        title: "Perbaikan Test",
        description: "Quality control tidak sesuai, silahkan lakukan uji ulang",
        actions: [
            {
                id: "repeat_test",
                label: "Lakukan Repeat Test",
                icon: RotateCcw,
                colorVariant: "warning",
                variant: "default",
                type: "repeat_test",
            },
        ],
    },
    pending: {
        title: "Validasi Laporan Order",
        description:
            "Laporan telah dibuat dan menunggu persetujuan dari manager",
        actions: [
            {
                id: "pending",
                label: "Validasi Laporan",
                icon: Check,
                colorVariant: "accept",
                variant: "default",
                type: "pending",
            },
        ],
    },
    completed: {
        title: "Order Selesai",
        description: "Order telah selesai dan disetujui oleh manager",
        actions: [],
    },
};

export const getValidationConfig = (status) => {
    return VALIDATION_CONFIG[status] || null;
};

export const getColorClass = (colorVariant) => {
    return COLOR_VARIANTS[colorVariant] || COLOR_VARIANTS.accept;
};

export const VALIDATION_ACTION_TYPES = {
    ACCEPT: "accept",
    REJECT: "reject",
    PAYMENT_CONFIRM: "payment_confirm",
    FILL_PARAMETERS: "fill_parameters",
    VALIDATE_TEST: "validate_test",
    REPEAT_TEST: "repeat_test",
    PENDING: "pending",
};
