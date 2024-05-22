export function validateEmail(email: string) {
  if (email.length > 255) return false;
  // Regular expression for basic email validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password: string) {
  if (password.length < 6) {
    return false;
  }

  return true;
}
