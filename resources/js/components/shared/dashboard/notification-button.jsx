import { useState } from "react";
import { motion } from "framer-motion";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationButton({
    notifications = {},
    isLoading = false,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const safeNotifications = notifications || {};
    const totalCount = Object.values(safeNotifications).flat().length;

    const hasNotifications = totalCount > 0;

    if (!isLoading && totalCount === 0) {
        return null;
    }

    function convertCategoryName(key) {
        return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="
                relative w-10 h-10 md:w-14 md:h-14
                bg-white/10 hover:bg-white/20 hover:text-gray-300
                text-white rounded-xl 
                transition-all duration-300
            "
                    >
                        <Bell className="!w-4 !h-4" />

                        {hasNotifications && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.2 }}
                                className="
                    absolute -top-1 -right-1 
                    w-5 h-5 bg-red-500 
                    rounded-full text-xs 
                    flex items-center justify-center 
                    font-bold shadow-lg
                    animate-pulse
                "
                            >
                                {totalCount}
                            </motion.span>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-80 max-h-96 overflow-y-auto bg-primary-hijauTerang border-primary-hijauMuda/30">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bell className="w-5 h-5 text-primary-hijauTua" />
                                <h3 className="font-semibold text-lg text-primary-hijauTua">
                                    Notifikasi
                                </h3>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary-hijauMuda/60 hover:text-primary-hijauMuda"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {isLoading ? (
                            <div className="text-center text-primary-hijauMuda/60 py-4">
                                <p>Memuat data...</p>
                            </div>
                        ) : hasNotifications ? (
                            Object.entries(safeNotifications).map(
                                ([category, items]) => (
                                    <div key={category} className="space-y-2">
                                        <h4 className="text-sm font-semibold text-primary-hijauTua">
                                            {convertCategoryName(category)} (
                                            {items.length})
                                        </h4>

                                        {items.map((notif, index) => (
                                            <div
                                                key={index}
                                                className="border border-primary-hijauMuda/30 rounded-lg p-3 bg-white/50"
                                            >
                                                <p className="font-medium text-primary-hijauTua">
                                                    {notif.title}
                                                </p>
                                                <p className="text-xs text-primary-hijauMuda/70 mt-1">
                                                    {notif.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )
                        ) : (
                            <div className="text-center text-primary-hijauMuda/60 py-6">
                                <p className="font-medium text-primary-hijauMuda">
                                    Tidak ada notifikasi
                                </p>
                            </div>
                        )}

                        {!isLoading && hasNotifications && (
                            <div className="pt-2 border-t border-primary-hijauMuda/20">
                                <p className="text-xs text-primary-hijauMuda/60 italic">
                                    Pastikan mengecek semua peringatan di atas.
                                </p>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </motion.div>
    );
}
