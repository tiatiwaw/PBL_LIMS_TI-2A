import DashboardLayout from "@/components/layouts/dashboard-layout";
import StatCard from "@/components/shared/card/stat-card";
import { stats } from "@/data/manager/beranda";
import { usePage } from "@inertiajs/react";

export default function ManagerPage() {
    const user = {
        name: 'Yapi',
        role: 'Manager',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }
    const { totalOrders } = usePage().props;
    stats[0].value = totalOrders;

    return (
        <DashboardLayout title="Dashboard Manager" user={user} header='Selamat Datang, Manager!'>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"> 
                    {stats.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold text-primary-hijauTua text-center mb-4">Times</h2> 
                        <p className="text-center text-gray-400 py-16">
                            [Komponen Grafik Akan Ditampilkan Di Sini]
                        </p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}