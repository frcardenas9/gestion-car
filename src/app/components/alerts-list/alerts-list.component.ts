import { Component, input, output } from '@angular/core';
import { AlertsCardComponent } from '@components/alerts-card/alerts-card.component';
import { AlertModel } from '@models/index';

@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss'],
  imports: [AlertsCardComponent],
})
export class AlertsListComponent {
  public alerts = input.required<AlertModel[]>();
  public getAllAlerts = output<boolean>();

  public getAllAlertsHandler(event: boolean) {
    this.getAllAlerts.emit(event);
  }
}
