import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrandsComponent, VehicleTypesComponent } from '@components/index';
import { ModalController, PopoverController } from '@ionic/angular';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.scss'],
  imports: [IonIcon],
})
export class OptionsListComponent {
  constructor(
    private readonly router: Router,
    private readonly popoverController: PopoverController,
    private readonly modalController: ModalController,
  ) {}

  public onClickAddAlert() {
    this.router.navigate(['/tabs/alerts']);
    this.popoverController.dismiss();
  }

  public async onClickOpenBrandsModal() {
    const modal = await this.modalController.create({
      component: BrandsComponent,
    });

    modal.present();
  }

  public async onClickOpenVehicleTypesModal() {
    const modal = await this.modalController.create({
      component: VehicleTypesComponent,
    });

    modal.present();
  }
}
