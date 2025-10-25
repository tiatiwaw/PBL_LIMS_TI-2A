import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import { FlaskConical, Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function HomePage() {
    const navItems = [
        { name: "Home", href: "#", current: true },
        { name: "Order", href: "#", current: false },
        { name: "Riwayat", href: "#", current: false },
        { name: "About", href: "#", current: false },
        { name: "Contact", href: "#", current: false },
    ];

    const sheetContentClassName = "bg-primary-hijauTua text-white border-none";

    return (
        <section className="bg-primary-hijauTerang flex items-center justify-center px-4 py-6 min-h-screen relative overflow-hidden">
            <Head title="Home" />
            <div className="absolute inset-0">
                <div className="absolute w-64 h-64 bg-primary-hijauTua rounded-full -top-20 -right-20 opacity-50 z-0" />
                <div className="absolute w-96 h-96 bg-primary-hijauTua rounded-full -bottom-20 -left-20 opacity-20 z-0" />
            </div>
            <header className="fixed top-4 inset-x-4 bg-primary-hijauTua px-6 py-3 md:px-10 md:py-4 rounded-xl shadow-md flex justify-between items-center z-50">
                <div className="flex items-center gap-2 text-white">
                    <FlaskConical size={32} className="md:size-[40px]" />
                    <h1 className="text-2xl md:text-3xl font-bold">LABOO</h1>
                </div>

                <div className="hidden md:flex items-center gap-10 text-white font-bold">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="relative group font-semibold text-white transition-colors duration-300 hover:text-white/80"
                        >
                            {item.name}
                            {item.current && (
                                <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 h-[0.2rem] w-11 group-hover:w-8 bg-white rounded-full transition-all duration-300" />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" className="text-white hover:bg-white/10">
                                <Menu size={24} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className={sheetContentClassName}>
                            <SheetHeader className="mb-4">
                                <SheetTitle className="text-white text-3xl font-bold">
                                    LABOO
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 text-center">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="text-white text-xl font-semibold p-2 rounded-md hover:bg-white/20 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
            <main className="relative z-10 flex flex-col md:flex-row items-center justify-center pt-24 md:pt-0 text-center md:text-left">
                <div className="md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#2A6565] mb-4">
                        Welcome Bro!
                    </h2>
                    <p className="text-md md:text-lg text-[#2A6565] mb-8 leading-relaxed">
                        Laboo merupakan lorem ipsum lorem ipsum lorem ipsum lorem ipsum
                        lorem ipsum lorem ipsum.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <Button variant="outline" className="text-[#2A6565] border-[#2A6565] hover:bg-gray-200">
                            Sign Up
                        </Button>
                        <Button className="bg-[#2A6565] hover:bg-[#1A4545]">
                            Login
                        </Button>
                    </div>
                </div>

                <div className="relative w-full md:w-1/2 mt-10 md:mt-0 flex justify-center md:justify-end items-center">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-[#2A6565] rounded-full flex items-center justify-center shadow-lg">
                        <FlaskConical size={120} className="md:size-[180px] text-white" />
                    </div>
                </div>
            </main>
        </section>
    );
}