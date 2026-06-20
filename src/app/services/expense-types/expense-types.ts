import { Injectable } from '@angular/core';
import { ExpenseTypeModel } from '@models/index';
import { BaseRepository } from '@services/base-repository/base-repository';
import { DatabaseService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class ExpenseTypesService extends BaseRepository<ExpenseTypeModel> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'expenseTypes');
  }

  public async seedExpenseTypes() {
    await this.databaseService.seedExpenseTypes();
  }
}
