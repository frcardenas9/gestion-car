import { Injectable } from '@angular/core';
import { VehicleModel } from '@models/index';
import { BaseRepository } from '@services/base-repository/base-repository';
import { DatabaseService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService extends BaseRepository<VehicleModel> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'vehicles');
  }
}
