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

  constructor(
    private readonly modalController: ModalController,
    private readonly alertsService: AlertsService,
  ) {}

  ionViewWillEnter() {
    this.getAllAlerts();
  }

  public async getAllAlerts() {
    this.alerts = await this.alertsService.getAll();

    this.alerts = this.alerts.map((alert) => {
      const date = new Date(alert.date);
      const status = this.getAlertStatus(date);
      const remainingDays = this.getRemainingDays(date);
      const styles = this.getStyles(date);

      return {
        ...alert,
        dateFormatted: date.toLocaleDateString(),
        status,
        remainingDays,
        icon: styles.icon,
        borderColor: styles.borderColor,
        backgroundColor: styles.backgroundColor,
        color: styles.color,
      };
    });

    this.alerts.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    this.alertsCounter = {
      total: this.alerts.length,
      distant: 0,
      upcoming: 0,
      urgent: 0,
      expired: 0,
    };

    this.alerts.forEach((alert) => {
      const status = this.getAlertStatus(new Date(alert.date));
      switch (status) {
        case AlertStatusEnum.Distant:
          this.alertsCounter.distant++;
          break;
        case AlertStatusEnum.Upcoming:
          this.alertsCounter.upcoming++;
          break;
        case AlertStatusEnum.Urgent:
          this.alertsCounter.urgent++;
          break;
        case AlertStatusEnum.Expired:
          this.alertsCounter.expired++;
          break;
      }
    });

    console.table(this.alerts);
  }

  public async onClickCreateAlert() {
    const modal = await this.modalController.create({
      component: CreateEditAlertFormComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getAllAlerts();
    }
  }

  public getAlertStatus(date: Date) {
    const remainingDays = this.getRemainingDays(date);

    if (remainingDays < 0) {
      return AlertStatusEnum.Expired;
    }

    if (remainingDays <= 6) {
      return AlertStatusEnum.Urgent;
    }

    if (remainingDays <= 30) {
      return AlertStatusEnum.Upcoming;
    }

    return AlertStatusEnum.Distant;
  }

  public getRemainingDays(date: Date) {
    const today = new Date();

    const differenceMs = date.getTime() - today.getTime();

    return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  }

  public getStyles(date: Date) {
    const status = this.getAlertStatus(date);

    switch (status) {
      case AlertStatusEnum.Distant:
        return {
          icon: 'assets/icons/bell.svg',
          backgroundColor: 'var(--ion-color-secondary)',
          borderColor: 'var(--ion-color-primary)',
          color: 'var(--ion-color-primary)',
        };

      case AlertStatusEnum.Upcoming:
        return {
          icon: 'assets/icons/calendar-plus.svg',
          backgroundColor: 'var(--ion-color-tertiary-tint)',
          borderColor: 'var(--ion-color-tertiary)',
          color: 'var(--ion-color-tertiary)',
        };

      case AlertStatusEnum.Urgent:
        return {
          icon: 'assets/icons/clock-seven.svg',
          backgroundColor: 'var(--ion-color-warning-tint)',
          borderColor: 'var(--ion-color-warning)',
          color: 'var(--ion-color-warning)',
        };

      case AlertStatusEnum.Expired:
        return {
          icon: 'assets/icons/triangle-warning.svg',
          backgroundColor: 'var(--ion-color-danger-tint)',
          borderColor: 'var(--ion-color-danger)',
          color: 'var(--ion-color-danger)',
        };

      default:
        return {
          icon: 'assets/icons/bell.svg',
          backgroundColor: 'var(--ion-color-white)',
          borderColor: 'var(--ion-color-grey)',
          color: 'var(--ion-color-black-tint)',
        };
    }
  }
}
