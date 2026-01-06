import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  addSkill,
  removeSkill,
  updateSkill,
} from "@/features/users/utils/skills";
import type { UseFormSetValue, FieldErrors } from "react-hook-form";
import type { UserFormData } from "@/schemas/userSchema";

interface SkillsInputProps {
  initialSkills?: string[];
  setValue: UseFormSetValue<UserFormData>;
  errors?: FieldErrors<UserFormData>["skills"];
}

export function SkillsInput({
  initialSkills = [""],
  setValue,
  errors,
}: SkillsInputProps) {
  const [skills, setSkills] = useState<string[]>(
    initialSkills.length > 0 ? initialSkills : [""]
  );

  useEffect(() => {
    setValue("skills", skills);
  }, [skills, setValue]);

  const handleAddSkill = () => {
    setSkills(addSkill(skills));
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(removeSkill(skills, index));
  };

  const handleUpdateSkill = (index: number, value: string) => {
    setSkills(updateSkill(skills, index, value));
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>
        Skills <span className="text-destructive">*</span>
      </Label>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          {skills.map((skill, index) => (
            <div
              key={`skill-${index}-${skill}`}
              className="flex gap-2 animate-in fade-in-0 slide-in-from-top-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Input
                type="text"
                value={skill}
                onChange={(e) => handleUpdateSkill(index, e.target.value)}
                placeholder="Enter skill"
                className="flex-1"
              />
              {skills.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveSkill(index)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  title="Remove skill"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAddSkill}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </Button>
      </div>
      {errors?.root && (
        <p className="text-sm text-destructive animate-in fade-in-0">
          {errors.root.message}
        </p>
      )}
      {Array.isArray(errors) &&
        errors.map((error, index) => {
          if (error) {
            return (
              <p
                key={index}
                className="text-sm text-destructive animate-in fade-in-0"
              >
                {error.message}
              </p>
            );
          }
          return null;
        })}
    </div>
  );
}
