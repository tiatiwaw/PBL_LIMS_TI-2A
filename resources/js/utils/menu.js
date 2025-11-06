import {
    Home,
    Wrench,
    FlaskConical,
    Beaker,
    Microscope,
    Gauge,
    Scale,
    FileCheck2,
    TrendingUp,
    Users,
    ShoppingCart,
    Mail,
    History,
    Factory,
    Building2,
    Ruler,
    FileText,
    ClipboardList,
    TestTube2,
    ChartArea,
    ListCheck,
    ChartArea,
    Inbox,
    ScrollText,
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
    if (url.startsWith("/staff")) return "staff";
    if (url.startsWith("/client")) return "client";
    return null;
};

const MENU_CONFIG = {
    analyst: [
        {
            name: "Beranda",
            icon: Home,
            href: "/analyst/dashboard",
        },
        {
            name: "Daftar Pesanan",
            icon: ScrollText,
            href: "/analyst/order",
        },
    ],

    admin: [
        {
            name: "Beranda",
            icon: Home,
            href: "/admin",
        },
        {
            name: "Alat",
            icon: Wrench,
            subItems: [
                {
                    name: "Peralatan",
                    icon: Microscope,
                    href: "/admin/tools/equipments",
                },
                {
                    name: "Jenis Brand",
                    icon: Factory,
                    href: "/admin/tools/brands",
                },
            ],
        },
        {
            name: "Bahan Baku",
            icon: FlaskConical,
            subItems: [
                {
                    name: "Reagen",
                    icon: Beaker,
                    href: "/admin/materials/reagents",
                },
                {
                    name: "Grade",
                    icon: Scale,
                    href: "/admin/materials/grades",
                },
                {
                    name: "Pemasok",
                    icon: Building2,
                    href: "/admin/materials/suppliers",
                },
            ],
        },
        {
            name: "Pengujian",
            icon: ClipboardList,
            subItems: [
                {
                    name: "Parameter",
                    icon: Gauge,
                    href: "/admin/tests/parameters",
                },
                {
                    name: "Metode Uji",
                    icon: Microscope,
                    href: "/admin/tests/methods",
                },
                {
                    name: "Nilai Satuan",
                    icon: Ruler,
                    href: "/admin/tests/units",
                },
                {
                    name: "Standard Referensi",
                    icon: FileText,
                    href: "/admin/tests/references",
                },
                {
                    name: "Kategori Sampel",
                    icon: TestTube2,
                    href: "/admin/tests/categories",
                },
            ],
        },
        {
            name: "Order",
            icon: ShoppingCart,
            href: "/admin/orders",
        },
        {
            name: "Aktivitas Log",
            icon: TrendingUp,
            href: "/admin/activities",
        },
        {
            name: "Pengguna",
            icon: Users,
            href: "/admin/users",
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
            href: "/manager/report-validation",
        },
        {
            name: "Order",
            icon: ShoppingCart,
            href: "/manager/orders",
        },
        {
            name: "Karyawan",
            icon: Users,
            href: "/manager/users",
        },
    ],

    staff: [
        {
            name: "Orders",
            icon: ChartArea,
            href: "/staff/orders",
        },
        {
            name: "Manajemen Klien",
            icon: ListCheck,
            href: "/staff/manage-clients",
        },
    ],

    client: [
        {
            name: "Beranda",
            icon: Home,
            href: "/client",
        },
        {
            name: "Riwayat",
            icon: ChartArea,
            href: "/client/history",
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
