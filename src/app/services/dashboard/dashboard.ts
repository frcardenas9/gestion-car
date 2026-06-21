import { Injectable } from '@angular/core';
import { ExpensesSummary } from '@models/index';
import { ExpenseService, RefuelService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private readonly refuelService: RefuelService,
    private readonly expenseService: ExpenseService,
  ) {}

  public async getSummary(): Promise<ExpensesSummary> {
    const currentMonth = new Date().toISOString().slice(0, 7);

    const refuels = await this.refuelService.getAll();

    const fuelMonth = refuels.filter((r) => r.date.startsWith(currentMonth)).reduce((sum, r) => sum + r.total, 0);

    const fuelAllTime = refuels.reduce((sum, r) => sum + r.total, 0);

    const expenses = await this.expenseService.getAll();

    const monthExpenses = expenses.filter((e) => e.date.startsWith(currentMonth));

    const maintenanceMonth = monthExpenses
      .filter((e) => e.expenseType === 'Mantenimiento')
      .reduce((sum, e) => sum + e.total, 0);

    const insuranceMonth = monthExpenses
      .filter((e) => e.expenseType === 'Seguros')
      .reduce((sum, e) => sum + e.total, 0);

    const othersMonth = monthExpenses.filter((e) => e.expenseType === 'Otros').reduce((sum, e) => sum + e.total, 0);

    const maintenanceAllTime = expenses
      .filter((e) => e.expenseType === 'Mantenimiento')
      .reduce((sum, e) => sum + e.total, 0);

    const insuranceAllTime = expenses.filter((e) => e.expenseType === 'Seguros').reduce((sum, e) => sum + e.total, 0);

    const othersAllTime = expenses.filter((e) => e.expenseType === 'Otros').reduce((sum, e) => sum + e.total, 0);

    return {
      month: {
        fuel: fuelMonth,
        maintenance: maintenanceMonth,
        insurance: insuranceMonth,
        others: othersMonth,
        total: fuelMonth + maintenanceMonth + insuranceMonth + othersMonth,
      },
      allTime: {
        fuel: fuelAllTime,
        maintenance: maintenanceAllTime,
        insurance: insuranceAllTime,
        others: othersAllTime,
        total: fuelAllTime + maintenanceAllTime + insuranceAllTime + othersAllTime,
      },
    };
  }
}
