import { Component, input, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { DividerComponent } from '@components/divider/divider.component';
import { VehicleModel } from '@models/index';

@Component({
  selector: 'app-vehicles-card',
  templateUrl: './vehicles-card.component.html',
  styleUrls: ['./vehicles-card.component.scss'],
  imports: [IonIcon, IonButton, DividerComponent],
})
export class VehiclesCardComponent {
  public vehicle = input.required<VehicleModel>();
}
