import { FlaskConical, Slash, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NotificationButton } from "./notification-button";
import { UserMenu } from "./user-menu";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePage } from "@inertiajs/react";

export const HeaderCard = ({
    title,
    user,
    notificationCount = 3,
    onLogout,
    onMenuClick,
}) => {
    const { url: currentUrl } = usePage();
    const segments = currentUrl.split("/").filter(Boolean);

    const formatLabel = (segment) => {
        return segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="
                flex items-center gap-2 md:gap-4 px-3 md:px-6 py-3 md:py-4
                bg-primary-hijauTua
                rounded-2xl shadow-xl 
                border border-white/5
                w-full justify-between
            "
        >
            <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="
                        md:hidden w-10 h-10
                        bg-white/10 hover:bg-white/20 
                        text-white rounded-lg
                        transition-all duration-300
                    "
                >
                    <Menu size={20} />
                </Button>

                <FlaskConical
                    size={32}
                    className="text-white/90 hidden md:block md:w-12 md:h-12"
                />

                <div className="flex-1 min-w-0">
                    <h2 className="text-lg md:text-2xl font-bold tracking-tight text-white truncate">
                        {title}
                    </h2>

                    <Badge
                        variant="secondary"
                        className="mt-1 md:mt-2 text-xs bg-white/15 text-white/90 hover:bg-white/25 border-white/10 px-2 py-1 hidden sm:inline-flex"
                    >
                        <Breadcrumb>
                            <BreadcrumbList className="flex items-center gap-1">
                                {segments.length === 0 && (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="text-white text-xs">
                                            Dashboard
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>
                                )}

                                {segments.map((segment, index) => {
                                    const isLast =
                                        index === segments.length - 1;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1"
                                        >
                                            <BreadcrumbItem>
                                                {isLast ? (
                                                    <BreadcrumbPage className="text-white/90 text-xs">
                                                        {formatLabel(segment)}
                                                    </BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink className="text-white hover:!text-white/80 transition-colors text-xs">
                                                        {formatLabel(segment)}
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                            {!isLast && (
                                                <BreadcrumbSeparator>
                                                    <Slash className="h-3 w-3 text-white/50" />
                                                </BreadcrumbSeparator>
                                            )}
                                        </div>
                                    );
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </Badge>
                </div>
            </div>

            <div className="flex gap-2 md:gap-4 items-center">
                <NotificationButton count={notificationCount} />
                <UserMenu user={user} onLogout={onLogout} />
            </div>
        </motion.div>
    );
};
