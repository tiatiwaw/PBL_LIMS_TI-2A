// /pages/analyst/profile.jsx
import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { useProfile, useChangePassword } from "@/hooks/useAnalyst";
import Loading from "@/components/ui/loading";
import { Award, FileText } from "lucide-react";
import { toast } from "sonner";

export default function AnalystProfilePage() {
  const { data: profile, isLoading, error } = useProfile();
  const { changePassword, isChanging } = useChangePassword();
  const [pdfPreview, setPdfPreview] = useState(null);

  // modal state & inputs
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (isLoading) return <Loading />;

  if (error)
    return (
      <DashboardLayout title="Profil Analyst" header="Profil Analyst" user={profile?.user}>
        <p className="text-red-600 p-4">Terjadi error: {error.message}</p>
      </DashboardLayout>
    );

  if (!profile?.analyst)
    return (
      <DashboardLayout title="Profil Analyst" header="Profil Analyst" user={profile?.user}>
        <p className="text-red-600 p-4">Data analyst tidak ditemukan.</p>
      </DashboardLayout>
    );

  const { user, analyst } = profile;

  const handleOpenChange = () => {
    setOldPassword("");
    setNewPassword("");
    setShowChangeModal(true);
  };

  const handleChangePassword = async () => {
    try {
      // kirim sesuai nama variable yang diminta: old_password dan new_password
      const res = await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      });

      // jika backend kirim message, tampilkan
      if (res?.message) {
        toast.success(res.message);
      } else if (res?.data?.message) {
        toast.success(res.data.message);
      } else {
        toast.success("Password berhasil diubah");
      }

      setShowChangeModal(false);
    } catch (err) {
      // ambil message dari response atau dari error.message
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        (typeof err === "string" ? err : "Gagal mengganti password");
      toast.error(msg);
    }
  };

  return (
    <DashboardLayout title="Profil Analyst" header="Profil Analyst" user={user}>
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-primary-hijauTua text-primary-hijauTerang p-4 rounded-xl">
          <h1 className="text-xl font-semibold">Selamat Datang, {user.name}!</h1>
          <p className="text-sm opacity-80">Analyst • {analyst.specialist}</p>
        </div>

        {/* PROFILE INFO */}
        <div className="bg-card p-6 shadow-md rounded-xl space-y-2">
          <Detail label="Nama" value={user.name} />
          <Detail label="Email" value={user.email} />
          <Detail label="Specialist" value={analyst.specialist} />
          {/* Ganti: hanya tombol Change Password (hilangkan teks pengalaman) */}
          <div className="flex text-sm items-center">
            <div className="w-32" />
            <div>
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-primary-hijauTua text-primary-hijauTua hover:bg-primary-hijauTua hover:text-white transition-colors duration-200"
                onClick={handleOpenChange}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* CERTIFICATES */}
        <div className="bg-card p-6 shadow-md rounded-xl">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary-hijauMuda" /> Sertifikat
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {analyst.certificates?.length > 0 ? (
              analyst.certificates.map((cert, i) => (
                <div
                  key={i}
                  className={`border p-4 rounded-xl cursor-pointer hover:bg-primary-toska ${
                    !cert.file_path ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={() => cert.file_path && setPdfPreview(cert.file_path)}
                >
                  <p className="font-medium">{cert.name}</p>
                  {cert.file_path ? (
                    <p className="text-xs text-muted-foreground mt-1">Klik untuk melihat PDF</p>
                  ) : (
                    <p className="text-xs text-primary-hijauTua mt-1">File sertifikat belum tersedia</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Belum ada sertifikat.</p>
            )}
          </div>
        </div>

        {/* TRAININGS */}
        <div className="bg-card p-6 shadow-md rounded-xl">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-hijauMuda" /> Training
          </h3>
          <div className="space-y-3">
            {analyst.trainings?.length > 0 ? (
              analyst.trainings.map((t, i) => (
                <div key={i} className="p-3 border rounded-xl bg-popover">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm">{t.provider}</p>
                  <p className="text-xs text-muted-foreground">{t.date}</p>
                  <p className="text-xs text-primary-hijauGelap font-semibold mt-1">{t.result}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Belum ada training.</p>
            )}
          </div>
        </div>

        {/* PDF PREVIEW MODAL */}
        {pdfPreview && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-4 w-3/4 h-3/4 relative">
              <button
                className="absolute top-2 right-2 bg-primary-hijauTua text-primary-hijauTerang px-3 py-1 rounded"
                onClick={() => setPdfPreview(null)}
              >
                X
              </button>
              <iframe src={`/${pdfPreview}`} className="w-full h-full rounded"></iframe>
            </div>
          </div>
        )}

        {/* CHANGE PASSWORD MODAL */}
        {showChangeModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
              <button
                className="absolute top-3 right-3 text-primary-hijauTua hover:text-primary-hijauGelap"
                onClick={() => setShowChangeModal(false)}
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold mb-4">Ganti Password</h3>

              <label className="block text-sm mb-2">Password Lama</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-3"
                placeholder="Masukkan password lama"
              />

              <label className="block text-sm mb-2">Password Baru</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
                placeholder="Masukkan password baru"
              />

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded border border-primary-hijauTua text-primary-hijauTua"
                  onClick={() => setShowChangeModal(false)}
                >
                  Batal
                </button>
                <button
                  className="px-4 py-2 rounded bg-primary-hijauMuda text-primary-hijauGelap disabled:opacity-50"
                  onClick={handleChangePassword}
                  disabled={isChanging}
                >
                  {isChanging ? "Menyimpan..." : "Ganti Password"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex text-sm">
      <span className="w-32 font-semibold">{label}</span>
      <span>: {value}</span>
    </div>
  );
}