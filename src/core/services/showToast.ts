import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showErrorToast = (text: string): void => {
  toast.error(text, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3500,
  });
};

export const showSuccessToast = (text: string): void => {
  toast.success(text, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3500,
  });
};

export default ToastContainer;
