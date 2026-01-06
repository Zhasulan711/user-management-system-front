import type { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        {...register}
        placeholder={placeholder}
        className={error ? "border-destructive" : ""}
      />
      {error && (
        <p className="text-sm text-destructive animate-in fade-in-0">
          {error.message}
        </p>
      )}
    </div>
  );
}
