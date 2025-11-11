import { useSampleCategories, useSampleCategoriesMutations } from "@/hooks/useAdminCategory";
import Loading from "@/components/ui/loading"; 
import { useAuth } from "@/hooks/useAuth"; 
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { getSampleCategoriesColumns } from "@/components/shared/admin/test-columns";//
import CategoryDetailSheet from "@/components/shared/sheet/category-detail-sheets";
import ManagedDataTable from "@/components/shared/tabel/managed-data-table";
import { sampleCategories } from "@/data/admin/tests";//
import { editCategorySampleFields } from "@/utils/fields/admin";
import { useMemo, useState } from "react";

export default function SampleCategoriesPage({ auth, sampleCategoriesData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
            
    const handleShowDetail = (tests) => {
            setSelectedCategory(tests);
            setIsOpen(true);
    };

    const currentUser = auth?.user || { name: "King Akbar", role: "Manager" };
    const parameters = sampleCategoriesData || sampleCategories;

    const columns = useMemo(() => getSampleCategoriesColumns({ onShowDetail: handleShowDetail }), []);

    return (
        <DashboardLayout
            title="Manajemen Kategori Sampel"
            user={currentUser}
            header="Manajemen Kategori Sampel"
        >
            <ManagedDataTable
                data={parameters}
                columns={columns}
                editFields={editCategorySampleFields}
                createUrl="admin.test.categorySample.create"
                editUrl="admin.test.categorySample.update"
                deleteUrl="admin.test.categorySample.destroy"
                editTitle="Edit Kategori Sampel"
                deleteTitle="Hapus Kategori Sampel"
            />
        <CategoryDetailSheet data={selectedCategory} isOpen={isOpen} onOpenChange={setIsOpen} />
        </DashboardLayout>
    );
}

// import DashboardLayout from "../../../../components/layouts/dashboard-layout";
// import ManagedDataTable from "../../../../components/shared/tabel/managed-data-table";
// import CategoryDetailSheet from "../../../../components/shared/sheet/category-detail-sheets";
// import { getSampleCategoriesColumns } from "@/components/shared/admin/test-columns";
// import { editCategorySampleFields } from "@/utils/fields/admin";
// import { useMemo, useState } from "react";

// export default function SampleCategoriesPage() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);

//     // Memanggil "Asisten Pribadi" (Hook)
//     const { user, loading: authLoading } = useAuth(); // Baris ini yang menyebabkan error
//     const { data: queryData, isLoading, isError, error } = useSampleCategories();
//     const { createCategory, updateCategory, deleteCategory } = useSampleCategoriesMutations();


//     const handleShowDetail = (category) => {
//         setSelectedCategory(category);
//         setIsOpen(true);
//     };

//     // Fungsi untuk diteruskan ke ManagedDataTable
//     const handleCreate = async (formData) => createCategory.mutateAsync(formData);
    
//     const handleEdit = async (id, formData) => updateCategory.mutateAsync({ id, data: formData });
    
//     const handleDelete = async (id) => {
//         // Ganti 'confirm' dengan modal kustom jika ada
//         if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
//             deleteCategory.mutateAsync(id);
//         }
//     };
    
//     // Definisikan kolom
//     const columns = useMemo(
//         () => getSampleCategoriesColumns({ 
//             onShowDetail: handleShowDetail,
//             onEdit: handleEdit, 
//             onDelete: handleDelete
//         }),
//         [] // Dependency array
//     );

//     // Ambil data user dari hook auth
//     const currentUser = user || { name: "King Akbar", role: "Admin" };

//     // Tampilkan loading jika data user ATAU data kategori sedang dimuat
//     if (isLoading || authLoading) {
//         return (
//             <DashboardLayout title="Manajemen Kategori" user={currentUser}>
//                 <Loading />
//             </DashboardLayout>
//         );
//     }

//     // Tampilkan error jika gagal memuat data
//     if (isError) {
//         return (
//             <DashboardLayout title="Manajemen Kategori" user={currentUser}>
//                 <div className="text-center text-red-500 py-8">
//                     {error.message || "Terjadi kesalahan saat memuat data"}
//                 </div>
//             </DashboardLayout>
//         );
//     }

//     // Tampilkan halaman jika semua data siap
//     return (
//         <DashboardLayout
//             title="Manajemen Kategori Sampel"
//             user={currentUser}
//             header="Manajemen Kategori Sampel"
//         >
//             <ManagedDataTable
//                 data={queryData?.data || []} 
//                 columns={columns}
//                 editFields={editCategorySampleFields}
                
//                 onCreate={handleCreate}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
                
//                 editTitle="Edit Kategori Sampel"
//                 deleteTitle="Hapus Kategori Sampel"
//             />
//             <CategoryDetailSheet data={selectedCategory} isOpen={isOpen} onOpenChange={setIsOpen} />
//         </DashboardLayout>
//     );
// }