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
    Package,
    Boxes,
} from "lucide-react";

const isActive = (currentUrl, href, subItems = []) => {
    if (currentUrl === href) return true;
    if (
        currentUrl.startsWith(href) &&
        href !== "/admin" &&
        href !== "/manager" &&
        href !== "/analyst" &&
        href !== "/staff" &&
        href !== "/supervisor"
    )
        return true;
    if (subItems.length > 0) {
        return subItems.some((sub) => currentUrl.startsWith(sub.href));
    }
    return false;
};

const getRoleFromUrl = (url) => {
    if (url.startsWith("/analyst")) return "analyst";
    if (url.startsWith("/admin")) return "admin";
    if (url.startsWith("/manager")) return "manager";
    return null;
};

const MENU_CONFIG = {
    analyst: [
        {
            name: "Kotak Masuk",
            icon: Inbox,
            href: "/analyst/inbox",
        },
        {
            name: "Riwayat",
            icon: History,
            href: "/analyst/history",
        },
    ],
    admin: [
        {
            name: "Beranda",
            icon: Home,
            href: "/admin",
        },
        {
            name: "Alat & Bahan",
            icon: Wrench,
            href: "/admin/alat-bahan",
            subItems: [
                {
                    name: "Kategori Alat",
                    icon: Package,
                    href: "/admin/alat-bahan/kategori",
                },
                {
                    name: "Stok Bahan",
                    icon: Boxes,
                    href: "/admin/alat-bahan/stok",
                },
            ],
        },
        {
            name: "Aktivitas Log",
            icon: TrendingUp,
            href: "/admin/aktivitas-log",
        },
        {
            name: "Pengguna",
            icon: Users,
            href: "/admin/pengguna",
        },
        {
            name: "Master Data",
            icon: Database,
            href: "/admin/master-data",
        },
    ],
    manager: [
        {
            name: "Beranda",
            icon: Home,
            href: "/manager",
        },
        {
            name: "Validasi Laporan",
            icon: FileCheck2,
            href: "/manager/report-valid",
        },
        {
            name: "Orders",
            icon: ShoppingCart,
            href: "/manager/orders",
        },
        {
            name: "Users",
            icon: Users,
            href: "/manager/users",
        },
    ],
};

export function menuItems(url) {
    const role = getRoleFromUrl(url);

    if (!role || !MENU_CONFIG[role]) {
        return [];
    }

    return MENU_CONFIG[role].map((item) => ({
        ...item,
        active: isActive(url, item.href, item.subItems),
        subItems: item.subItems?.map((sub) => ({
            ...sub,
            active: isActive(url, sub.href),
        })),
    }));
}

export { MENU_CONFIG, getRoleFromUrl, isActive };
