import { Injectable } from '@angular/core';
import { AlertModel, AlertsCounter } from '@models/index';
import { BaseRepository } from '@services/base-repository/base-repository';
import { DatabaseService } from '@services/index';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertStatusEnum } from '@enums/index';

@Injectable({
  providedIn: 'root',
})
export class AlertsService extends BaseRepository<AlertModel> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'alerts');
  }

  public async checkAndrequestPermissions() {
    const permissions = await LocalNotifications.checkPermissions();

    if (permissions.display === 'granted') {
      return true;
    }

    const result = await LocalNotifications.requestPermissions();

    return result.display === 'granted';
  }

  public async scheduleNotification(alert: AlertModel) {
    const notificationDate = new Date(alert.date);

    notificationDate.setHours(8);
    notificationDate.setMinutes(0);
    notificationDate.setSeconds(0);

    await LocalNotifications.schedule({
      notifications: [
        {
          id: alert?.id,
          title: 'Notificación de GestionCar',
          body: alert?.name,
          schedule: {
            at: notificationDate,
          },
        },
      ],
    });
  }

  public async cancelNotification(id: number) {
    await LocalNotifications.cancel({
      notifications: [{ id }],
    });
  }

  public mapAlerts(alerts: AlertModel[]) {
    alerts = alerts.map((alert) => {
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

    alerts.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return alerts;
  }

  public getAlertsCounter(alerts: AlertModel[]) {
    const alertsCounter: AlertsCounter = {
      total: alerts.length,
      distant: 0,
      upcoming: 0,
      urgent: 0,
      expired: 0,
    };

    alerts.forEach((alert) => {
      const status = this.getAlertStatus(new Date(alert.date));
      switch (status) {
        case AlertStatusEnum.Distant:
          alertsCounter.distant++;
          break;
        case AlertStatusEnum.Upcoming:
          alertsCounter.upcoming++;
          break;
        case AlertStatusEnum.Urgent:
          alertsCounter.urgent++;
          break;
        case AlertStatusEnum.Expired:
          alertsCounter.expired++;
          break;
      }
    });

    return alertsCounter;
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

    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const targetOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const differenceMs = targetOnly.getTime() - todayOnly.getTime();

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
