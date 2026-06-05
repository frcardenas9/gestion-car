import { Component, OnInit } from '@angular/core';
import { CreateEditAlertFormComponent } from '@components/create-edit-alert-form/create-edit-alert-form.component';
import { AlertStatusEnum } from '@enums/index';
import { ModalController } from '@ionic/angular';
import { AlertModel, AlertsCounter } from '@models/index';
import { AlertsService } from '@services/index';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
  standalone: false,
})
export class AlertsPage {
  public alerts: AlertModel[] = [];
  public alertsCounter: AlertsCounter = {};
  public isOpenCounter: boolean = false;
  public permissionEnabled: boolean;

  constructor(
    private readonly modalController: ModalController,
    private readonly alertsService: AlertsService,
  ) {}

  async ionViewWillEnter() {
    this.getAllAlerts();
    this.permissionEnabled = await this.alertsService.checkAndrequestPermissions();
  }

  public async getAllAlerts() {
    this.alerts = await this.alertsService.getAll();

    this.alerts = this.alertsService.mapAlerts(this.alerts);

    this.alertsCounter = this.alertsService.getAlertsCounter(this.alerts);

    console.table(this.alerts);
  }

  public async onClickCreateAlert() {
    const modal = await this.modalController.create({
      component: CreateEditAlertFormComponent,
      componentProps: {
        permissionEnabled: this.permissionEnabled,
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getAllAlerts();
    }
  }

  public onClickOpenCounter() {
    this.isOpenCounter = !this.isOpenCounter;
  }

  public getAllAlertsHandler(event: boolean) {
    if (event) {
      this.getAllAlerts();
    }
  }
}
