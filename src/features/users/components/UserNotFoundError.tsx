import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UserNotFoundErrorProps {
  message?: string;
}

export function UserNotFoundError({
  message = "User not found",
}: UserNotFoundErrorProps) {
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
      <Alert
        variant="destructive"
        className="animate-in fade-in-0 slide-in-from-top-4"
      >
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}
