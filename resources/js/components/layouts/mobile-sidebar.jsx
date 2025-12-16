import { LogOut } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavItem } from "../shared/dashboard/nav-item";

export const MobileSidebar = ({ menuItems, onLogout, isOpen, onClose }) => {
    if (!menuItems || menuItems.length === 0) {
        return null;
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetTitle />
            <SheetDescription />
            <SheetContent
                side="left"
                className="p-0 w-72 bg-primary-hijauTua border-white/10"
            >
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b border-white/10 bg-white/5">
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Dashboard
                        </h1>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {menuItems.map((item, index) => (
                            <NavItem key={index} item={item} />
                        ))}
                    </nav>

                    <div className="p-4 border-t border-white/10">
                        <Button
                            onClick={onLogout}
                            className="w-full flex justify-center items-center gap-2 px-5 py-3 rounded-lg bg-red-500/80 hover:bg-red-600 hover:text-white transition-all duration-300"
                        >
                            <LogOut size={20} />
                            Keluar
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
