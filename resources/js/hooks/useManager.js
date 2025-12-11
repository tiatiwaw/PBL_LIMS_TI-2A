import { useCrud } from "./useCrud";
import { useGetById } from "./useGetById";
import { managerService } from "@/services/managerService";

export const useBrands = () =>
    useCrud(managerService.brands, "brands", "Merek", { only: ["getAll"] });

export const useCategories = () =>
    useCrud(managerService.categories, "categories", "Kategori", {
        only: ["getAll"],
    });

export const useDashboard = () =>
    useCrud(managerService.dashboard, "dashboard", "Dashboard", {
        only: ["getAll"],
    });

export const useEquipments = () =>
    useCrud(managerService.equipments, "equipments", "Alat", {
        only: ["getAll"],
    });

export const useGrades = () =>
    useCrud(managerService.grades, "grades", "Tingkat", { only: ["getAll"] });

export const useMethods = () =>
    useCrud(managerService.methods, "methods", "Metode", { only: ["getAll"] });

export const useOrders = () =>
    useCrud(managerService.orders.all, "orders", "Pesanan", {
        only: ["getAll"],
    });

export const useParameters = () =>
    useCrud(managerService.parameters, "parameters", "Parameter", {
        only: ["getAll"],
    });

export const useReagents = () =>
    useCrud(managerService.reagents, "reagents", "Reagen", {
        only: ["getAll"],
    });

export const useReferences = () =>
    useCrud(managerService.references, "references", "Referensi", {
        only: ["getAll"],
    });

export const useSuppliers = () =>
    useCrud(managerService.suppliers, "suppliers", "Supplier", {
        only: ["getAll"],
    });

export const useUnits = () =>
    useCrud(managerService.units, "units", "Satuan", { only: ["getAll"] });

export const useEmployees = () =>
    useCrud(managerService.employees, "employees", "Karyawan", {
        only: ["getAll"],
    });

export const useAnalysts = () =>
    useCrud(managerService.analysts, "analysts", "Analyst", {
        only: ["getAll"],
    });

export const useReportValidations = () =>
    useCrud(
        managerService.reportValidations.all,
        "report-validations",
        "Report Validations",
        {
            only: ["getAll"],
        }
    );

export const useReportValidationDetail = (id) =>
    useGetById(managerService.reportValidations.all, "report-validations", id);

export const useUpdateReportValidation = () =>
    useCrud(
        managerService.reportValidations.update,
        "report-validations",
        "Update Validation"
    );

export const useOrder = (id) =>
    useGetById(managerService.orders.all, "orders", id);

export const useManagerOrder = (id) =>
    useGetById(
        managerService.reportValidations.all,
        "manager-report-validations",
        id
    );

export const useOrderReports = (filters = {}) =>
    useCrud(managerService.reports_orders, "order-reports", "Laporan Pesanan", {
        only: ["getAll"],
        query: filters,
    });


export const useInventoryReports = (query = {}) =>
    useCrud(
        managerService.reports_inventory,
        "inventory-reports",
        "Laporan Inventaris",
        {
            only: ["getAll"],
            query,
        }
    );

export const useTransactionReports = (query = {}) =>
    useCrud(
        managerService.reports_transactions,
        "transaction-reports",
        "Laporan Transaksi",
        {
            only: ["getAll"],
            query,
        }
    );

export const useManager = () => ({
    useBrands,
    useCategories,
    useDashboard,
    useEquipments,
    useGrades,
    useMethods,
    useOrders,
    useParameters,
    useReagents,
    useReferences,
    useSuppliers,
    useUnits,
    useUsers,
    useAnalysts,

    useReportValidations,
    useReportValidationDetail,
    useUpdateReportValidation,

    useOrder,
    useManagerOrder,
});
