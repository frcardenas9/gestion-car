import { Component } from '@angular/core';
import { BrandsService, VehicleTypesService } from '@services/index';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly vehicleTypesService: VehicleTypesService,
  ) {
    this.brandsService.seedBrands();
    this.vehicleTypesService.seedVehicleTypes();
  }
}
