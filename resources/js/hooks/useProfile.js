import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { profileService } from "@/services/profileService";
import { useAuth } from "./useAuth";

/**
 * Hook untuk mengambil data profil pengguna yang sedang login.
 * Query akan di-disable jika ID pengguna belum tersedia.
 */
export const useProfile = () => {
    const { user } = useAuth();
    const userId = user?.id; // Ambil ID secara aman

    // console.log(user) // Pindahkan logging ke komponen jika perlu
    
    return useQuery({
        // PENTING: Sertakan userId dalam queryKey agar cache berubah 
        // jika pengguna berganti (meskipun jarang terjadi di front-end)
        queryKey: ["profile", userId], 
        
        // FIX: queryFn HARUS berupa fungsi yang mengembalikan Promise.
        // Jangan langsung memanggil fungsi service di sini.
        queryFn: () => profileService.profile.getById(userId), 
        
        // PENTING: Gunakan 'enabled' untuk mencegah query berjalan 
        // jika userId belum tersedia (misalnya, saat proses autentikasi)
        enabled: !!userId,

        onError: (err) => toast.error(err?.message || "Gagal memuat profil"),
    });
};