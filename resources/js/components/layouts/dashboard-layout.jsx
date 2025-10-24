import { Head } from '@inertiajs/react';
import { menuItems } from '@/utils/menu';
import { Sidebar } from './sidebar';
import { HeaderCard } from '../shared/dashboard/header-card';
import { usePage } from '@inertiajs/react'

export default function DashboardLayout({
    children,
    title,
    user,
    header = "Hello World!",
    notificationCount = 3,
}) {
    const handleLogout = () => {
        console.log('Logging out...');
    };

    const { url } = usePage()
    const getMenuItems = menuItems(url);

    return (
        <div className="p-4 flex gap-4 h-screen bg-primary-hijauTerang">
            <Head title={title} />

            <Sidebar menuItems={getMenuItems} onLogout={handleLogout} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="mb-6">
                    <HeaderCard
                        title={header}
                        user={user}
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