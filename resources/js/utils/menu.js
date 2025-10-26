import {
    Home,
    Wrench,
    TrendingUp,
    Users,
    Database,
    FileCheck2,
    ShoppingCart,
    Mail,
    History,
} from "lucide-react";

export function menuItems (url) {
    if (url.startsWith('/analyst')) {
        return [
            // Menu untuk analyst
            {
                name: "Kotak Masuk",
                icon: Mail,
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
                href: "/aktivitas-log",
                active: false,
                role: "admin",
            },
            {
                name: "Pengguna",
                icon: Users,
                href: "/pengguna",
                active: false,
                role: "admin",
            },
            {
                name: "Master Data",
                icon: Database,
                href: "/master-data",
                active: false,
                role: "admin",
            },
        ]
    } else if (url.startsWith('/client')) {
        return [
            {
                name: "Dashboard",
                icon: Home,
                active: url.startsWith('/client/dashboard'),
                href: "/client/dashboard",
                role: "client",
            },
        ]
    }
}
