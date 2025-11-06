import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const statusVariantMap = {
  Done: "success",
  "In Progress": "warning",
};

export const getSampleColumns = ({ onShowDetail }) => [
  {
    accessorKey: "name",
    header: "Nama Sampel",
  },
  {
    accessorKey: "sample_categories.name",
    header: "Kategori Sampel",
    cell: ({ row }) => {
      const category = row.sample_categories?.name || "-";
      return <span>{category}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.original.status;
      return (
        <Badge variant={statusVariantMap[value] || "outline"}>
          {value}
        </Badge>
      );
    },
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onShowDetail(row.original)}
        >
          <FileText />
        </Button>
      </div>
    ),
  },
];
