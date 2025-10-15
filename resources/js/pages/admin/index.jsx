import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function HomePage() {
    const user = {
        name: 'Leo',
        role: 'Admin',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }
    return (
        <DashboardLayout title="Home" user={user} header='Selamat Datang Admin!'>
            <div className="flex items-center justify-center text-primary-hijauTua font-bold">
                <h1>Hello World!</h1>
            </div>
        </DashboardLayout>
    );
}
