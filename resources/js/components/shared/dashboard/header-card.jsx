import { FlaskConical, Menu, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./user-menu";
import NotificationButton from "./notification-button";
import { useState, useEffect } from "react";

export const HeaderCard = ({
    title,
    user,
    onLogout,
    onMenuClick,
    notifications = [],
    isLoading = false,
}) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return "Selamat Pagi";
        if (hour < 15) return "Selamat Siang";
        if (hour < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="
                overflow-hidden
                flex items-center gap-3 md:gap-6 px-4 md:px-8 py-4 md:py-5
                bg-gradient-to-br from-primary-hijauTua via-primary-hijauTua to-primary-hijauTua/90
                rounded-3xl shadow-2xl 
                border border-white/10
                w-full justify-between
                backdrop-blur-sm
            "
        >
            <div className="flex items-center gap-3 md:gap-6 flex-1 min-w-0">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onMenuClick}
                        className="
                            md:hidden w-11 h-11
                            bg-white/10 hover:bg-white/20 
                            text-white rounded-xl
                            transition-all duration-300
                            backdrop-blur-sm
                            border border-white/10
                        "
                    >
                        <Menu size={20} />
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                    }}
                    className="hidden md:block"
                >
                    <div
                        className="
                        w-14 h-14 rounded-2xl 
                        bg-white/10 backdrop-blur-md
                        border border-white/20
                        flex items-center justify-center
                        shadow-lg
                    "
                    >
                        <FlaskConical size={28} className="text-white" />
                    </div>
                </motion.div>

                <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h2 className="text-xl md:text-3xl font-bold tracking-tight text-white truncate drop-shadow-lg">
                            {title}
                        </h2>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                        >
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs font-medium text-white/90">
                                Active
                            </span>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap text-xs md:text-sm">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-2 text-white/80 font-medium"
                        >
                            <span className="hidden sm:inline">
                                {getGreeting()},
                            </span>
                            <span className="text-white">
                                {user?.name || "User"}
                            </span>
                        </motion.div>

                        <div className="hidden md:block w-px h-4 bg-white/20" />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="hidden md:flex items-center gap-2 text-white/70"
                        >
                            <Clock size={14} className="text-white/50" />
                            <span className="font-mono">
                                {formatTime(currentTime)}
                            </span>
                        </motion.div>

                        <div className="hidden lg:block w-px h-4 bg-white/20" />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="hidden lg:flex items-center gap-2 text-white/70"
                        >
                            <Calendar size={14} className="text-white/50" />
                            <span>{formatDate(currentTime)}</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 md:gap-3 items-center">
                {notifications.length > 0 && (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <NotificationButton
                            isLoading={isLoading}
                            notifications={notifications ?? []}
                        />
                    </motion.div>
                )}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <UserMenu user={user} onLogout={onLogout} />
                </motion.div>
            </div>
        </motion.div>
    );
};
