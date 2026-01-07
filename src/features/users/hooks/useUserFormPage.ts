import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import type { UserFormData } from "@/schemas/userSchema";
import {
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/features/users/api/users-api";

export function useUserFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const {
    data: user,
    isLoading: loading,
    error: loadError,
  } = useGetUserByIdQuery(id ? Number(id) : 0, {
    skip: !isEditMode || !id,
  });

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const submitting = isCreating || isUpdating;

  const handleSubmit = async (data: UserFormData) => {
    try {
      if (isEditMode && id) {
        await updateUser({ id: Number(id), data }).unwrap();
        toast.success("User successfully updated");
      } else {
        await createUser(data).unwrap();
        toast.success("User successfully created");
      }
      navigate("/users");
    } catch (err: any) {
      const errorMessage = err?.data || err?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  const handleCancel = () => {
    navigate("/users");
  };

  const errorMessage = loadError
    ? "error" in loadError
      ? loadError.error
      : "Error loading user"
    : null;

  return {
    user,
    loading,
    loadError,
    errorMessage,
    isEditMode,
    submitting,
    handleSubmit,
    handleCancel,
  };
}
