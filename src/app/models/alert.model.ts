import { SweetAlertIcon } from 'sweetalert2';

export interface SweetAlertModel {
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
}
