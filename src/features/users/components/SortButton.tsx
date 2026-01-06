import { Button } from "@/components/ui/button";
import { getSortIcon } from "@/features/users/utils/sort";
import type { SortField, SortOrder } from "@/features/users/types";

interface SortButtonProps {
  field: SortField;
  sortField?: SortField;
  sortOrder?: SortOrder;
  onSort?: (field: SortField) => void;
  children: React.ReactNode;
}

export function SortButton({
  field,
  sortField,
  sortOrder = "asc",
  onSort,
  children,
}: SortButtonProps) {
  if (!onSort) return <>{children}</>;

  const isActive = sortField === field;
  const Icon = getSortIcon(isActive, sortOrder);

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-semibold hover:bg-transparent"
      onClick={() => onSort(field)}
    >
      <span className="flex items-center gap-1">
        {children}
        <Icon className="h-3 w-3 ml-1" />
      </span>
    </Button>
  );
}
