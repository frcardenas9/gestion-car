import { Injectable } from '@angular/core';
import { VehicleTypeModel } from '@models/index';
import { BaseRepository } from '@services/base-repository/base-repository';
import { DatabaseService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class VehicleTypesService extends BaseRepository<VehicleTypeModel> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'vehicleTypes');
  }

  async seedVehicleTypes() {
    await this.databaseService.seedVehicleTypes();
  }
}
