import { toast } from "sonner";

// biome-ignore lint/suspicious/noExplicitAny: toast error type is any
export const showError = (error: any, title = "Something went wrong") => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Please try again later.";
  toast.error(title, { description: message });
};

export const showSuccess = (title: string, description?: string) => {
  toast.success(title, { description });
};
