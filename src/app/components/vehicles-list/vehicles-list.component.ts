import { Component, input, OnInit, output } from '@angular/core';
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
  public getAllVehicles = output<boolean>();

  public getAllVehiclesHandler(event: boolean) {
    this.getAllVehicles.emit(event);
  }
}
