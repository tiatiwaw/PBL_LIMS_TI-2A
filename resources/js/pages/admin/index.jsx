import DashboardLayout from "@/components/layouts/main-layouts";

export default function HomePage() {
    const user = {
        name: 'Leo',
        role: 'Admin',
        avatar: 'https://i.pravatar.cc/150?img=3',
    }
    return (
        <DashboardLayout title="Home" user={user} text='Selamat Datang Admin!'>
            <section>
                <div>
                    <h1>alo</h1>
                </div>
            </section>
        </DashboardLayout>
    );
}
