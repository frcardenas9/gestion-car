import { SweetAlertIcon } from 'sweetalert2';

export interface AlertModel {
  title?: string;
  text?: string;
  icon?: SweetAlertIcon;
  confirmButtonText?: string;
}
