import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/features/users/components/UserForm";
import { UserNotFoundError } from "@/features/users/components/UserNotFoundError";
import { LoadingSpinner } from "@/features/users/components/LoadingSpinner";
import { useUserFormPage } from "@/features/users/hooks/useUserFormPage";

export function UserFormPage() {
  const {
    user,
    loading,
    loadError,
    errorMessage,
    isEditMode,
    submitting,
    handleSubmit,
    handleCancel,
  } = useUserFormPage();

  if (loading) {
    return <LoadingSpinner message="Loading data..." />;
  }

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
