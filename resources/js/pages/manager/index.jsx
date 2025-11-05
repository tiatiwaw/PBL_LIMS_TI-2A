import DashboardLayout from "@/components/layouts/dashboard-layout";
import StatCard from "@/components/shared/card/stat-card";
import { BookText, Users as UsersIcon, Clock, FileText } from "lucide-react";
import { usePage } from "@inertiajs/react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

export default function ManagerPage() {
    const page = usePage();
    const user = page?.props?.auth?.user || { name: 'Manager', role: 'Manager' };
    const { totalOrders = 0, totalUsers = 0, ordersToday = 0, pendingReports = 0, recentOrders = [] } = page.props;

    const cards = [
        { title: "Total Orders", value: String(totalOrders), subtitle: "Updated live", icon: BookText },
        { title: "Total Users", value: String(totalUsers), subtitle: "Registered users", icon: UsersIcon },
        { title: "Orders Today", value: String(ordersToday), subtitle: "Created today", icon: Clock },
        { title: "Pending Reports", value: String(pendingReports), subtitle: "Awaiting validation", icon: FileText },
    ];

    return (
        <DashboardLayout title="Dashboard Manager" user={user} header='Selamat Datang, Manager!'>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {cards.map((stat, index) => (
                        <StatCard key={index} stat={stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-bold text-primary-hijauTua mb-4">Recent Orders</h2>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Estimate</TableHead>
                                    <TableHead>Report Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {(recentOrders || []).length > 0 ? (
                                    recentOrders.map((o) => (
                                        <TableRow key={o.id}>
                                            <TableCell>{o.id}</TableCell>
                                            <TableCell>{o.user || '-'}</TableCell>
                                            <TableCell>{o.title || '-'}</TableCell>
                                            <TableCell>{o.tipe || '-'}</TableCell>
                                            <TableCell>{o.status || '-'}</TableCell>
                                            <TableCell>{o.estimasi || '-'}</TableCell>
                                            <TableCell>{o.report_issued_at || '-'}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">No recent orders.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
