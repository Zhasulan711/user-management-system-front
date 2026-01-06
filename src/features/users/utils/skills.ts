export function addSkill(skills: string[]): string[] {
  return [...skills, ""];
}

export function removeSkill(skills: string[], index: number): string[] {
  if (skills.length > 1) {
    return skills.filter((_, i) => i !== index);
  }
  return skills;
}

export function updateSkill(
  skills: string[],
  index: number,
  value: string
): string[] {
  const newSkills = [...skills];
  newSkills[index] = value;
  return newSkills;
}

export function filterEmptySkills(skills: string[]): string[] {
  return skills.filter((skill) => skill.trim() !== "");
}
