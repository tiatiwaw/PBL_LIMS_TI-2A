// /pages/analyst/profile.jsx
import { useState } from "react";
import { router } from "@inertiajs/react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import Loading from "@/components/ui/loading";
import { Award, FileText, Upload } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getProfile, useChangePassword, useUpdateProfile, useUploadSignature } from "@/hooks/useProfile";
import SignaturePad from "@/components/profile/signature-pad";

export default function ProfilePage() {
  const changePassword = useChangePassword();
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutateAsync: uploadSignature, isPending: isUploading } = useUploadSignature();
  
  const [pdfPreview, setPdfPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureMode, setSignatureMode] = useState("upload"); // "upload" or "draw"
  const [editName, setEditName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [signatureFile, setSignatureFile] = useState(null);

  const { user } = useAuth();
  const { data: profileData, isLoading, error } = getProfile(user?.id);

  const handleEditClick = () => {
    setEditName(profileData?.name || "");
    setShowEditModal(true);
  };

  const handleSaveName = async () => {
    try {
      await updateProfile({ id: profileData.id, data: { name: editName } });
      toast.success("Nama berhasil diperbarui");
      setShowEditModal(false);
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleSignatureUpload = async () => {
    if (!signatureFile) {
      toast.error("Pilih file terlebih dahulu");
      return;
    }
    try {
      await uploadSignature({ id: profileData.id, signature: signatureFile });
      toast.success("Signature berhasil diunggah");
      setShowSignatureModal(false);
      setSignatureFile(null);
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleChangePassword = async (id, formData) => {
    try {
      await changePassword.mutateAsync({ id, data: formData });
      setShowChangeModal(false);
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      }
    }
  };

  const handleDrawSignature = async (blob) => {
    try {
      const file = new File([blob], `signature-${Date.now()}.png`, { type: "image/png" });
      await uploadSignature({ id: profileData.id, signature: file });
      toast.success("Signature berhasil disimpan");
      setShowSignatureModal(false);
      setSignatureMode("upload");
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      }
    }
  };

  if (isLoading) return <DashboardLayout title="Profil Pengguna" header="Profil Pengguna"><Loading /></DashboardLayout>;
  
  if (error) return <DashboardLayout title="Profil Pengguna" header="Profil Pengguna"><div className="text-center text-red-500 py-8">{error.message || "Terjadi kesalahan"}</div></DashboardLayout>;

  return (
    <DashboardLayout title="Profil Pengguna" header="Profil Pengguna">
      <div className="mx-auto space-y-8 py-4">
        
        {/* HEADER BANNER */}
        <div className="bg-gradient-to-r from-primary-hijauGelap to-primary-hijauTua text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative z-10 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Halo, {profileData?.name}! 👋</h1>
              <p className="text-sm opacity-90 mt-1">Ini adalah halaman profil Anda.</p>
            </div>
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                } 
              }}
              className="px-4 py-2 bg-primary-hijauTerang text-primary-hijauTua hover:bg-primary-hijauTerang/80 rounded-lg transition text-sm font-medium"
            >
              ← Kembali
            </button>
          </div>
        </div>

        {/* PROFILE INFO CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-700">Informasi Dasar</h2>
            <button
              onClick={handleEditClick}
              className="text-md px-3 py-1 bg-primary-hijauMuda text-white rounded hover:scale-105 transition"
            >
              Edit
            </button>
          </div>

          <Detail label="Nama" value={profileData?.name} />
          <Detail label="Email" value={profileData?.email} />

          {profileData?.role === "analyst" && (
            <>
              <Detail label="Specialist" value={profileData?.analyst?.specialist} />
            </>
          )}

          {profileData?.role === "client" && (
            <>
              <Detail label="Alamat" value={profileData?.clients?.address} />
              <Detail label="No. Hp" value={profileData?.clients?.phone_number} />
            </>
          )}

          <div className="flex justify-end pt-4 gap-2">
            {profileData?.role !== "client" && (
              <button
                onClick={() => setShowSignatureModal(true)}
                className="px-4 py-2 rounded-lg bg-primary-hijauMuda text-white hover:scale-105 transition flex items-center gap-2"
              >
                <Upload className="w-4 h-4" /> {profileData?.signature ? "Ubah" : "Upload"} Tanda Tangan
              </button>
            )}
            <button
              onClick={() => setShowChangeModal(true)}
              className="px-4 py-2 rounded-lg bg-primary-hijauTua text-white hover:bg-primary-hijauGelap transition-all"
            >
              Ganti Password
            </button>
          </div>
        </div>

         {/* SIGNATURE SECTION - Email Footer Style */}
        {profileData?.role !== "client" && profileData?.signature && (
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Tanda Tangan Digital</h3>
            <div className="border-t pt-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-slate-700">{profileData?.name}</p>
                <p className="text-sm text-slate-500">{profileData?.email}</p>
              </div>
              <button
                onClick={() => setSignaturePreview(profileData.signature)}
                className="border rounded p-3 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
              >
                <img src={`/storage/${profileData.signature?.replace(/\\/g, '/')}`} alt="signature" className="h-20 object-contain" />
              </button>
            </div>
          </div>
        )}

        {/* ANALYST SECTIONS */}
        {profileData?.role === "analyst" && (
          <>
            <CertificatesSection certificates={profileData?.analyst?.certificates} onPdfPreview={setPdfPreview} />
            <TrainingSection trainings={profileData?.analyst?.trainings} />
          </>
        )}

       

        {/* PDF PREVIEW MODAL */}
        {pdfPreview && <PdfPreviewModal pdfPath={pdfPreview} onClose={() => setPdfPreview(null)} />}

        {/* SIGNATURE PREVIEW MODAL */}
        {signaturePreview && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 relative shadow-2xl max-w-md">
              <button
                className="absolute top-3 right-3 text-slate-600 hover:text-primary-hijauGelap text-xl"
                onClick={() => setSignaturePreview(null)}
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold mb-4">Preview Signature</h3>
              <img src={`/storage/${signaturePreview?.replace(/\\/g, '/')}`} alt="signature" className="w-full object-contain border rounded p-4 bg-slate-50" />
            </div>
          </div>
        )}

        {/* MODALS */}
        {showEditModal && (
          <EditNameModal
            name={editName}
            setName={setEditName}
            onSave={handleSaveName}
            onClose={() => setShowEditModal(false)}
            isLoading={isUpdating}
          />
        )}

        {showSignatureModal && (
          <BaseModal title="Unggah Tanda Tangan" onClose={() => { setShowSignatureModal(false); setSignatureMode("upload"); }}>
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setSignatureMode("upload")}
                  className={`flex-1 py-2 rounded-lg transition ${
                    signatureMode === "upload"
                      ? "bg-primary-hijauMuda text-white"
                      : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Upload File
                </button>
                <button
                  onClick={() => setSignatureMode("draw")}
                  className={`flex-1 py-2 rounded-lg transition ${
                    signatureMode === "draw"
                      ? "bg-primary-hijauMuda text-white"
                      : "border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Gambar
                </button>
              </div>

              {signatureMode === "upload" ? (
                <>
                  <div>
                    <label className="block text-sm mb-2 font-medium text-slate-700">Pilih File</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSignatureFile(e.target.files?.[0] || null)}
                      className="w-full border px-3 py-2 rounded-lg bg-slate-50"
                    />
                    {signatureFile && <p className="text-xs text-slate-500 mt-2">File: {signatureFile.name}</p>}
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button onClick={() => setShowSignatureModal(false)} className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-100">
                      Batal
                    </button>
                    <button
                      onClick={handleSignatureUpload}
                      disabled={isUploading || !signatureFile}
                      className="px-4 py-2 rounded-lg bg-primary-hijauMuda text-white hover:scale-105 transition disabled:opacity-50"
                    >
                      {isUploading? "Mengupload" : "Upload"}
                    </button>
                  </div>
                </>
              ) : (
                <SignaturePad
                  onSave={handleDrawSignature}
                  onCancel={() => setShowSignatureModal(false)}
                />
              )}
            </div>
          </BaseModal>
        )}

        {showChangeModal && (
          <ChangePasswordModal
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            onSave={() => handleChangePassword(profileData.id, { new_password: newPassword, old_password: oldPassword })}
            onClose={() => setShowChangeModal(false)}
            isLoading={changePassword.isPending}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

// ========== COMPONENTS ==========
function Detail({ label, value }) {
  return (
    <div className="flex text-sm py-2 border-b last:border-b-0">
      <span className="w-32 font-semibold text-slate-700">{label}</span>
      <span className="text-slate-600">: {value}</span>
    </div>
  );
}

function CertificatesSection({ certificates, onPdfPreview }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-primary-hijauTua" /> Sertifikat
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {certificates?.length > 0 ? (
          certificates.map((cert, i) => (
            <CertificateCard key={i} cert={cert} onPdfPreview={onPdfPreview} />
          ))
        ) : (
          <p className="text-slate-500 text-sm">Belum ada sertifikat.</p>
        )}
      </div>
    </div>
  );
}

function CertificateCard({ cert, onPdfPreview }) {
  return (
    <div
      className={`border p-4 rounded-xl shadow-sm transition-all ${
        cert.file_path ? "cursor-pointer hover:shadow-md hover:bg-primary-toska" : "opacity-50 cursor-not-allowed"
      }`}
      onClick={() => cert.file_path && onPdfPreview(cert.file_path)}
    >
      <p className="font-semibold text-slate-700">{cert.name}</p>
      <p className="text-xs text-slate-500 mt-1">
        {cert.file_path ? "Klik untuk melihat PDF" : "File belum tersedia"}
      </p>
    </div>
  );
}

function TrainingSection({ trainings }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary-hijauTua" /> Training
      </h3>
      {trainings?.length > 0 ? (
        <div className="space-y-4">
          {trainings.map((t, i) => (
            <TrainingCard key={i} training={t} />
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-sm">Belum ada training.</p>
      )}
    </div>
  );
}

function TrainingCard({ training }) {
  return (
    <div className="p-4 border rounded-xl bg-slate-50 shadow-sm">
      <p className="font-semibold">{training.name}</p>
      <p className="text-sm text-slate-700">{training.provider}</p>
      <p className="text-xs text-slate-500">{training.date}</p>
      <p className="text-xs text-primary-hijauTua font-semibold mt-1">{training.result}</p>
    </div>
  );
}

function PdfPreviewModal({ pdfPath, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-3/4 h-3/4 relative shadow-2xl">
        <button
          className="absolute top-2 right-2 bg-primary-hijauTua text-white px-3 py-1 rounded"
          onClick={onClose}
        >
          ✕
        </button>
        <iframe src={`/${pdfPath}`} className="w-full h-full rounded"></iframe>
      </div>
    </div>
  );
}

function EditNameModal({ name, setName, onSave, onClose, isLoading }) {
  return (
    <BaseModal title="Edit Nama" onClose={onClose}>
      <div className="mb-4">
        <label className="block text-sm mb-2 font-medium text-slate-700">Nama</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg bg-slate-50 focus:ring-2 focus:ring-primary-hijauMuda outline-none"
          placeholder="Masukkan nama"
        />
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onClose} className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-100">
          Batal
        </button>
        <button
          onClick={onSave}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-primary-hijauMuda text-white shadow hover:scale-105 transition disabled:opacity-50"
        >
          {isLoading? "Menyimpan" : "Simpan"}
        </button>
      </div>
    </BaseModal>
  );
}

function SignatureUploadModal({ file, setFile, onUpload, onClose, isLoading }) {
  return (
    <BaseModal title="Upload Signature" onClose={onClose}>
      <div className="mb-4">
        <label className="block text-sm mb-2 font-medium text-slate-700">Pilih File</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border px-3 py-2 rounded-lg bg-slate-50"
        />
        {file && <p className="text-xs text-slate-500 mt-2">File: {file.name}</p>}
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onClose} className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-100">
          Batal
        </button>
        <button
          onClick={onUpload}
          disabled={isLoading || !file}
          className="px-4 py-2 rounded-lg bg-primary-hijauMuda text-primary-hijauGelap shadow hover:scale-105 transition disabled:opacity-50"
        >
          Upload
        </button>
      </div>
    </BaseModal>
  );
}

function ChangePasswordModal({ oldPassword, setOldPassword, newPassword, setNewPassword, onSave, onClose, isLoading }) {
  return (
    <BaseModal title="Ganti Password" onClose={onClose}>
      <ModalInput label="Password Lama" value={oldPassword} setValue={setOldPassword} />
      <ModalInput label="Password Baru" value={newPassword} setValue={setNewPassword} />
      <div className="flex justify-end gap-3 mt-4">
        <button onClick={onClose} className="px-4 py-2 rounded-lg border text-slate-600 hover:bg-slate-100">
          Batal
        </button>
        <button
          onClick={onSave}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-primary-hijauMuda text-white shadow hover:scale-105 transition disabled:opacity-50"
        >
          {isLoading? "Menyimpan" : "Ganti Password"}
        </button>
      </div>
    </BaseModal>
  );
}

function BaseModal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md relative border">
        <button
          className="absolute top-3 right-3 text-slate-600 hover:text-primary-hijauGelap"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-4 text-slate-700 text-center">{title}</h3>
        {children}
      </div>
    </div>
  );
}

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
