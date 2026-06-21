import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { AlertModel } from '@models/index';

@Component({
  selector: 'app-upcoming-alerts-card',
  templateUrl: './upcoming-alerts-card.component.html',
  styleUrls: ['./upcoming-alerts-card.component.scss'],
  imports: [IonButton, IonIcon],
})
export class UpcomingAlertsCardComponent {
  public alerts = input.required<AlertModel[]>();

  constructor(private readonly router: Router) {}

  public onClickOpenAlerts() {
    this.router.navigate(['/tabs/alerts']);
  }
}
