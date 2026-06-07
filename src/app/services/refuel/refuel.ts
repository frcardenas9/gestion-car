import { Injectable } from '@angular/core';
import { RefuelModel } from '@models/index';
import { BaseRepository } from '@services/base-repository/base-repository';
import { DatabaseService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class RefuelService extends BaseRepository<RefuelModel> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'refuels');
  }

  public deleteRefuelsByVehicleId(vehicleId: number) {
    return this.table.where('vehicleId').equals(vehicleId).delete();
  }
}
