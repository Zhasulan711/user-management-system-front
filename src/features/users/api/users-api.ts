import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  User,
  CreateUserDto,
  UpdateUserDto,
} from "@/features/users/types";
import { getUsersFromStorage, saveUsersToStorage } from "../utils/storage";
import {
  transformRandomUserToUser,
  transformRandomUserToUserWithDate,
  type RandomUser,
} from "../utils/userTransform";
import { generateNextUserId } from "../utils/userId";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      queryFn: async () => {
        try {
          const randomUserResponse = await fetch(
            "https://randomuser.me/api/?results=30&nat=us"
          );
          const randomUserData = await randomUserResponse.json();
          const randomUsers: RandomUser[] = randomUserData.results || [];

          const apiUsers: User[] = randomUsers.map((ru, index) =>
            transformRandomUserToUser(ru, index + 1)
          );

          const storedUsers = getUsersFromStorage();
          const apiUserIds = new Set(apiUsers.map((u) => u.id));
          const localOnlyUsers = storedUsers.filter(
            (u) => !apiUserIds.has(u.id)
          );

          const mergedUsers = apiUsers.map((apiUser) => {
            const stored = storedUsers.find((u) => u.id === apiUser.id);
            return stored || apiUser;
          });

          return { data: [...mergedUsers, ...localOnlyUsers] };
        } catch (error) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Failed to fetch users",
            },
          };
        }
      },
      providesTags: ["User"],
    }),

    getUserById: builder.query<User, number>({
      queryFn: async (id) => {
        const storedUsers = getUsersFromStorage();
        const storedUser = storedUsers.find((u) => u.id === id);

        if (storedUser) {
          return { data: storedUser };
        }

        try {
          const randomUserResponse = await fetch(
            `https://randomuser.me/api/?results=1&nat=us`
          );
          const randomUserData = await randomUserResponse.json();
          const randomUser: RandomUser = randomUserData.results?.[0];

          if (randomUser) {
            const user = transformRandomUserToUserWithDate(randomUser, id);
            return { data: user };
          }
        } catch (error) {}

        return {
          error: {
            status: "CUSTOM_ERROR",
            error: "User not found",
          },
        };
      },
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation<User, CreateUserDto>({
      queryFn: async (data) => {
        const storedUsers = getUsersFromStorage();
        const newId = generateNextUserId();

        const newUser: User = {
          id: newId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          skills: data.skills,
          registrationDate: new Date().toISOString().split("T")[0],
        };

        storedUsers.push(newUser);
        saveUsersToStorage(storedUsers);

        return { data: newUser };
      },
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<User, { id: number; data: UpdateUserDto }>({
      queryFn: async ({ id, data }) => {
        const storedUsers = getUsersFromStorage();
        const userIndex = storedUsers.findIndex((u) => u.id === id);

        if (userIndex === -1) {
          const updatedUser: User = {
            id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            skills: data.skills,
            registrationDate: new Date().toISOString().split("T")[0],
          };
          storedUsers.push(updatedUser);
        } else {
          const existingUser = storedUsers[userIndex];
          storedUsers[userIndex] = {
            ...existingUser,
            ...data,
            id,
            registrationDate: existingUser.registrationDate,
          };
        }

        saveUsersToStorage(storedUsers);
        const updatedUser = storedUsers.find((u) => u.id === id)!;

        return { data: updatedUser };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        "User",
      ],
    }),

    deleteUser: builder.mutation<void, number>({
      queryFn: async (id) => {
        const storedUsers = getUsersFromStorage();
        const filteredUsers = storedUsers.filter((u) => u.id !== id);
        saveUsersToStorage(filteredUsers);

        return { data: undefined };
      },
      invalidatesTags: (_result, _error, id) => [{ type: "User", id }, "User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
