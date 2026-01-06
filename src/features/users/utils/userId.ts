import { getUsersFromStorage } from "./storage";

const MAX_API_ID = 30;

export const generateNextUserId = (): number => {
  const storedUsers = getUsersFromStorage();
  const maxStoredId =
    storedUsers.length > 0 ? Math.max(...storedUsers.map((u) => u.id)) : 0;
  const maxId = Math.max(MAX_API_ID, maxStoredId);
  return maxId + 1;
};
