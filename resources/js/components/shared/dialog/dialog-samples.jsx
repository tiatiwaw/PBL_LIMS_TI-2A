import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputField from "../form/input-field";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";

const initialFormState = {
  name: "",
  bentuk: "",
  kategori: "",
  kondisi: "",
  volume: "",
  suhu: "",
  tanggalMasuk: "",
};

const getDialogTitle = (mode) => {
  switch (mode) {
    case "edit":
      return "Edit Data Sample";
    case "detail":
      return "Detail Sample";
    case "create":
    default:
      return "Tambah Sample Baru";
  }
};

const isReadOnly = (mode) => mode === "detail";

export default function DialogSample({
  open,
  setOpen,
  mode = "create",
  sampleData = initialFormState,
  onSubmit,
}) {
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    if (mode === "edit" || mode === "detail") {
      setForm({
        name: sampleData?.name || "",
        bentuk: sampleData?.bentuk || "",
        kategori: sampleData?.kategori || "",
        kondisi: sampleData?.kondisi || "",
        volume: sampleData?.volume || "",
        suhu: sampleData?.suhu || "",
        tanggalMasuk: sampleData?.tanggalMasuk || "",
      });
    } else {
      setForm(initialFormState);
    }
  }, [mode, sampleData, open]);

  const handleChange = (e) => {
    if (isReadOnly(mode)) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReadOnly(mode)) return;

    onSubmit(form);
    setForm(initialFormState); // Reset form setelah submit
    setOpen(false);
  };

  const title = getDialogTitle(mode);
  const readOnly = isReadOnly(mode);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {mode === "detail" ? (
          <Card className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Nama Sample</p>
                <p className="col-span-2">: {sampleData?.name}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Bentuk</p>
                <p className="col-span-2">: {sampleData?.bentuk}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Kategori</p>
                <p className="col-span-2">: {sampleData?.kategori}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Kondisi</p>
                <p className="col-span-2">: {sampleData?.kondisi}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Volume</p>
                <p className="col-span-2">: {sampleData?.volume}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Suhu</p>
                <p className="col-span-2">: {sampleData?.suhu}</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <p className="font-semibold">Tanggal Masuk</p>
                <p className="col-span-2">: {sampleData?.tanggalMasuk}</p>
              </div>

              <DialogFooter>
                <Button
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
          <form onSubmit={handleSubmit} className="space-y-3">
            <InputField
              label="Nama Sample"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama sample"
              readOnly={readOnly}
            />

            <div>
              <label className="block text-sm font-semibold mb-2">
                Bentuk Sample
              </label>
              <select
                name="bentuk"
                value={form.bentuk}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Pilih Bentuk Sample</option>
                <option value="Cair">Cair</option>
                <option value="Padat">Padat</option>
                <option value="Gas">Gas</option>
              </select>
            </div>

            <InputField
              label="Kategori Sample"
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              placeholder="Masukkan kategori sample"
              readOnly={readOnly}
            />

            <div>
              <label className="block text-sm font-semibold mb-2">
                Kondisi Sample
              </label>
              <select
                name="kondisi"
                value={form.kondisi}
                onChange={handleChange}
                disabled={readOnly}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Pilih Kondisi Sample</option>
                <option value="Good">Good</option>
                <option value="Damages">Damages</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <InputField
              label="Volume"
              name="volume"
              value={form.volume}
              onChange={handleChange}
              placeholder="Masukkan volume sample"
              readOnly={readOnly}
            />

            <InputField
              label="Suhu"
              name="suhu"
              value={form.suhu}
              onChange={handleChange}
              placeholder="Masukkan suhu sample"
              readOnly={readOnly}
            />

            <DatePicker
              label="Tanggal Masuk"
              name="tanggalMasuk"
              type="date"
              value={form.tanggalMasuk}
              onChange={handleChange}
              readOnly={readOnly}
            />

            <DialogFooter>
              <Button className="mr-2 bg-gray-200 hover:!bg-gray-300"
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>

              <Button type="submit" className="!bg-primary-hijauMuda hover:!bg-primary-hijauTua">
                {mode === "edit" ? "Simpan Perubahan" : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}