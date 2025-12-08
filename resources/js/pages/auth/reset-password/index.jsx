import { useState, useEffect } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import InputField from "@/components/shared/form/input-field";
import AuthLayout from "@/components/layouts/auth-layout";
import { Spinner } from "@/components/ui/spinner";
import { useResetPassword } from "@/hooks/usePassword";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        token: "",
        password: "",
        passwordConfirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const { resetPassword, loading } = useResetPassword();
    const searchParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        const token = searchParams.get("token");
        const email = searchParams.get("email");

        if (token && email) {
            setFormData((prev) => ({
                ...prev,
                token: decodeURIComponent(token),
                email: decodeURIComponent(email),
            }));
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.passwordConfirmation) {
            newErrors.passwordConfirmation = "Confirm password is required";
        } else if (formData.password !== formData.passwordConfirmation) {
            newErrors.passwordConfirmation = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await resetPassword(formData);
            setSuccess(true);
            setTimeout(() => {
                window.location.href = "/auth/login";
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (e) => {
        if (
            e.key === "Enter" &&
            formData.email &&
            formData.password &&
            formData.passwordConfirmation &&
            !loading
        ) {
            handleSubmit(e);
        }
    };

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    if (success) {
        return (
            <AuthLayout title="Password Reset" subtitle="Success">
                <Head title="Reset Password Success" />
                <div className="w-full max-w-md text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <Lock className="w-8 h-8 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Password Berhasil Direset!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Password Anda telah berhasil diubah. Anda akan diarahkan
                        ke halaman login dalam beberapa detik.
                    </p>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout title="Reset Password" subtitle="Create a new password">
            <Head title="Reset Password" />
            <div className="w-full max-w-md">
                <div className="mb-8">
                    <h1 className="text-4xl text-primary-hijauTua font-extrabold mb-2">
                        Reset Password
                    </h1>
                    <p className="text-gray-600">
                        Enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Hidden Email Field */}
                    <input type="hidden" name="email" value={formData.email} />

                    <InputField
                        id="password"
                        type={showPassword ? "text" : "password"}
                        label="New Password"
                        icon={Lock}
                        placeholder="Enter your new password"
                        value={formData.password}
                        onChange={(e) =>
                            updateFormData("password", e.target.value)
                        }
                        onKeyPress={handleKeyDown}
                        showRightIconButton
                        onRightIconClick={() => setShowPassword(!showPassword)}
                        rightIcon={
                            showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )
                        }
                        error={errors.password}
                    />

                    <InputField
                        id="passwordConfirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm Password"
                        icon={Lock}
                        placeholder="Confirm your new password"
                        value={formData.passwordConfirmation}
                        onChange={(e) =>
                            updateFormData(
                                "passwordConfirmation",
                                e.target.value
                            )
                        }
                        onKeyPress={handleKeyDown}
                        showRightIconButton
                        onRightIconClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        rightIcon={
                            showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )
                        }
                        error={errors.passwordConfirmation}
                    />

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-700 font-semibold mb-2">
                            Password Requirements:
                        </p>
                        <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                            <li>Minimal 8 karakter</li>
                            <li>Gunakan kombinasi huruf, angka, dan simbol</li>
                        </ul>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-primary-hijauMuda hover:bg-primary-hijauMuda/90 text-white font-semibold rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-md"
                        disabled={
                            loading ||
                            !formData.password ||
                            !formData.passwordConfirmation
                        }
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Spinner />
                                Resetting...
                            </span>
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
