import { Component, input, OnInit } from '@angular/core';
import { VehiclesCardComponent } from '@components/vehicles-card/vehicles-card.component';
import { VehicleModel } from '@models/index';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
  imports: [VehiclesCardComponent],
})
export class VehiclesListComponent {
  public vehicles = input.required<VehicleModel[]>();
}
