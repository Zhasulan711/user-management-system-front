import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { UserFormHeader } from "@/features/users/components/UserFormHeader";
import { FormField } from "@/features/users/components/FormField";
import { SkillsInput } from "@/features/users/components/SkillsInput";
import { FormActions } from "@/features/users/components/FormActions";
import { getFormDefaultValues } from "@/features/users/utils/form";
import { filterEmptySkills } from "@/features/users/utils/skills";
import { userFormSchema, type UserFormData } from "@/schemas/userSchema";
import type { User } from "@/features/users/types";

interface UserFormProps {
  user?: User;
  onSubmit: (data: UserFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function UserForm({
  user,
  onSubmit,
  onCancel,
  isLoading = false,
}: UserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: getFormDefaultValues(user),
  });

  const handleFormSubmit = async (data: UserFormData) => {
    const filteredSkills = filterEmptySkills(data.skills);
    await onSubmit({ ...data, skills: filteredSkills });
  };

  return (
    <Card className="border-2 shadow-lg">
      <UserFormHeader isEditMode={Boolean(user)} />
      <CardContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                id="firstName"
              label="First Name"
              register={register("firstName")}
              error={errors.firstName}
              placeholder="Enter first name"
              required
            />
            <FormField
                id="lastName"
              label="Last Name"
              register={register("lastName")}
              error={errors.lastName}
              placeholder="Enter last name"
              required
            />
          </div>

          <FormField
              id="email"
            label="Email"
              type="email"
            register={register("email")}
            error={errors.email}
              placeholder="example@email.com"
            required
          />

          <SkillsInput
            initialSkills={user?.skills}
            setValue={setValue}
            errors={errors.skills}
          />

          <FormActions
            isLoading={isLoading}
            isEditMode={Boolean(user)}
            onCancel={onCancel}
          />
        </form>
      </CardContent>
    </Card>
  );
}
