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
    reagents = [],
    isLoading = false,
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
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
                    {reagents.length > 0 && (
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
                            {reagents.length}
                        </motion.span>
                    )}
                </Button>
            </PopoverTrigger>

            {reagents.length > 0 && (
                <PopoverContent className="w-80 max-h-96 overflow-y-auto bg-primary-hijauTerang border-primary-hijauMuda/30">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Bell className="w-5 h-5 text-primary-hijauTua" />
                                <h3 className="font-semibold text-lg text-primary-hijauTua">
                                    Notifikasi Stok Reagen
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary-hijauMuda/60 hover:text-primary-hijauMuda"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="text-sm text-primary-hijauTua/80">
                            {reagents.length} reagen memiliki stok yang menipis
                            (kurang dari 5)
                        </p>

                        <div className="space-y-2">
                            {isLoading ? (
                                <div className="text-center text-primary-hijauMuda/60 py-4">
                                    <p>Memuat data...</p>
                                </div>
                            ) : (
                                reagents.map((reagent) => (
                                    <div
                                        key={reagent.id}
                                        className="border border-primary-hijauMuda/30 rounded-lg p-3 bg-white/50"
                                    >
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="flex-1">
                                                <p className="font-medium text-primary-hijauTua">
                                                    {reagent.name}
                                                </p>
                                                <p className="text-xs text-primary-hijauMuda/70 mt-1">
                                                    Batch:{" "}
                                                    {reagent.batch_number}
                                                </p>
                                                {reagent.suppliers && (
                                                    <p className="text-xs text-primary-hijauMuda/70">
                                                        Supplier:{" "}
                                                        {
                                                            reagent.suppliers
                                                                ?.name
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-red-600">
                                                    Stok: {reagent.stock}
                                                </p>
                                                {reagent.unit_values && (
                                                    <p className="text-xs text-primary-hijauMuda/70">
                                                        {
                                                            reagent.unit_values
                                                                ?.unit
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex-1 bg-primary-hijauMuda/20 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className={`h-full ${
                                                        reagent.stock < 2
                                                            ? "bg-red-600"
                                                            : "bg-primary-hijauMuda"
                                                    }`}
                                                    style={{
                                                        width: `${
                                                            (reagent.stock /
                                                                5) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </div>
                                            {reagent.storage_location && (
                                                <p className="text-xs text-primary-hijauMuda/70 whitespace-nowrap">
                                                    Lokasi:{" "}
                                                    {reagent.storage_location}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {!isLoading && reagents.length > 0 && (
                            <div className="pt-2 border-t border-primary-hijauMuda/20">
                                <p className="text-xs text-primary-hijauMuda/60 italic">
                                    Segera lakukan restok untuk reagen-reagen di
                                    atas
                                </p>
                            </div>
                        )}
                    </div>
                </PopoverContent>
            )}
        </Popover>
    );
}
