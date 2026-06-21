import { Component, OnInit } from '@angular/core';
import { EmptyStateCardComponent, CreateEditVehicleTypeFormComponent } from '@components/index';
import { ModalController, PopoverController } from '@ionic/angular';
import {
  IonContent,
  IonLabel,
  IonButton,
  IonIcon,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
} from '@ionic/angular/standalone';
import { VehicleTypeModel } from '@models/index';
import { SweetAlertService, VehicleTypesService } from '@services/index';

@Component({
  selector: 'app-vehicle-types',
  templateUrl: './vehicle-types.component.html',
  styleUrls: ['./vehicle-types.component.scss'],
  imports: [
    IonButtons,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonContent,
    IonLabel,
    IonButton,
    IonIcon,
    EmptyStateCardComponent,
  ],
})
export class VehicleTypesComponent implements OnInit {
  public vehicleTypes: VehicleTypeModel[] = [];

  constructor(
    private readonly vehicleTypesService: VehicleTypesService,
    private readonly modalController: ModalController,
    private readonly sweetAlertService: SweetAlertService,
    private readonly popoverController: PopoverController,
  ) {}

  ngOnInit() {
    this.getAll();
    this.popoverController.dismiss();
  }

  public async getAll() {
    this.vehicleTypes = await this.vehicleTypesService.getAll();
    console.table(this.vehicleTypes);
  }

  public async onClickCreate() {
    const modal = await this.modalController.create({
      component: CreateEditVehicleTypeFormComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getAll();
    }
  }

  public onClickDelete(vehicleType: VehicleTypeModel) {
    this.sweetAlertService
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
          await this.vehicleTypesService.delete(vehicleType.id);

          this.getAll();

          this.sweetAlertService.show({
            title: '¡Eliminado!',
            text: 'El registro ha sido eliminado.',
            icon: 'success',
          });
        }
      });
  }

  public async onClickEdit(vehicleType: VehicleTypeModel) {
    const modal = await this.modalController.create({
      component: CreateEditVehicleTypeFormComponent,
      componentProps: {
        vehicleType,
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getAll();
    }
  }

  public onClickBackButton() {
    this.modalController.dismiss();
  }
}
