import {
    Home,
    Wrench,
    TrendingUp,
    Users,
    Database,
    FileCheck2,
    ShoppingCart,
} from "lucide-react";

export const menuItems = [
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
    // Menu untuk manager
    // {
    //     name: "Beranda",
    //     icon: Home,
    //     href: "/manager",
    //     active: true,
    //     role: "manager",
    // },
    // {
    //     name: "Validasi Laporan",
    //     icon: FileCheck2,
    //     href: "/report-validation",
    //     active: false,
    //     role: "manager",
    // },
    // {
    //     name: "Orders",
    //     icon: ShoppingCart,
    //     href: "/orders",
    //     active: false,
    //     role: "manager",
    // },
    // {
    //     name: "Users",
    //     icon: Users,
    //     href: "/users",
    //     active: false,
    //     role: "manager",
    // },
];
