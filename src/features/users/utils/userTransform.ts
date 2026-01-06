import type { User } from "@/features/users/types";

interface RandomUser {
  name: {
    first: string;
    last: string;
  };
  email: string;
  id: {
    value: string;
  };
}

export const transformRandomUserToUser = (
  randomUser: RandomUser,
  id: number
): User => {
  return {
    id,
    firstName: randomUser.name.first,
    lastName: randomUser.name.last,
    email: randomUser.email,
    skills: ["JavaScript", "React", "TypeScript"],
    registrationDate: new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
  };
};

export const transformRandomUserToUserWithDate = (
  randomUser: RandomUser,
  id: number
): User => {
  return {
    id,
    firstName: randomUser.name.first,
    lastName: randomUser.name.last,
    email: randomUser.email,
    skills: ["JavaScript", "React", "TypeScript"],
    registrationDate: new Date().toISOString().split("T")[0],
  };
};

export type { RandomUser };

