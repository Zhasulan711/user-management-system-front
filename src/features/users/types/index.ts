export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
  registrationDate: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  skills: string[];
}

export interface UpdateUserDto extends CreateUserDto {}

export type SortField =
  | "id"
  | "firstName"
  | "lastName"
  | "email"
  | "registrationDate";

export type SortOrder = "asc" | "desc";
