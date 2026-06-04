import { Component } from '@angular/core';
import { CreateEditVehicleFormComponent } from '@components/index';
import { ModalController } from '@ionic/angular';
import { VehicleModel } from '@models/index';
import { VehiclesService } from '@services/index';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: false,
})
export class VehiclesPage {
  public vehicles: VehicleModel[] = [];

  constructor(
    private readonly modalController: ModalController,
    private readonly vehiclesService: VehiclesService,
  ) {}

  ionViewWillEnter() {
    this.getAllVehicles();
  }

  public async getAllVehicles() {
    this.vehicles = await this.vehiclesService.getAll();
    console.table(this.vehicles);
  }

  public async onClickCreateVehicle() {
    const modal = await this.modalController.create({
      component: CreateEditVehicleFormComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getAllVehicles();
    }
  }

  public getAllVehiclesHandler(event: boolean) {
    if (event) {
      this.getAllVehicles();
    }
  }
}
