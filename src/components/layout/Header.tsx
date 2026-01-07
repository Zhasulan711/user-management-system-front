import { Link } from "react-router-dom";
import { Users } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 container mx-auto px-4 py-4">
      <Link to="/users" className="flex items-center gap-2">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">
          User Management System
        </h1>
      </Link>
    </header>
  );
}
