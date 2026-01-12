export type PasswordStrength = "weak" | "medium" | "strong";

interface PasswordStrengthResult {
  strength: PasswordStrength;
  label: string;
  colorClass: string;
}

export const usePasswordStrength = (password: string): PasswordStrengthResult => {
  const hasMinLength = password.length >= 8;
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasMinLength) {
    return {
      strength: "weak",
      label: "Weak",
      colorClass: "text-strength-weak",
    };
  }

  if (hasNumbers && hasSpecialChars) {
    return {
      strength: "strong",
      label: "Strong",
      colorClass: "text-strength-strong",
    };
  }

  if (hasNumbers || hasSpecialChars) {
    return {
      strength: "medium",
      label: "Medium",
      colorClass: "text-strength-medium",
    };
  }

  return {
    strength: "weak",
    label: "Weak",
    colorClass: "text-strength-weak",
  };
};
