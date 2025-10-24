import {
    Home,
    Wrench,
    TrendingUp,
    Users,
    Database,
    FileCheck2,
    ShoppingCart,
    Inbox,
    History,
} from "lucide-react";

export function menuItems (url) {
    if (url.startsWith('/analyst')) {
        return [
            // Menu untuk analyst
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
                active: true,
                role: "admin",
            },
            {
                name: "Alat & Bahan",
                icon: Wrench,
                href: "/alat-bahan",
                active: false,
                role: "admin",
            },
            {
                name: "Aktivitas Log",
                icon: TrendingUp,
                href: "admin/aktivitas-log",
                active: false,
                role: "admin",
            },
            {
                name: "Pengguna",
                icon: Users,
                href: "pengguna",
                active: false,
                role: "admin",
            },
            {
                name: "Master Data",
                icon: Database,
                href: "admin/master-data",
                active: false,
                role: "admin",
            },
        ]
    } else if (url.startsWith('/manager')) {
        return [
            {
                name: "Beranda",
                icon: Home,
                href: "/manager",
                active: true,
                role: "manager",
            },
            {
                name: "Validasi Laporan",
                icon: Wrench,
                href: "/validasi-laporan",
                active: false,
                role: "manager",
            },
            {
                name: "Orders",
                icon: TrendingUp,
                href: "/orders",
                active: false,
                role: "manager",
            },
            {
                name: "Users",
                icon: Users,
                href: "/users",
                active: false,
                role: "manager",
            },

        ]
    }
}
