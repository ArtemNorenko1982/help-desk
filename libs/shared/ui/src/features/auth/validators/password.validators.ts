export function validatePassword(password: string): boolean {
  // Password must be at least 8 characters long
  if (password.length < 8) {
    return false;
  }

  // Password must contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Password must contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Password must contain at least one digit
  if (!/[0-9]/.test(password)) {
    return false;
  }

  // Password must contain at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return false;
  }

  return true;
}
