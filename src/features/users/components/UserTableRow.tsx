import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { UserActions } from "@/features/users/components/UserActions";
import type { User } from "@/features/users/types";

interface UserTableRowProps {
  user: User;
  index: number;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
  formatDate: (dateString: string) => string;
}

export function UserTableRow({
  user,
  index,
  onDelete,
  isDeleting,
  formatDate,
}: UserTableRowProps) {
  const { id, firstName, lastName, email, skills, registrationDate } = user;

  return (
    <TableRow
      key={id}
      className="group transition-all hover:bg-muted/50 animate-in fade-in-0 slide-in-from-left-4"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <TableCell className="font-medium">{id}</TableCell>
      <TableCell className="font-medium">{firstName}</TableCell>
      <TableCell className="font-medium">{lastName}</TableCell>
      <TableCell className="text-muted-foreground">{email}</TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill: string, skillIndex: number) => (
            <Badge
              key={skillIndex}
              variant="secondary"
              className="animate-in fade-in-0 zoom-in-95"
              style={{ animationDelay: `${skillIndex * 30}ms` }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(registrationDate)}
      </TableCell>
      <TableCell>
        <UserActions
          id={id}
          firstName={firstName}
          lastName={lastName}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      </TableCell>
    </TableRow>
  );
}
