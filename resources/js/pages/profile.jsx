// /pages/analyst/profile.jsx
import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Loading from "@/components/ui/loading";
import { Award, FileText } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getProfile, useChangePassword } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { update: changePassword, isChanging } = useChangePassword();
  const [pdfPreview, setPdfPreview] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { user, loading: authLoading } = useAuth();
  const { data: profileData, isLoading: profileLoading } = getProfile(user?.id);

  if (authLoading || !user) return <Loading />;
  if (profileLoading) return <Loading />;

  // ----------------------------------------
  //  HANDLERS
  // ----------------------------------------
  const handleOpenChange = () => {
    setOldPassword("");
    setNewPassword("");
    setShowChangeModal(true);
  };

  const handleChangePassword = async (id, formData) => {
    try {
      const res = await changePassword.mutateAsync({id, data: formData});

      const msg =
        res?.message ||
        res?.data?.message ||
        "Password berhasil diubah";

      toast.success(msg);
      setShowChangeModal(false);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Gagal mengganti password";
      toast.error(msg);
    }
  };

  return (
    <DashboardLayout title="Profil Pengguna" header="Profil Pengguna">
      <div className="max-w-5xl mx-auto space-y-8 py-4">

        {/* HEADER BANNER */}
        <div className="bg-gradient-to-r from-primary-hijauGelap to-primary-hijauTua text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative z-10">
            <h1 className="text-2xl font-bold">Halo, {profileData.name}! 👋</h1>
            <p className="text-sm opacity-90 mt-1">
              Ini adalah halaman profil Anda.
            </p>
          </div>
        </div>

        {/* PROFILE INFO CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 space-y-4">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">Informasi Dasar</h2>

          <Detail label="Nama" value={profileData.name} />
          <Detail label="Email" value={profileData.email} />

          {profileData.role === "analyst" && (
            <Detail label="Specialist" value={profileData.analyst.specialist} />
          )}
          {profileData.role === "client" && (
            <>
              <Detail label="Alamat" value={profileData.clients.address} />
              <Detail label="No. Hp" value={profileData.clients.phone_number} />
            </>
          )}

          {/* BUTTON CHANGE PASSWORD */}
          <div className="flex justify-end pt-4">
            <button
              className="px-4 py-2 rounded-lg bg-primary-hijauTua text-white hover:bg-primary-hijauGelap transition-all"
              onClick={handleOpenChange}
            >
              Ganti Password
            </button>
          </div>
        </div>

        {/* ANALYST SECTIONS */}
        {profileData.role === "analyst" && (
          <>
            {/* CERTIFICATES */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary-hijauTua" /> Sertifikat
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {profileData.analyst.certificates?.length > 0 ? (
                  profileData.analyst.certificates.map((cert, i) => (
                    <div
                      key={i}
                      className={`border p-4 rounded-xl shadow-sm transition-all hover:shadow-md ${
                        cert.file_path
                          ? "cursor-pointer hover:bg-primary-toska"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() =>
                        cert.file_path && setPdfPreview(cert.file_path)
                      }
                    >
                      <p className="font-semibold text-slate-700">{cert.name}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {cert.file_path
                          ? "Klik untuk melihat PDF"
                          : "File belum tersedia"}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">Belum ada sertifikat.</p>
                )}
              </div>
            </div>

            {/* TRAINING */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-hijauTua" /> Training
              </h3>

              {profileData.analyst.trainings?.length > 0 ? (
                <div className="space-y-4">
                  {profileData.analyst.trainings.map((t, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-xl bg-slate-50 shadow-sm"
                    >
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-slate-700">{t.provider}</p>
                      <p className="text-xs text-slate-500">{t.date}</p>
                      <p className="text-xs text-primary-hijauTua font-semibold mt-1">
                        {t.result}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">Belum ada training.</p>
              )}
            </div>

            {/* PDF PREVIEW MODAL */}
            {pdfPreview && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-4 w-3/4 h-3/4 relative shadow-2xl">
                  <button
                    className="absolute top-2 right-2 bg-primary-hijauTua text-white px-3 py-1 rounded"
                    onClick={() => setPdfPreview(null)}
                  >
                    X
                  </button>
                  <iframe
                    src={`/${pdfPreview}`}
                    className="w-full h-full rounded"
                  ></iframe>
                </div>
              </div>
            )}
          </>
        )}

        {/* CHANGE PASSWORD MODAL */}
        {showChangeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md relative border">
              <button
                className="absolute top-3 right-3 text-slate-600 hover:text-primary-hijauGelap"
                onClick={() => setShowChangeModal(false)}
              >
                ✕
              </button>

              <h3 className="text-lg font-bold mb-4 text-slate-700 text-center">
                Ganti Password
              </h3>

              <ModalInput
                label="Password Lama"
                value={oldPassword}
                setValue={setOldPassword}
              />
              <ModalInput
                label="Password Baru"
                value={newPassword}
                setValue={setNewPassword}
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-100"
                  onClick={() => setShowChangeModal(false)}
                >
                  Batal
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-primary-hijauMuda text-primary-hijauGelap shadow hover:scale-[1.02] transition"
                  onClick={() => handleChangePassword(profileData.id, {
										new_password: newPassword,
										old_password: oldPassword
									})}
                >
                  {"Ganti Password"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// ----------------------------------------
//  COMPONENT: DETAIL ROW
// ----------------------------------------
function Detail({ label, value }) {
  return (
    <div className="flex text-sm py-2 border-b last:border-b-0">
      <span className="w-32 font-semibold text-slate-700">{label}</span>
      <span className="text-slate-600">: {value}</span>
    </div>
  );
}

// ----------------------------------------
//  COMPONENT: MODAL INPUT
// ----------------------------------------
function ModalInput({ label, value, setValue }) {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-1 font-medium text-slate-700">{label}</label>
      <input
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary-hijauMuda outline-none"
        placeholder={label}
      />
    </div>
  );
}
