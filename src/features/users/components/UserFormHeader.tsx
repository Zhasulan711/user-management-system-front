import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface UserFormHeaderProps {
  isEditMode: boolean;
}

export function UserFormHeader({ isEditMode }: UserFormHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="text-2xl">
        {isEditMode ? "Edit User" : "Add User"}
      </CardTitle>
      <CardDescription>
        {isEditMode
          ? "Update user information"
          : "Fill in the form to create a new user"}
      </CardDescription>
    </CardHeader>
  );
}
