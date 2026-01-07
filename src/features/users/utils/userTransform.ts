import type { User } from "@/features/users/types";
import { AVAILABLE_SKILLS } from "../constants";

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

const generateRandomSkills = (): string[] => {
  const shuffled = [...AVAILABLE_SKILLS].sort(() => Math.random() - 0.5);
  const count = Math.floor(Math.random() * 4) + 2;
  return shuffled.slice(0, count);
};

export const transformRandomUserToUser = (
  randomUser: RandomUser,
  id: number
): User => {
  return {
    id,
    firstName: randomUser.name.first,
    lastName: randomUser.name.last,
    email: randomUser.email,
    skills: generateRandomSkills(),
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
    skills: generateRandomSkills(),
    registrationDate: new Date().toISOString().split("T")[0],
  };
};

export type { RandomUser };
