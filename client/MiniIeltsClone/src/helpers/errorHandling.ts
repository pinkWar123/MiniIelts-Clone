import { isAxiosError } from "axios";

export function handleAxiosError(error: unknown) {
  // Check if the error is an Axios error
  if (!isAxiosError(error)) {
    return "An unknown error occurred.";
  }

  // Extract the response data
  const response = error.response;

  // Check for the status code and return appropriate messages
  if (response?.status === 400) {
    // Handle validation error
    const validationErrors = response.data.errors;
    const errorMessages = Object.keys(validationErrors)
      .map((field) => `${field}: ${validationErrors[field].join(", ")}`)
      .join("; ");
    return `Validation error: ${errorMessages}`;
  } else {
    // Handle other errors
    const errorMessage = response?.data.title || "An error occurred";
    return `${errorMessage}`;
  }
}
