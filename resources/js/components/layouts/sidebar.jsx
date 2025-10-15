import { Link } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavItem } from '../shared/dashboard/nav-item';

export const Sidebar = ({ menuItems, onLogout }) => (
    <aside className="w-60 bg-primary-hijauTua text-white flex flex-col shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-white/10 bg-white/5">
            <h1 className="text-2xl font-bold tracking-tight text-white">
                Dashboard
            </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
                <Link key={item.name} href={item.href} className="block group">
                    <NavItem item={item} isActive={item.active} />
                </Link>
            ))}
        </nav>

        <div className="p-4 border-t border-white/10">
            <Button
                onClick={onLogout}
                variant="ghost"
                className="
                    w-full justify-center gap-3 h-12 
                    text-white font-medium text-lg
                    bg-red-500/80 
                    hover:from-red-500 hover:to-red-600
                    transition-all duration-300
                    shadow-lg hover:shadow-xl
                    rounded-xl
                "
            >
                <LogOut size={20} />
                <span>Keluar</span>
            </Button>
        </div>
    </aside>
);