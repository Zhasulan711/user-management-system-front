import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyUsersState() {
  return (
    <Card className="border-2">
      <CardContent className="py-12">
        <div className="flex flex-col items-center justify-center text-center animate-in fade-in-0">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Pencil className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No users found</h3>
          <p className="text-sm text-muted-foreground">
            Start by adding your first user
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
