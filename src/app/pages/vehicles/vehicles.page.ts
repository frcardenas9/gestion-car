import { Component, OnInit } from '@angular/core';
import { CreateVehicleFormComponent } from '@components/index';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: false,
})
export class VehiclesPage implements OnInit {
  public vehicles: any[] = [];

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {}

  public async onClickCreateVehicle() {
    const modal = await this.modalController.create({
      component: CreateVehicleFormComponent,
    });

    modal.present();
  }
}
