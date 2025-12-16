import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getSampleStatusVariant } from "@/utils/statusUtils";
import { FileText } from "lucide-react";

export const getSampleColumns = ({ onShowDetail }) => [
  {
    accessorKey: "name",
    header: "Nama Sampel",
  },
  {
    accessorKey: "sample_categories.name",
    header: "Kategori Sampel",
    cell: ({ row }) => {
      const category = row.sample_categories.name || "-";
      return <span>{category}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.status;
      return (
        <Badge className="capitalize" variant={getSampleStatusVariant(value) || "outline"}>
          {value}
        </Badge>
      );
    },
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => (
      <TooltipProvider>
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onShowDetail(row)}
              >
                <FileText size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Detail Sampel</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    ),
  },
];
