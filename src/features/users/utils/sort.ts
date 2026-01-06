import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { SortOrder } from "@/features/users/types";

export function getSortIcon(
  isActive: boolean,
  sortOrder?: SortOrder
): typeof ArrowUpDown | typeof ArrowUp | typeof ArrowDown {
  if (!isActive) return ArrowUpDown;
  return sortOrder === "asc" ? ArrowUp : ArrowDown;
}
