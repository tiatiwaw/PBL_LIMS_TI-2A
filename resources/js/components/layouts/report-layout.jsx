import React from 'react';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import Loading from '@/components/ui/loading';
import { ReportHeader } from '@/components/shared/admin/report-filters';
import { EmptyState } from '@/components/shared/admin/report-components';

export default function ReportLayout({
    isLoading,
    error,
    hasData,

    title,
    subtitle,
    headerTitle,

    filterProps,

    kpiContent,
    chartContent,

    emptyStateIcon,
    emptyStateTitle,
    emptyStateDescription
}) {
    if (isLoading) {
        return (
            <DashboardLayout>
                <Loading />
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl border border-red-200">
                    <p className="font-bold">Gagal memuat data.</p>
                    <p className="text-sm">{error?.message || 'Terjadi kesalahan server'}</p>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title={title} header={headerTitle || title}>
            <div className="space-y-6">
                <ReportHeader
                    title={title}
                    subtitle={subtitle}
                    {...filterProps}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {kpiContent}
                </div>

                {hasData ? (
                    <div className="space-y-6">
                        {chartContent}
                    </div>
                ) : (
                    <EmptyState
                        icon={emptyStateIcon}
                        title={emptyStateTitle || "Data Tidak Ditemukan"}
                        description={emptyStateDescription || "Belum ada data yang terekam pada periode ini."}
                        onReset={filterProps.onClearFilters}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}