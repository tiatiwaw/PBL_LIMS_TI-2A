import DashboardLayout from "@/components/layouts/dashboard-layout";
import { BookText, Wallet, Clock } from 'lucide-react';


const StatCard = ({ icon: Icon, title, value, subtitle }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
            <div className="bg-primary-hijauTerang p-4 rounded-lg">
                <Icon size={28} className="text-primary-hijauTua" />
            </div>
            <div>
                <p className="text-primary-hijauTua font-bold text-sm">{title}</p>
                <p className="text-3xl font-bold text-primary-hijauTua">{value}</p>
                <p className="text-primary-hijauTua font-bold text-xs mt-1">{subtitle}</p>
            </div>
        </div>
    );
};


// --- Halaman Utama Anda (Sudah Diperbaiki) ---
export default function HomePage() {
    const user = {
        name: 'Yapi',
        role: 'Manager',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }

    return (
        <DashboardLayout title="Home" user={user} header='Selamat Datang, Manager!'>
            <div className="space-y-8">
                {<h1 className="text-2xl font-bold text-primary-hijauTua text-center">Hello KUY</h1>}
                
            </div>
        </DashboardLayout>
    );
}