import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortButton } from "@/features/users/components/SortButton";
import type { SortField, SortOrder } from "@/features/users/types";

interface UsersTableHeaderProps {
  sortField?: SortField;
  sortOrder?: SortOrder;
  onSort?: (field: SortField) => void;
}

export function UsersTableHeader({
  sortField,
  sortOrder,
  onSort,
}: UsersTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="bg-muted/50">
        <TableHead>
          <SortButton
            field="id"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          >
            ID
          </SortButton>
        </TableHead>
        <TableHead>
          <SortButton
            field="firstName"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          >
            First Name
          </SortButton>
        </TableHead>
        <TableHead>
          <SortButton
            field="lastName"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          >
            Last Name
          </SortButton>
        </TableHead>
        <TableHead>
          <SortButton
            field="email"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          >
            Email
          </SortButton>
        </TableHead>
        <TableHead className="font-semibold">Skills</TableHead>
        <TableHead>
          <SortButton
            field="registrationDate"
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          >
            Registration Date
          </SortButton>
        </TableHead>
        <TableHead className="text-center font-semibold">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
