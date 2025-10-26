import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputField from "../form/input-field";
import { Card } from "@/components/ui/card";

// Definisikan tipe untuk properti form agar lebih mudah dikelola
const initialFormState = {
  name: "",
  akun: "",      
  password: "",  
  alamat: "",
  nomor: "",
  npwp: "",
};

// Fungsi utilitas untuk menentukan judul dialog
const getDialogTitle = (mode) => {
  switch (mode) {
    case "edit":
      return "Edit Data Klien";
    case "detail":
      return "Detail Klien"; 
    case "create":
    default:
      return "Tambah Klien Baru";
  }
};

// Fungsi utilitas untuk mendapatkan status input (readOnly)
const isReadOnly = (mode) => mode === "detail";


export default function DialogClient({
  open,
  setOpen,
  onAdd, // Mengembalikan prop onAdd untuk dikaitkan dengan tombol trigger
  mode = "create",
  clientData = initialFormState, 
  onSubmit,
}) {
  const [form, setForm] = useState(initialFormState);

  // Menggunakan useEffect untuk mengisi form berdasarkan mode dan data
  useEffect(() => {
    if (mode === "edit") {
      setForm({
        name: clientData.name || "",
        akun: clientData.akun || "",
        password: clientData.password || "",
        alamat: clientData.alamat || "",
        nomor: clientData.nomor || "",
        npwp: clientData.npwp || "",
      });
    } else {
      // Reset form saat mode 'create'
      setForm(initialFormState);
    }
  }, [mode, clientData]); 

  const handleChange = (e) => {
    if (isReadOnly(mode)) return; 
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReadOnly(mode)) return; 
    
    onSubmit(form);
    setOpen(false);
  };
  
  const title = getDialogTitle(mode);
  const readOnly = isReadOnly(mode);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Hapus conditional rendering untuk DialogTrigger */}
      <DialogTrigger asChild>
        <Button onClick={onAdd} className="!bg-primary-hijauMuda hover:!bg-primary-hijauTua">
          Tambah Klien Baru
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {mode === "detail" ? (
          <Card className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Nama Klien</p>
                <p className="col-span-2">: {clientData.name}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Akun</p>
                <p className="col-span-2">: {clientData.akun}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Alamat</p>
                <p className="col-span-2">: {clientData.alamat}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Nomor Telepon</p>
                <p className="col-span-2">: {clientData.nomor}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">NPWP</p>
                <p className="col-span-2">: {clientData.npwp || '-'}</p>
              </div>

              <DialogFooter>
                <Button
                  className="mr-2 bg-gray-200 hover:!bg-gray-300"
                  type="button"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  Tutup
                </Button>
              </DialogFooter>
            </div>
          </Card>
        ) : (
          // Form untuk mode create dan edit
          <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Input Fields */}
          <InputField
            label="Nama Klien"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama klien"
            readOnly={readOnly}
          />
          
          <InputField
            label="Akun Klien"
            name="akun"
            value={form.akun}
            onChange={handleChange}
            placeholder="Masukkan akun klien"
            readOnly={readOnly}
          />
          
          <InputField
            label="Password Klien"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password klien"
            readOnly={readOnly}
          />

          <InputField
            label="Alamat Klien"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            placeholder="Masukkan alamat klien"
            readOnly={readOnly}
          />

          <InputField
            label="Nomor Klien"
            name="nomor"
            value={form.nomor}
            onChange={handleChange}
            placeholder="Masukkan nomor klien"
            readOnly={readOnly}
          />

          <InputField
            label="NPWP Klien"
            name="npwp"
            value={form.npwp}
            onChange={handleChange}
            placeholder="Masukkan NPWP klien"
            readOnly={readOnly}
            required={false}
          />

          <DialogFooter>
            <Button className="mr-2 bg-gray-200 hover:!bg-gray-300"
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              {readOnly ? "Tutup" : "Batal"} 
            </Button>
            
            {/* Hanya tampilkan tombol submit saat mode 'create' atau 'edit' */}
            {!readOnly && (
              <Button type="submit" className="!bg-primary-hijauMuda hover:!bg-primary-hijauTua">
                {mode === "edit" ? "Simpan Perubahan" : "Simpan"}
              </Button>
            )}
          </DialogFooter>
        </form>
        )}
        
      </DialogContent>
    </Dialog>
  );
}