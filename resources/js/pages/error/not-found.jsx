import { Head, Link } from "@inertiajs/react";
import {
    FlaskConical,
    Home,
    ArrowLeft,
    Search,
    AlertTriangle,
} from "lucide-react";

export default function NotFound404() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-hijauGelap via-primary-hijauTua to-primary-hijauGelap relative overflow-hidden">
            <Head title="Not Found" />
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-primary-hijauMuda/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
                <div className="absolute w-96 h-96 bg-primary-toska/10 rounded-full blur-3xl top-1/2 -right-48 animate-pulse duration-1000" />
                <div className="absolute w-72 h-72 bg-primary-hijauPudar/5 rounded-full blur-3xl bottom-0 left-1/2 animate-pulse duration-500" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-hijauGelap/70 to-primary-hijauGelap/90" />

            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl w-full text-center space-y-8">
                    <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
                        <FlaskConical className="w-6 h-6 text-primary-hijauMuda" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-hijauMuda to-primary-toska bg-clip-text text-transparent">
                            LABOO
                        </span>
                    </div>

                    <div className="relative py-12">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 bg-gradient-to-r from-primary-hijauMuda/10 to-primary-toska/10 rounded-full blur-3xl animate-pulse" />
                        </div>

                        <div className="relative flex items-center justify-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-hijauMuda/20 to-primary-toska/20 blur-xl" />
                                <div className="relative text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary-hijauMuda to-primary-toska bg-clip-text text-transparent">
                                    4
                                </div>
                            </div>

                            <div className="relative w-24 h-24 md:w-32 md:h-32">
                                <div className="absolute inset-0 rounded-full border-4 border-primary-hijauMuda/30" />
                                <div className="absolute inset-2 rounded-full border-2 border-primary-toska/20" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <AlertTriangle className="w-12 h-12 md:w-16 md:h-16 text-primary-hijauMuda animate-pulse" />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-toska/20 to-primary-hijauMuda/20 blur-xl" />
                                <div className="relative text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary-toska to-primary-hijauMuda bg-clip-text text-transparent">
                                    4
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                            <span className="bg-gradient-to-r from-white via-primary-hijauTerang to-primary-toska bg-clip-text text-transparent">
                                Experiment Not Found
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-primary-hijauTerang/70 max-w-2xl mx-auto leading-relaxed">
                            Oops! The page you're looking for seems to have
                            evaporated from our laboratory. Let's get you back
                            on track.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Link
                            className="group relative px-8 py-4 bg-gradient-to-r from-primary-hijauMuda to-primary-hijauMuda/70 rounded-full font-semibold text-white shadow-2xl shadow-primary-hijauMuda/30 hover:shadow-primary-hijauMuda/50 transition-all duration-300 hover:scale-105"
                            href={"/"}
                        >
                            <span className="flex items-center gap-2 justify-center">
                                <Home className="w-5 h-5" />
                                Back to Home
                            </span>
                        </Link>

                        <Link
                            className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full font-semibold text-primary-hijauTerang border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            onClick={() => window.history.back()}
                        >
                            <span className="flex items-center gap-2 justify-center">
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                Go Back
                            </span>
                        </Link>
                    </div>

                    <div className="absolute top-1/4 left-10 w-2 h-2 bg-primary-hijauMuda rounded-full animate-ping" />
                    <div className="absolute top-1/3 right-20 w-2 h-2 bg-primary-toska rounded-full animate-ping duration-700" />
                    <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping duration-1000" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-hijauMuda/50 to-transparent" />
        </div>
    );
}
