import { Component, input, OnInit, output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { DividerComponent } from '@components/divider/divider.component';
import { VehicleModel } from '@models/index';
import { AlertService, VehiclesService } from '@services/index';
import { CreateEditVehicleFormComponent } from '@components/index';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vehicles-card',
  templateUrl: './vehicles-card.component.html',
  styleUrls: ['./vehicles-card.component.scss'],
  imports: [IonIcon, IonButton, DividerComponent],
})
export class VehiclesCardComponent {
  public vehicle = input.required<VehicleModel>();
  public getAllVehicles = output<boolean>();

  constructor(
    private readonly alertService: AlertService,
    private readonly vehiclesService: VehiclesService,
    private readonly modalController: ModalController,
  ) {}

  public onClickDeleteVehicle() {
    this.alertService
      .confirm({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminarlo!',
        cancelButtonText: 'Cancelar',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await this.vehiclesService.delete(this.vehicle().id);

          this.getAllVehicles.emit(true);

          this.alertService.show({
            title: '¡Eliminado!',
            text: 'El registro ha sido eliminado.',
            icon: 'success',
          });
        }
      });
  }

  public async onClickEditVehicle() {
    const modal = await this.modalController.create({
      component: CreateEditVehicleFormComponent,
      componentProps: {
        vehicle: this.vehicle(),
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getAllVehicles.emit(true);
    }
  }
}
