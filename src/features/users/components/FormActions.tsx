import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isLoading: boolean;
  isEditMode: boolean;
  onCancel: () => void;
}

export function FormActions({
  isLoading,
  isEditMode,
  onCancel,
}: FormActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <Button
        type="submit"
        disabled={isLoading}
        className="flex-1 sm:flex-none"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isEditMode ? "Save Changes" : "Create User"}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
        className="flex-1 sm:flex-none"
      >
        Cancel
      </Button>
    </div>
  );
}
