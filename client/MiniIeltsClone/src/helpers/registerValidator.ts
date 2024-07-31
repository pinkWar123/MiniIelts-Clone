export const validatePassword = (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Password is required"));
  }
  if (value.length < 12) {
    return Promise.reject(
      new Error("Password must be at least 12 characters long")
    );
  }
  if (!/[a-z]/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one lowercase letter")
    );
  }
  if (!/[A-Z]/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one uppercase letter")
    );
  }
  if (!/[0-9]/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one digit")
    );
  }
  if (!/[^a-zA-Z0-9]/.test(value)) {
    return Promise.reject(
      new Error("Password must contain at least one non-alphanumeric character")
    );
  }
  return Promise.resolve();
};
