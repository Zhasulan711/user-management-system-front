import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "@/features/users/api/users-api";
import type { User, SortField, SortOrder } from "@/features/users/types";

const USERS_PER_PAGE = 10;

export function useUsersList() {
  const { data: allUsers = [], isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [sortField, setSortField] = useState<SortField>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const [page, setPage] = useState(1);

  const sortUsers = (
    users: User[],
    field: SortField,
    order: SortOrder
  ): User[] => {
    return [...users].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (field) {
        case "id":
          aValue = a.id;
          bValue = b.id;
          break;
        case "firstName":
          aValue = a.firstName.toLowerCase();
          bValue = b.firstName.toLowerCase();
          break;
        case "lastName":
          aValue = a.lastName.toLowerCase();
          bValue = b.lastName.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "registrationDate":
          aValue = new Date(a.registrationDate).getTime();
          bValue = new Date(b.registrationDate).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const sortedUsers = useMemo(
    () => sortUsers(allUsers, sortField, sortOrder),
    [allUsers, sortField, sortOrder]
  );

  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE);
  const startIndex = (page - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User successfully deleted");

      const remainingUsers = sortedUsers.filter((u) => u.id !== id);
      const newTotalPages = Math.ceil(remainingUsers.length / USERS_PER_PAGE);
      if (page > newTotalPages && newTotalPages > 0) {
        setPage(newTotalPages);
      }
    } catch (err) {
      toast.error("Error deleting user");
      console.error(err);
    }
  };

  return {
    allUsers,
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
  };
}
