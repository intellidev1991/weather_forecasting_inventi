import { toast } from 'react-toastify';

const toastConfigs = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true
};

const tools = {
  toast: {
    success: (text, position = toast.POSITION.BOTTOM_RIGHT) => {
      toast.success(text, { ...toastConfigs, position });
    },
    warning: (text, position = toast.POSITION.BOTTOM_RIGHT) => {
      toast.warn(text, { ...toastConfigs, position });
    },
    error: (text, position = toast.POSITION.BOTTOM_RIGHT) => {
      toast.error(text, { ...toastConfigs, position });
    },
    info: (text, position = toast.POSITION.BOTTOM_RIGHT) => {
      toast.info(text, { ...toastConfigs, position });
    },
    dismissAll: () => {
      toast.dismiss();
    },
    positions: toast.POSITION
  },
  formatDate: date => {
    let d = date.getDate() + '';
    let m = date.getMonth() + 1 + '';
    let y = date.getFullYear() + '';
    if (d.length < 2) d = '0' + d;
    if (m.length < 2) m = '0' + m;
    return d + '/' + m + '/' + y;
  },
  formatTime: date => {
    let h = date.getHours() + '';
    let m = date.getMinutes() + '';
    let s = date.getSeconds() + '';
    if (h.length < 2) h = '0' + h;
    if (m.length < 2) m = '0' + m;
    if (s.length < 2) s = '0' + s;
    return h + ':' + m + ':' + s;
  }
};
export { tools };
