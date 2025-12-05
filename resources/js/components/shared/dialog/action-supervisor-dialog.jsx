import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ActionSupervisorDialog({
    action,
    open,
    onOpenChange,
    data,
    title,
    description,
    onConfirm,
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [rejectReason, setRejectReason] = useState("");

    const handleConfirm = () => {
        setIsLoading(true);
        if (onConfirm) onConfirm(data);
        onOpenChange(false);
        setIsLoading(false);
    };

    const handleRejectConfirm = () => {
        // Validasi catatan tidak boleh kosong
        if (!rejectReason.trim()) {
            toast.warning("Catatan penolakan harus diisi");
            return;
        }

        setIsLoading(true);
        // Tambahkan catatan ke data
        const rejectionData = {
            ...data,
            reason: rejectReason,
        };
        if (onConfirm) onConfirm(rejectionData);

        // Reset state
        setRejectReason("");
        onOpenChange(false);
        setIsLoading(false);
    };

    if (action === "confirm") {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="text-primary-hijauTua">
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Batal
                        </Button>
                        <Button
                            className="bg-primary-hijauTua hover:bg-primary-hijauTua/85"
                            onClick={handleConfirm}
                            disabled={isLoading}
                        >
                            Konfirmasi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    } else if (action === "Warning") {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                        >
                            Batal
                        </Button>
                        <Button
                            className="bg-yellow-500 hover:bg-yellow-600"
                            onClick={handleConfirm}
                            disabled={isLoading}
                        >
                            Lanjutkan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    } else if (action === "reject") {
        return (
            <AlertDialog open={open} onOpenChange={onOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="reject-reason"
                                className="text-sm font-medium"
                            >
                                Alasan Penolakan{" "}
                                <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="reject-reason"
                                placeholder="Masukkan alasan penolakan order..."
                                value={rejectReason}
                                onChange={(e) =>
                                    setRejectReason(e.target.value)
                                }
                                disabled={isLoading}
                                className="min-h-[120px] resize-none"
                            />
                            <p className="text-xs text-slate-500">
                                Catatan minimal diperlukan untuk menjelaskan
                                alasan penolakan kepada klien
                            </p>
                        </div>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                setRejectReason("");
                                onOpenChange(false);
                            }}
                        >
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isLoading}
                            onClick={handleRejectConfirm}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isLoading ? "Memproses..." : "Tolak Order"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }
}
