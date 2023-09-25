import { toast } from 'react-toastify';

export const notify = text =>
  toast.error(text, {
    autoClose: 3000,
  });
