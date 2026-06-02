import { Component, OnInit } from '@angular/core';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { DividerComponent } from '@components/divider/divider.component';

@Component({
  selector: 'app-alerts-card',
  templateUrl: './alerts-card.component.html',
  styleUrls: ['./alerts-card.component.scss'],
  imports: [IonButton, IonIcon, DividerComponent],
})
export class AlertsCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
