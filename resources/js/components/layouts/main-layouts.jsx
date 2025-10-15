import { Head, Link } from '@inertiajs/react';
import {
    Users,
    Database,
    LogOut,
    Bell,
    ChevronDown,
    FlaskConical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { menuItems } from '@/utils/menu';

export default function DashboardLayout({ children, title, user, header = "Hello World!" }) {
    return (
        <div className="p-4 flex gap-4 h-screen bg-[#F0FFFC]">
            <Head title={title} />
            <aside className="w-72 bg-[#024D60] text-white flex flex-col shadow-2xl rounded-xl">
                <div className="p-8 border-b border-white/10">
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                </div>

                <nav className="flex-1 px-4 py-6 flex flex-col gap-8 bg-[#024D60] backdrop-blur-md">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="group relative"
                        >
                            <Button
                                variant={item.active ? "secondary" : "ghost"}
                                className={`w-full justify-start gap-3 py-6 rounded-xl transition-all duration-300 ease-in-out ${item.active
                                    ? 'bg-white/20 text-white hover:bg-white/30 shadow-md'
                                    : 'text-white/80 hover:bg-white/10 hover:text-white hover:shadow-sm'
                                    } focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-900 md:text-lg lg:text-xl`}
                            >
                                <item.icon className="!w-6 !h-6 transition-transform duration-300 group-hover:scale-110" />
                                <span className="font-medium">{item.name}</span>
                                {item.active && (
                                    <span className="absolute left-0 top-0 h-full w-1 bg-white/50 rounded-r-md" />
                                )}
                            </Button>
                        </Link>
                    ))}
                </nav>

                <div className="p-4">
                    <Button
                        variant="ghost"
                        className="w-full justify-center gap-3 h-12 text-white/80 bg-red-500/70 hover:bg-red-500/80 hover:text-red-100 transition-all"
                    >
                        <LogOut size={40} />
                        <span className="font-medium text-xl">Keluar</span>
                    </Button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="text-white">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center w-full gap-4 px-8 py-6 bg-[#024D60] rounded-xl shadow-2xl">
                            <FlaskConical size={60} className="text-white/80" />
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">{header}</h2>
                                <Badge variant="secondary" className="mt-1 text-base bg-white/20 text-white hover:bg-white/30">
                                    Beranda
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-8 py-6 bg-[#024D60] rounded-xl shadow-2xl">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="relative w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all flex items-center justify-center"
                            >
                                <Bell className="scale-150" />
                                <span className="absolute -top-1.5 -right-1.5 size-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                                    3
                                </span>
                            </Button>
                        </div>

                        <div className="flex items-center gap-3 px-8 py-6 bg-[#024D60] rounded-xl shadow-2xl">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white rounded-xl px-4 h-16 transition-all"
                                    >
                                        <Avatar className="w-8 h-8 border-2 border-white/30">
                                            <AvatarImage src="/placeholder-avatar.jpg" />
                                            <AvatarFallback className="bg-white/20 text-white font-semibold">
                                                {user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-left">
                                            <p className="font-semibold text-sm leading-none">{user.name}</p>
                                            <p className="text-xs text-white/70 mt-1">{user.role}</p>
                                        </div>
                                        <ChevronDown size={16} className="opacity-70" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 mr-4 bg-[#024D60] text-white" align="end">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">Leo</p>
                                            <p className="text-xs leading-none text-gray-200">
                                                admin@example.com
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Database className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-400 focus:text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-8">
                    <div className="max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}