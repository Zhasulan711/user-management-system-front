import { useNavigate, useParams, Link } from "react-router-dom";
import type { UserFormData } from "@/schemas/userSchema";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/features/users/components/UserForm";
import { UserNotFoundError } from "@/features/users/components/UserNotFoundError";
import { LoadingSpinner } from "@/features/users/components/LoadingSpinner";
import {
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/features/users/api/users-api";

export function UserFormPage() {
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

  if (loading) {
    return <LoadingSpinner message="Loading data..." />;
  }

  const errorMessage = loadError
    ? "error" in loadError
      ? loadError.error
      : "Error loading user"
    : null;

  if (loadError && isEditMode) {
    return <UserNotFoundError message={errorMessage || "User not found"} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Button
        variant="ghost"
        asChild
        className="mb-6 animate-in fade-in-0 slide-in-from-left-4"
      >
        <Link to="/users">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to users list
        </Link>
      </Button>

      <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
        <UserForm
          user={user || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={submitting}
        />
      </div>
    </div>
  );
}
