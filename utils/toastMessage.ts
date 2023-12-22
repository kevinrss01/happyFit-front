import { toast } from "react-toastify";

type ToastType = "success" | "error" | "info" | "warn";

export default function toastMessage(message: string, type: ToastType) {
  toast[type](message, {
    position: "top-right",
    autoClose: type === "error" ? 5000 : 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
