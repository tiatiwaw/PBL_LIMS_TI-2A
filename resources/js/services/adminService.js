import { reagents } from "@/data/admin/materials";
import { serviceMethods } from "./baseService";

// useFormData ditambahin buat kalo mau ada proses create, edit, delete aja

export const adminService = {
    dashboard: serviceMethods("/admin", {
        useFormData: false,
    }),

    equipments: serviceMethods("/admin/tools/equipments", {
        useFormData: true,
    }),

    brands: serviceMethods("/admin/tools/brands", {
        useFormData: true,
    }),
    grades: serviceMethods("/admin/materials/grades", {
        useFormData: true,
    }),
    suppliers: serviceMethods("/admin/materials/suppliers", {
        useFormData: true,
    }),
    reagents: serviceMethods("/admin/materials/suppliers", {
        useFormData: true,
    }),

};
