import { Injectable } from '@angular/core';
import { BrandsService, ExpenseTypesService, VehicleTypesService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class SeedDatabaseService {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly vehicleTypesService: VehicleTypesService,
    private readonly expenseTypesService: ExpenseTypesService,
  ) {}

  public seedDatabase() {
    this.brandsService.seedBrands();
    this.vehicleTypesService.seedVehicleTypes();
    this.expenseTypesService.seedExpenseTypes();
  }
}
