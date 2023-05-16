import { toast } from "react-toastify";

export default function toastMessage(message, type) {
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
