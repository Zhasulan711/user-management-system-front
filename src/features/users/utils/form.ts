import type { User } from "@/features/users/types";
import type { UserFormData } from "@/schemas/userSchema";

export function getFormDefaultValues(user?: User): UserFormData {
  if (user) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      skills: user.skills.length > 0 ? user.skills : [""],
    };
  }

  return {
    firstName: "",
    lastName: "",
    email: "",
    skills: [""],
  };
}
