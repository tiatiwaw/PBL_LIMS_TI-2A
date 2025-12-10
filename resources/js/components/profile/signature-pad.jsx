import { useRef, useState } from "react";
import { Trash2, Download } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePad({ onSave, onCancel }) {
  const signatureRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setIsEmpty(true);
    }
  };

  const handleSave = () => {
    if (signatureRef.current && !isEmpty) {
      const canvas = signatureRef.current.getCanvas();
      canvas.toBlob((blob) => {
        onSave(blob);
      }, "image/png");
    }
  };

  const handleEndStroke = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      setIsEmpty(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-slate-300 rounded-lg overflow-hidden bg-white">
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{
            className: "w-full",
          }}
          onEnd={handleEndStroke}
          penColor="#000000"
          backgroundColor="#ffffff"
          minWidth={0.5}
          maxWidth={1}
        />
      </div>

      <p className="text-xs text-slate-500 text-center">
        Gambar tanda tangan Anda di atas
      </p>

      <div className="flex gap-2 justify-end">
        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
        >
          <Trash2 className="w-4 h-4" /> Hapus
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50"
        >
          Batal
        </button>
        <button
          onClick={handleSave}
          disabled={isEmpty}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-hijauMuda text-white hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" /> Simpan
        </button>
      </div>
    </div>
  );
}
