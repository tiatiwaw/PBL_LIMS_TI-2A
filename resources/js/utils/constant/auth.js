export const ROLE_REDIRECT_MAP = {
    admin: "/admin",
    analyst: "/analyst",
    manager: "/manager",
    staff: "/staff/manage-clients",
    supervisor: "/supervisor",
    client: "/client",
};

export const DEFAULT_REDIRECT_PATH = "/";

export const ERROR_MESSAGES = {
    SESSION_EXPIRED: "Session telah berakhir. Silahkan login kembali.",
    LOGIN_FAILED: "Login gagal. Silahkan periksa email dan password Anda.",
    LOGOUT_FAILED: "Logout gagal",
    SUCCESSFUL_LOGIN: "Berhasil login!",
    SUCCESSFUL_LOGOUT: "Berhasil logout!",
    NETWORK_ERROR: "Gagal terhubung ke server. Periksa koneksi internet Anda.",
    SERVER_ERROR: "Terjadi kesalahan server. Silahkan coba lagi nanti.",
    VALIDATION_ERROR: "Validasi data gagal. Silahkan periksa kembali input Anda.",
};