import { Table, TableBody } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { UsersTableHeader } from "@/features/users/components/UsersTableHeader";
import { UserTableRow } from "@/features/users/components/UserTableRow";
import { EmptyUsersState } from "@/features/users/components/EmptyUsersState";
import { formatDate } from "@/features/users/utils/date";
import type { SortField, SortOrder, User } from "../types";

interface UsersTableProps {
  users: User[];
  onDelete: (id: number) => void;
  isDeleting?: boolean;
  sortField?: SortField;
  sortOrder?: SortOrder;
  onSort?: (field: SortField) => void;
}

export function UsersTable({
  users,
  onDelete,
  isDeleting = false,
  sortField,
  sortOrder = "asc",
  onSort,
}: UsersTableProps) {
  if (users.length === 0) {
    return <EmptyUsersState />;
  }

  return (
    <Card className="border-2 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <UsersTableHeader
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          />
          <TableBody>
            {users.map((user, index) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={index}
                onDelete={onDelete}
                isDeleting={isDeleting}
                formatDate={formatDate}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
