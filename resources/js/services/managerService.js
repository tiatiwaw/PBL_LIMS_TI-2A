import { serviceMethods } from "./baseService";

export const managerService = {
    orders: {
        all: serviceMethods("/manager/orders"),
        find: (id) => serviceMethods(`/manager/orders/${id}`),
    },

    reportValidations: {
        all: serviceMethods("/manager/report-validations"),
        find: (id) => serviceMethods(`/manager/report-validations/${id}`),
        update: serviceMethods("/manager/report-validations"),
    },

    brands: serviceMethods("/manager/tools/brands"),

    equipments: serviceMethods("/manager/tools/equipments"),

    parameters: serviceMethods("/manager/tests/parameters"),

    methods: serviceMethods("/manager/tests/methods"),

    units: serviceMethods("/manager/tests/units"),

    references: serviceMethods("/manager/tests/references"),

    categories: serviceMethods("/manager/tests/categories"),

    grades: serviceMethods("/manager/materials/grades"),

    suppliers: serviceMethods("/manager/materials/suppliers"),

    reagents: serviceMethods("/manager/materials/reagents"),

    users: serviceMethods("/manager/users"),

    analysts: serviceMethods("/manager/analysts"),
};
