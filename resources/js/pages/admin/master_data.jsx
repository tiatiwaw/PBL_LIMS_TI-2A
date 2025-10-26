import DashboardLayout from "../../components/layouts/dashboard-layout";
import DataTable from "../../components/shared/tabel/tabels";

const Badge = ({ value, type = 'status' }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full text-center";

    const variantClasses = {
        tipe: {
            'Eksternal': 'bg-primary-hijauMuda/20 text-primary-hijauTua',
            'Internal': 'bg-blue-100 text-blue-800',
            'Urgent': 'bg-red-200 text-red-800',
        }
    };

    const specificClass = variantClasses[type]?.[value] || 'bg-gray-100 text-gray-800';

    return <span className={`${baseClasses} ${specificClass}`}>{value}</span>;
}


export default function activityLogPage() {
    const user = { name: 'Ben', role: 'Admin' };

    return (
        <DashboardLayout title="Aktivitas Log" user={user} header='Master Data'>
            <DataTable
                columns={columns}
            />
            
        </DashboardLayout>
        
    );
}