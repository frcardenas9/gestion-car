import { Injectable } from '@angular/core';
import { ExpenseModel } from '@models/index';
import { BaseRepository } from '@services/base-repository/base-repository';
import { DatabaseService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService extends BaseRepository<ExpenseModel> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'expenses');
  }

  public deleteExpensesByVehicleId(vehicleId: number) {
    return this.table.where('vehicleId').equals(vehicleId).delete();
  }
}
