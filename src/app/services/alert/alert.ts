import { Injectable } from '@angular/core';
import { AlertModel } from '@models/index';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public show(alert: AlertModel) {
    Swal.fire({
      title: alert?.title ?? '',
      text: alert?.text ?? '',
      icon: alert?.icon ?? 'success',
      confirmButtonText: alert?.confirmButtonText ?? 'Aceptar',
      heightAuto: false,
    });
  }

  public confirm(alert: AlertModel) {
    return Swal.fire({
      title: alert?.title ?? '',
      text: alert?.text ?? '',
      icon: alert?.icon ?? 'warning',
      showCancelButton: alert?.showCancelButton ?? false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: alert?.confirmButtonText ?? 'Sí, eliminarlo!',
      cancelButtonText: alert?.cancelButtonText ?? 'Cancelar',
      heightAuto: false,
    });
  }
}
