import {
    Home,
    Wrench,
    TrendingUp,
    Users,
    Database,
    ChartArea,
    ShoppingCart,
    Inbox,
    History,
    ListCheck,
    Pipette
} from "lucide-react";

export function menuItems(url) {
    if (url.startsWith('/analyst')) {
        return [
            {
                name: "Kotak Masuk",
                icon: Inbox,
                href: "/analyst/inbox",
                active: url.startsWith('/analyst/inbox'),
                role: "analyst",
            },
            {
                name: "Riwayat",
                icon: History,
                href: "/analyst/history",
                active: url.startsWith('/analyst/history'),
                role: "analyst",
            },
        ];
    } else if (url.startsWith('/admin')) {
        return [
            {
                name: "Beranda",
                icon: Home,
                href: "/admin",
                active: url.startsWith('/admin'),
                role: "admin",
            },
            {
                name: "Alat & Bahan",
                icon: Wrench,
                href: "/alat-bahan",
                active: url.startsWith('/alat-bahan'),
                role: "admin",
            },
            {
                name: "Aktivitas Log",
                icon: TrendingUp,
                href: "/aktivitas-log",
                active: url.startsWith('/aktivitas-log'),
                role: "admin",
            },
            {
                name: "Pengguna",
                icon: Users,
                href: "/pengguna",
                active: url.startsWith('/pengguna'),
                role: "admin",
            },
            {
                name: "Master Data",
                icon: Database,
                href: "/master-data",
                active: url.startsWith('/master-data'),
                role: "admin",
            },
        ];
    } else if (url.startsWith('/staff')) {
        return [
            {
                name: "Sample",
                icon: Pipette,
                href: "/staff/samples",
                active: url.startsWith('/staff/samples'),
                role: "staff",
            },
            {
                name: "Manajemen Klien",
                icon: ListCheck,
                href: "/staff",
                active: url === '/staff',
                role: "staff",
            },
            {
                name: "Orders",
                icon: ChartArea,
                href: "/staff/orders",
                active: url.startsWith('/staff/orders'),
                role: "staff",
            },
        ];
    }
}
