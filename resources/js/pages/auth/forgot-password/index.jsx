import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import InputField from "@/components/shared/form/input-field";
import AuthLayout from "@/components/layouts/auth-layout";
import { Spinner } from "@/components/ui/spinner";
import { useForgotPassword } from "@/hooks/usePassword";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { forgotPassword, loading } = useForgotPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        try {
            await forgotPassword(email);
            setSubmitted(true);
            setEmail("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && email && !loading) {
            handleSubmit(e);
        }
    };

    return (
        <AuthLayout title="Reset Password" subtitle="Recover your account">
            <Head title="Forgot Password" />
            <div className="w-full max-w-md">
                {!submitted ? (
                    <>
                        <div className="mb-8">
                            <h1 className="text-4xl text-primary-hijauTua font-extrabold mb-2">
                                Forgot Password
                            </h1>
                            <p className="text-gray-600">
                                Enter your email address and we'll send you a
                                link to reset your password.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <InputField
                                id="email"
                                label="Email Address"
                                icon={Mail}
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyDown}
                            />

                            <Button
                                type="submit"
                                className="w-full h-12 bg-primary-hijauMuda hover:bg-primary-hijauMuda/90 text-white font-semibold rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-md"
                                disabled={loading || !email}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Spinner />
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                                Remember your password?{" "}
                                <Link
                                    href="/auth/login"
                                    className="text-primary-hijauTua font-bold hover:underline transition-colors"
                                >
                                    Back to Login
                                </Link>
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="mb-4 flex justify-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <Mail className="w-8 h-8 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Email Terkirim!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Kami telah mengirimkan link reset password ke email
                            Anda. Silahkan cek email Anda dalam beberapa menit.
                        </p>
                        <p className="text-sm text-gray-500 mb-6">
                            Link akan expire dalam 60 menit.
                        </p>
                        <Button
                            onClick={() => {
                                setSubmitted(false);
                                setEmail("");
                            }}
                            className="w-full h-12 bg-primary-hijauMuda hover:bg-primary-hijauMuda/90 text-white font-semibold rounded-lg"
                        >
                            Kirim Email Lagi
                        </Button>
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}
