import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function SupervisorPage({ auth }) {
    const currentUser = auth?.user || {
        name: "King Akbar",
        role: "Supervisor",
    };
    return (
        <DashboardLayout
            title="Beranda"
            user={currentUser}
            header={`Selamar Datang, ${currentUser.name}`}
        >
            <h1>Apa Aja Dehh</h1>
        </DashboardLayout>
    );
}
