import {
    FileText, CheckCircle, Ban, Banknote, PlayCircle,
    CheckSquare, AlertCircle, ClipboardCheck
} from 'lucide-react';

export const COLORS = {
    primary: {
        gelap: '#02364B',
        tua: '#024D60',
        muda: '#2CACAD'
    },
    chartPalette: [
        '#02364B', '#2CACAD', '#024D60',
        '#5D8aa8', '#88C0D0', '#B48EAD',
        '#A3BE8C', '#D08770', '#BF616A'
    ],
};

export const MONTHS = [
    'Januari', 'Februari', 'Maret', 'April',
    'Mei', 'Juni', 'Juli', 'Agustus',
    'September', 'Oktober', 'November', 'Desember'
];

export const STATUS_CONFIG = {
    received: {
        label: 'Diterima',
        color: '#94a3b8',
        icon: FileText
    },
    disapproved: {
        label: 'Ditolak',
        color: '#ef4444',
        icon: Ban
    },
    pending_payment: {
        label: 'Menunggu Bayar',
        color: '#f59e0b',
        icon: Banknote
    },
    paid: {
        label: 'Lunas',
        color: '#10b981',
        icon: CheckCircle
    },
    in_progress: {
        label: 'Dalam Pengerjaan',
        color: '#3b82f6',
        icon: PlayCircle
    },
    received_test: {
        label: 'Uji Selesai (QC)',
        color: '#6366f1',
        icon: CheckSquare
    },
    revision_test: {
        label: 'Revisi Pengujian',
        color: '#d946ef',
        icon: AlertCircle
    },
    pending: {
        label: 'Menunggu Persetujuan',
        color: '#f97316',
        icon: ClipboardCheck
    },
    completed: {
        label: 'Selesai',
        color: '#024D60',
        icon: CheckCircle
    }
};

export const TYPE_LABELS = {
    internal: 'Internal',
    regular: 'Reguler',
    external: 'Eksternal',
    urgent: 'Urgent'
};