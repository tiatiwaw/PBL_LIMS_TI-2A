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
    Database,
    ShoppingCart,
    Mail,
    History,
    Factory,
    Building2,
    Ruler,
    FileText,
    ClipboardList,
    TestTubes,
    TestTube,
    TestTube2,
    Pipette,
    ListCheck,
    ChartArea,
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
            name: "Sampling",
            icon: TestTubes,
            subItems: [
                {
                    name: "Sampel",
                    icon: TestTube,
                    href: "/admin/sampling/sample",
                },
                {
                    name: "Kategori Sampel",
                    icon: TestTube2,
                    href: "/admin/sampling/category",
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
                    href: "/admin/test/parameter",
                },
                {
                    name: "Metode Uji",
                    icon: Microscope,
                    href: "/admin/test/test-method",
                },
                {
                    name: "Nilai Satuan",
                    icon: Ruler,
                    href: "/admin/test/unit-value",
                },
                {
                    name: "Standard Referensi",
                    icon: FileText,
                    href: "/admin/test/standard-reference",
                },
            ],
        },
        {
            name: "Aktivitas Log",
            icon: TrendingUp,
            href: "/admin/log-activity",
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
    staff: [
        {
            name: "Manajemen Klien",
            icon: ListCheck,
            href: "/staff/manage-clients",
        },
        {
            name: "Sample",
            icon: Pipette,
            href: "/staff/samples",
        },
        {
            name: "Orders",
            icon: ChartArea,
            href: "/staff/orders",
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
