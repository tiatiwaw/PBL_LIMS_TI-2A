import { Head, usePage } from '@inertiajs/react';
import { useCallback } from 'react';
import { menuItems } from '@/utils/menu';
import { Sidebar } from './sidebar';
import { HeaderCard } from '../shared/dashboard/header-card';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardLayout({
    children,
    title,
    header = "Hello World!",
    notificationCount = 3,
}) {
    const { url, props } = usePage();
    const { logout } = useAuth();

    const user = props.auth?.user;   // ✅ AMBIL USER DARI INERTIA
    const handleLogout = useCallback(() => logout(), [logout]);

    const getMenuItems = menuItems(url);

    return (
        <div className="p-4 flex gap-4 h-screen bg-primary-hijauTerang">
            <Head title={title} />

            <Sidebar menuItems={getMenuItems} onLogout={handleLogout} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="mb-6">
                    <HeaderCard
                        title={header}
                        user={user}                // ✅ SEKARANG USER TERISI
                        notificationCount={notificationCount}
                        onLogout={handleLogout}
                    />
                </header>

                <main className="flex-1 overflow-auto">
                    <div className="max-w-[1600px] mx-auto px-1">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}