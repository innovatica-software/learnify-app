import { message } from "antd";

// Method for displaying a success toast
export const showSuccessToast = (messageContent) => {
  message.success(messageContent);
};

// Method for displaying a warning toast
export const showWarningToast = (messageContent) => {
  message.warning(messageContent);
};

// Method for displaying an error toast
export const showErrorToast = (messageContent) => {
  message.error(messageContent);
};
