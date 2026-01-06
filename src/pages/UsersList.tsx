import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UsersTable } from "@/features/users/components/UsersTable";
import { Pagination } from "@/features/users/components/Pagination";
import { LoadingSpinner } from "@/features/users/components/LoadingSpinner";
import { useUsersList } from "@/features/users/hooks/useUsersList";

export function UsersList() {
  const {
    paginatedUsers,
    sortedUsers,
    isLoading,
    error,
    isDeleting,
    sortField,
    sortOrder,
    handleSort,
    page,
    setPage,
    totalPages,
    startIndex,
    endIndex,
    handleDelete,
  } = useUsersList();

  if (isLoading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  const errorMessage = error
    ? "error" in error
      ? error.error
      : "Error loading users"
    : null;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in-0 slide-in-from-top-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            User Management System
          </h1>
        </div>
        <Button
          asChild
          size="lg"
          className="animate-in fade-in-0 slide-in-from-right-4"
        >
          <Link to="/users/new">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Link>
        </Button>
      </div>

      {errorMessage && (
        <Alert
          variant="destructive"
          className="animate-in fade-in-0 slide-in-from-top-4"
        >
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="animate-in fade-in-0 slide-in-from-bottom-4 delay-200">
        <UsersTable
          users={paginatedUsers}
          onDelete={handleDelete}
          isDeleting={isDeleting}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in-0 slide-in-from-bottom-4 delay-300">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(endIndex, sortedUsers.length)} of{" "}
          {sortedUsers.length} users
        </div>
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
      </div>
    </div>
  );
}
