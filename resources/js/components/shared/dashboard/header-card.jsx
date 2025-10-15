import { FlaskConical, SlashIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NotificationButton } from './notification-button';
import { UserMenu } from './user-menu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from '@inertiajs/react';

export const HeaderCard = ({ title, user, notificationCount = 3, onLogout }) => (
    <div className="
        flex items-center gap-4 px-6 py-4
        bg-primary-hijauTua
        rounded-2xl shadow-xl backdrop-blur-sm
        border border-white/5
        w-full justify-between
    ">
        <div className="flex items-center gap-4">
            <FlaskConical size={48} className="text-white/90" />
            <div className="flex-1">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                    {title}
                </h2>
                <Badge
                    variant="secondary"
                    className="mt-2 text-xs bg-white/15 text-white/90 hover:bg-white/25 border-white/10 px-2 py-1"
                >
                    <Breadcrumb>
                        <BreadcrumbList className="flex items-center gap-1">
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/" className="text-white hover:!text-white/80 transition-colors text-xs">
                                        Wi
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <SlashIcon className="h-3 w-3 text-white/50" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/components" className="text-white hover:!text-white/80 transition-colors text-xs">
                                        Wok
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <SlashIcon className="h-3 w-3 text-white/50" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/components" className="text-white hover:!text-white/80 transition-colors text-xs">
                                        De
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <SlashIcon className="h-3 w-3 text-white/50" />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/components" className="text-white hover:!text-white/80 transition-colors text-xs">
                                        Tok
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </Badge>
            </div>
        </div>
        <div className='flex gap-4'>
            <NotificationButton count={notificationCount} />
            <UserMenu user={user} onLogout={onLogout} />
        </div>
    </div>
);