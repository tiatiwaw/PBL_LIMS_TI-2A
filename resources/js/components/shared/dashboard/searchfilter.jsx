import React from 'react';
import { Search, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DataTableToolbar({ showSearch, showFilter }) {
    return (
        <div className="flex items-center justify-between mb-4">
            {/* Bagian Search Bar (ditampilkan jika showSearch true) */}
            {showSearch && (
                <div className="relative w-full max-w-sm">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-hijauMuda" 
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
            )}

            {/* Bagian Filter (ditampilkan jika showFilter true) */}
            {showFilter && (
                <Button variant="outline" className="flex items-center gap-2 border-gray-300 text-gray-600">
                    <ListFilter size={16} />
                    Filters
                </Button>
            )}
        </div>
    );
}
