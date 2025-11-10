import DashboardLayout from "@/components/layouts/dashboard-layout";

export default function AnalystsPage(Auth) {
    const currentUser = Auth?.user || {
        name: "Supervisor",
        role: "Supervisor",
    };
    return (
        <DashboardLayout
            title="Analis"
            header="Manajemen Analis"
            user={currentUser}
        >
            <h1>Hello World</h1>
        </DashboardLayout>
    );
}
