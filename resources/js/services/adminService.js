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

    parameters: serviceMethods("/admin/tests/parameters", {
        useFormData: true,
    }),

    methods: serviceMethods("/admin/tests/methods", {
        useFormData: true,
    }),
    
    units: serviceMethods("/admin/tests/units", {
        useFormData: true,
    }),
    references: serviceMethods("/admin/tests/references", {
        useFormData: true,
    }),
    categories: serviceMethods("/admin/tests/categories", {
        useFormData: true,
    }),
    sertif: serviceMethods("/admin/tests/sertif", {
        useFormData: true,
    }),
    training: serviceMethods("/admin/tests/training", {
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
