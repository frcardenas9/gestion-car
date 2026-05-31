import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-upcoming-alerts-card',
  templateUrl: './upcoming-alerts-card.component.html',
  styleUrls: ['./upcoming-alerts-card.component.scss'],
  imports: [IonButton, IonIcon],
})
export class UpcomingAlertsCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
