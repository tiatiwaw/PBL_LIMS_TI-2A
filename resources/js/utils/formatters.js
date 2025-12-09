export const formatDate = (dateString, options = {}) => {
    if (!dateString) return '-';

    const defaultOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };

    try {
        return new Date(dateString).toLocaleDateString('id-ID', {
            ...defaultOptions,
            ...options
        });
    } catch (error) {
        console.error('Date formatting error:', error);
        return '-';
    }
};

export const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
};

export const formatCompactNumber = (number) => {
    return new Intl.NumberFormat('id-ID', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1
    }).format(number);
};
