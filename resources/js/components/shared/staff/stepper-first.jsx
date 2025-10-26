import React from 'react';

// Terima prop 'currentStep' untuk mengetahui tahap yang sedang aktif/selesai
export default function Stepper({ currentStep = 1 }) { 
    
    // Fungsi pembantu untuk menentukan kelas warna lingkaran
    const getCircleClasses = (stepNumber) => {
        // Jika nomor langkah saat ini lebih besar atau sama dengan langkah ini (sudah selesai/aktif)
        if (currentStep >= stepNumber) {
            // Warna Aktif/Selesai (Hijau/Teal)
            return "bg-teal-600 text-white text-3xl font-semibold"; // Tambahkan kelas ukuran/font di sini
        } else {
            // Warna Tidak Aktif/Belum Selesai (Abu-abu)
            return "border-2 border-gray-400 text-gray-600";
        }
    };
    
    // Fungsi getTextClasses tidak lagi diperlukan karena logika teks/angka kini ada di JSX

    return (
        <div className="py-4">
            <h2 className="text-primary-hijauTua text-lg font-bold">
                Langkah {currentStep} : {currentStep === 1 ? 'Klien dan Order' : currentStep === 2 ? 'Uji dan Metode' : 'Konfirmasi dan Submit'}
            </h2>
            
            <div className="flex items-center gap-4 mt-4">
                
                {/* Step 1: Klien dan Order */}
                {/* Step 1 sudah hanya angka, jadi tidak ada perubahan di sini */}
                <div className="flex flex-col items-center">
                    {/* Kelas font/ukuran 3xl sudah ditambahkan ke getCircleClasses untuk konsistensi */}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${getCircleClasses(1)}`}>
                        1
                    </div>
                </div>
                
                {/* Garis penghubung (Opsional) */}
                
                {/* Step 2: Uji dan Metode */}
                <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${getCircleClasses(2)}`}>
                        {/* 🌟 LOGIKA BARU: Jika currentStep >= 2, tampilkan angka. Jika tidak, tampilkan teks. */}
                        {currentStep >= 2 ? (
                            2 // Tampilkan angka 2 jika sudah aktif/selesai
                        ) : (
                            // Tampilkan teks jika belum aktif
                            <div className="text-center flex flex-col justify-center items-center h-full py-1">
                                <div className={`text-[10px] font-medium leading-none text-gray-600`}>UJI</div>
                                <div className={`text-[8px] font-medium leading-none text-gray-600`}>&</div>
                                <div className={`text-[10px] font-medium leading-none text-gray-600`}>METODE</div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Step 3: Konfirmasi dan Submit */}
                <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${getCircleClasses(3)}`}>
                        {/* 🌟 LOGIKA BARU: Jika currentStep >= 3, tampilkan angka. Jika tidak, tampilkan teks. */}
                        {currentStep >= 3 ? (
                            3 // Tampilkan angka 3 jika sudah aktif/selesai
                        ) : (
                            // Tampilkan teks jika belum aktif
                            <div className="text-center flex flex-col justify-center items-center h-full py-1">
                                <div className={`text-[10px] font-medium leading-none text-gray-600`}>KONFIRMASI</div>
                                <div className={`text-[8px] font-medium leading-none text-gray-600`}>&</div>
                                <div className={`text-[10px] font-medium leading-none text-gray-600`}>SUBMIT</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}