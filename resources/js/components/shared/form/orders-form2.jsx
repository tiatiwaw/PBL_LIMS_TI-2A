import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import TableSamplesOrd from "@/components/shared/table/table-samplesord";
import { Button } from "@/components/ui/button";
import { dummySamples } from '@/data/samples';
import { DatePicker } from '@/components/ui/date-picker';

export default function OrdersForm2() {

  const [selectedSamples, setSelectedSamples] = useState([]);
  const [isSampleDialogOpen, setIsSampleDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    tipeOrder: '',
    samples: [],
    tanggalOrder: '',
    estimasiSelesai: '',
    catatan: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTipeOrderSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      tipeOrder: value
    }));
    setIsDropdownOpen(false);
  };

  const handleSampleSelect = (sample) => {
  setSelectedSamples((prev) => {
    const exists = prev.find((s) => s.id === sample.id);
    return exists ? prev.filter((s) => s.id !== sample.id) : [...prev, sample];
  });
};

  const handleTambahSamples = () => {
  setFormData((prev) => ({
    ...prev,
    samples: selectedSamples
  }));
  setIsSampleDialogOpen(false);
};



  const handleKembali = () => {
    console.log('Kembali clicked');
  };

  const handleLanjutkan = () => {
    console.log('Form submitted:', formData);
  };

  const orderTypes = [
    { value: 'internal', label: 'INTERNAL', bgColor: 'bg-gray-500' },
    { value: 'external', label: 'EXTERNAL', bgColor: 'bg-teal-600' },
    { value: 'regular', label: 'REGULAR', bgColor: 'bg-blue-500' },
    { value: 'urgent', label: 'URGENT', bgColor: 'bg-red-500' },
  ];

  const getSelectedLabel = () => {
    const selected = orderTypes.find(type => type.value === formData.tipeOrder);
    return selected ? selected.label : 'Pilih Tipe Order';
  };

  return (
    <div className="bg-white p-6 rounded-lg max-w-xl">
      <div className="space-y-6">
        {/* Tipe Order */}
        <div>
          <label className="block text-sm font-semibold mb-2">Tipe Order</label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-left flex items-center justify-between"
            >
              <span className={formData.tipeOrder ? 'text-gray-700' : 'text-gray-400'}>
                {getSelectedLabel()}
              </span>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <div className="p-3 grid grid-cols-2 gap-2">
                  {orderTypes.map((type) => (
                    <div
                      key={type.value}
                      onClick={() => handleTipeOrderSelect(type.value)}
                      className={`
                        border rounded-lg p-3 cursor-pointer transition-all duration-200 text-center
                        ${type.bgColor} text-white
                        ${formData.tipeOrder === type.value
                          ? 'ring-2 ring-offset-2 ring-gray-400'
                          : 'hover:brightness-110'
                        }
                      `}
                    >
                      <span className="font-bold text-sm">{type.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sample */}
        <div>
          <label className="block text-sm font-semibold mb-2">Sample</label>

          <button
            type="button"
            onClick={() => setIsSampleDialogOpen(true)}
            className={`
              w-full border rounded-lg p-3 transition-all duration-200 text-center
              ${formData.samples.length > 0
                ? 'border-teal-500 bg-teal-500 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }
            `}
          >
            <span className="font-bold text-sm">
              {formData.samples.length > 0
                ? `${formData.samples.length} sampel dipilih`
                : 'Pilih Sampel'}
            </span>
          </button>


          {/* Dialog Pilih Sampel */}
          <Dialog open={isSampleDialogOpen} onOpenChange={setIsSampleDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Pilih Sampel</DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
              <TableSamplesOrd
                data={dummySamples}
                onSelectSample={handleSampleSelect}
                selected={selectedSamples}
                />
              </div>

              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsSampleDialogOpen(false)}>
                  Tutup
                </Button>
                <Button
                  onClick={handleTambahSamples}
                  disabled={selectedSamples.length === 0}
                >
                  Tambahkan ({selectedSamples.length})
                </Button>
              </DialogFooter>

            </DialogContent>
          </Dialog>
        </div>

        {/* Tanggal Order */}
        <DatePicker
          label="Tanggal Order"
          value={formData.tanggalOrder}
          onChange={(date) =>
            setFormData((prev) => ({
              ...prev,
              tanggalOrder: date ? date.toISOString().split("T")[0] : "",
            }))
          }
        />

        {/* Estimasi Order Selesai */}
        <DatePicker
          label="Estimasi Order Selesai"
          value={formData.estimasiSelesai}
          onChange={(date) =>
            setFormData((prev) => ({
              ...prev,
              estimasiSelesai: date ? date.toISOString().split("T")[0] : "",
            }))
          }
        />


        {/* Catatan */}
        <div>
          <label className="block text-sm font-semibold mb-2">Catatan</label>
          <textarea
            name="catatan"
            value={formData.catatan}
            onChange={handleChange}
            placeholder="Catatan orderan"
            rows="3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
