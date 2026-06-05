import { Component, input, output } from '@angular/core';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { DividerComponent } from '@components/divider/divider.component';
import { AlertModel } from '@models/index';
import { AlertsService, SweetAlertService } from '@services/index';

@Component({
  selector: 'app-alerts-card',
  templateUrl: './alerts-card.component.html',
  styleUrls: ['./alerts-card.component.scss'],
  imports: [IonButton, IonIcon, DividerComponent],
})
export class AlertsCardComponent {
  public alert = input.required<AlertModel>();
  public getAllAlerts = output<boolean>();

  constructor(
    private readonly alertsService: AlertsService,
    private readonly sweetAlertService: SweetAlertService,
  ) {}

  public onClickCancelAlert() {
    this.sweetAlertService
      .confirm({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, descartar!',
        cancelButtonText: 'Cancelar',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          this.alertsService.delete(this.alert().id);
          this.alertsService.cancelNotification(this.alert().id);
          this.getAllAlerts.emit(true);

          this.sweetAlertService.show({
            title: '¡Eliminada!',
            text: 'La alerta se ha descartado.',
            icon: 'success',
          });
        }
      });
  }
}
