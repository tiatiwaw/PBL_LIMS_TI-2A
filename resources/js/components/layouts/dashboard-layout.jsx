import { Head, usePage } from "@inertiajs/react";
import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { menuItems } from "@/utils/menu";
import { Sidebar } from "./sidebar";
import { HeaderCard } from "../shared/dashboard/header-card";

import { useAuth } from "@/hooks/useAuth";
import { MobileSidebar } from "./mobile-sidebar";

export default function DashboardLayout({
    children,
    title,
    header = "Hello World!",
    notificationCount = 3,
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url } = usePage();
    const { user, logout } = useAuth();

    const currentUser = useMemo(
        () => user ?? { name: "Guest", role: "guest" },
        [user]
    );

    const sidebarMenu = useMemo(() => menuItems(url), [url]);

    const handleLogout = useCallback(() => logout(), [logout]);

    return (
        <div className="min-h-screen bg-primary-hijauTerang">
            <Head title={title} />
            <MobileSidebar
                menuItems={sidebarMenu}
                onLogout={handleLogout}
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex h-screen p-2 md:p-4 gap-2 md:gap-4">
                <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hidden md:block"
                >
                    <Sidebar menuItems={sidebarMenu} onLogout={handleLogout} />
                </motion.div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="mb-6">
                        <HeaderCard
                            title={header}
                            user={user}
                            notificationCount={notificationCount}
                            onLogout={handleLogout}
                        />
                    </header>

                    <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="flex-1 overflow-auto"
                    >
                        <div className="max-w-[1600px] mx-auto px-1 md:px-4">
                            {children}
                        </div>
                    </motion.main>
                </div>
            </div>
        </div>
    );
}
