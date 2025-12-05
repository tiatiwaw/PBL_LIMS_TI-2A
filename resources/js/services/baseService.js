import api from "@/lib/api";

class ServiceError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = "ServiceError";
        this.status = status;
        this.data = data;
    }
}

const handleServiceError = (
    error,
    defaultMessage = "Service error occurred"
) => {
    console.error("Service error:", error);

    const message =
        error.response?.data?.message || error.message || defaultMessage;

    const status = error.response?.status;
    const data = error.response?.data;

    throw new ServiceError(message, status, data);
};

const createFormData = (data) => {
    if (data instanceof FormData) {
        return data;
    }

    const formData = new FormData();

    const appendToFormData = (obj, parentKey = "") => {
        if (!obj) return;
        Object.entries(obj).forEach(([key, value]) => {
            if (value === undefined) return;
            const fullKey = parentKey ? `${parentKey}[${key}]` : key;

            if (value instanceof File) {
                formData.append(fullKey, value);
            } else if (value instanceof Blob) {
                formData.append(fullKey, value);
            } else if (value instanceof Date) {
                formData.append(fullKey, value.toISOString().split("T")[0]);
            } else if (typeof value === "object") {
                appendToFormData(value, fullKey);
            } else {
                formData.append(fullKey, value);
            }
        });
    };

    appendToFormData(data);
    return formData;
};

export const serviceMethods = (
    baseUrl,
    { useFormData = false, axiosConfig = {} } = {}
) => {
    const handleRequest = async (method, url, data, config, defaultMessage) => {
        try {
            let requestData = data;
            let requestMethod = method;
            const finalConfig = { ...axiosConfig, ...config };

            if (
                useFormData &&
                data &&
                ["post", "put", "patch"].includes(method)
            ) {
                requestData = createFormData(data);

                if (method === "put" || method === "patch") {
                    requestMethod = "post";
                    requestData.append("_method", method.toUpperCase());
                }

                finalConfig.headers = {
                    ...finalConfig.headers,
                    "Content-Type": "multipart/form-data",
                };
            }

            const response = await api.request({
                url,
                method: requestMethod,
                data: requestData,
                ...finalConfig,
            });

            return response.data;
        } catch (error) {
            handleServiceError(error, defaultMessage);
        }
    };

    return {
        getAll: (params = {}, config = {}) =>
            handleRequest(
                "get",
                baseUrl,
                null,
                { params, ...config },
                "Failed to fetch resources"
            ),

        getById: (id, config = {}) =>
            handleRequest(
                "get",
                `${baseUrl}/${id}`,
                null,
                config,
                "Failed to fetch resource"
            ),

        getRelated: (id, endpoint, params = {}, config = {}) =>
            handleRequest(
                "get",
                `${baseUrl}/${id}/${endpoint}`,
                null,
                { params, ...config },
                `Failed to fetch ${endpoint}`
            ),

        postRelated: (id, data, endpoint, params = {}, config = {}) =>
            handleRequest(
                "post",
                `${baseUrl}/${id}/${endpoint}`,
                data,
                { params, ...config },
                `Failed to create ${endpoint}`
            ),

        updateRelated: (id, data, endpoint, params = {}, config = {}) =>
            handleRequest(
                "put",
                `${baseUrl}/${id}/${endpoint}`,
                data,
                { params, ...config },
                `Failed to update ${endpoint}`
            ),

        create: (data, config = {}) =>
            handleRequest(
                "post",
                baseUrl,
                data,
                config,
                "Failed to create resource"
            ),

        update: (id, data, config = {}) =>
            handleRequest(
                "put",
                `${baseUrl}/${id}`,
                data,
                config,
                "Failed to update resource"
            ),

        patch: (id, data, config = {}) =>
            handleRequest(
                "patch",
                `${baseUrl}/${id}`,
                data,
                config,
                "Failed to patch resource"
            ),

        delete: (id, config = {}) =>
            handleRequest(
                "delete",
                `${baseUrl}/${id}`,
                null,
                config,
                "Failed to delete resource"
            ),

        upload: (file, additionalData = {}, config = {}) => {
            const formData = new FormData();
            formData.append("file", file);
            Object.entries(additionalData).forEach(
                ([k, v]) => v != null && formData.append(k, v)
            );
            return handleRequest(
                "post",
                `${baseUrl}/upload`,
                formData,
                config,
                "File upload failed"
            );
        },

        uploadMultiple: (files, additionalData = {}, config = {}) => {
            const formData = new FormData();
            files.forEach((f, i) => formData.append(`files[${i}]`, f));
            Object.entries(additionalData).forEach(
                ([k, v]) => v != null && formData.append(k, v)
            );
            return handleRequest(
                "post",
                `${baseUrl}/upload-multiple`,
                formData,
                config,
                "Multiple file upload failed"
            );
        },
    };
};
