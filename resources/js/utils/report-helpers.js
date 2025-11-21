export const extractYears = (...dateSources) => {
    const years = new Set();

    dateSources.flat().forEach(dateString => {
        if (dateString) {
            years.add(new Date(dateString).getFullYear());
        }
    });

    return Array.from(years).sort((a, b) => b - a);
};

/**
 * Create date filter function
 */
export const createDateFilter = (selectedYear, selectedMonth) => {
    const isAllYears = selectedYear === 'all';
    const isAllMonths = selectedMonth === 'all';

    return (dateString) => {
        if (!dateString) return false;

        const date = new Date(dateString);
        const matchYear = isAllYears || date.getFullYear() === parseInt(selectedYear);
        const matchMonth = isAllMonths || date.getMonth() === parseInt(selectedMonth);

        return matchYear && matchMonth;
    };
};

/**
 * Convert object to chart data format
 */
export const objectToChartData = (obj, limit = null) => {
    let data = Object.entries(obj)
        .map(([name, value]) => ({ name, value }))
        .filter(item => item.value > 0)
        .sort((a, b) => b.value - a.value);

    return limit ? data.slice(0, limit) : data;
};

/**
 * Safe access to nested object properties
 */
export const safeGet = (obj, path, defaultValue = null) => {
    const keys = path.split('.');
    let result = obj;

    for (const key of keys) {
        if (result?.[key] === undefined) return defaultValue;
        result = result[key];
    }

    return result ?? defaultValue;
};