import { Component } from '@angular/core';
import { AlertModel, ExpenseModel, ExpensesSummary, RefuelModel } from '@models/index';
import { AlertsService, DashboardService, ExpenseService, RefuelService, VehiclesService } from '@services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  public summary: ExpensesSummary;
  public currentMonth: string;
  public firstMonth: string;
  public alerts: AlertModel[] = [];
  public recentMovements: (RefuelModel | ExpenseModel)[] = [];

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly refuelService: RefuelService,
    private readonly expenseService: ExpenseService,
    private readonly alertsService: AlertsService,
    private readonly vehiclesService: VehiclesService,
  ) {}

  async ionViewWillEnter() {
    this.summary = await this.dashboardService.getSummary();

    this.getCurrentMonth();
    this.getFirstMonth();
    this.getAllAlerts();
    this.getRecentMovements();
  }

  private getCurrentMonth() {
    const date = new Date();

    const month = new Intl.DateTimeFormat('es-CO', {
      month: 'long',
    }).format(date);

    const year = date.getFullYear();

    this.currentMonth = month.charAt(0).toUpperCase() + month.slice(1) + ' ' + year;
  }

  private async getFirstMonth() {
    const refuels = await this.refuelService.getAll();

    const expenses = await this.expenseService.getAll();

    const dates = [...refuels.map((r) => r.date), ...expenses.map((e) => e.date)];

    const oldestDate = dates.sort()[0];

    if (!oldestDate) {
      this.firstMonth = 'el inicio';
      return;
    }

    const date = new Date(oldestDate);

    const month = new Intl.DateTimeFormat('es-CO', {
      month: 'long',
    }).format(date);

    const year = date.getFullYear();

    this.firstMonth = month.charAt(0).toUpperCase() + month.slice(1) + ' ' + year;
  }

  private async getAllAlerts() {
    this.alerts = await this.alertsService.getAll();
    this.alerts = this.alertsService
      .mapAlerts(this.alerts)
      ?.filter((alert) => alert?.status === 'Próxima' || alert?.status === 'Urgente');
  }

  private async getRecentMovements() {
    const [vehicles, refuels, expenses] = await Promise.all([
      this.vehiclesService.getAll(),
      this.refuelService.getAll(),
      this.expenseService.getAll(),
    ]);

    const vehiclesMap = new Map(vehicles.map((vehicle) => [vehicle.id, vehicle.name]));

    const recentRefuels: RefuelModel[] = refuels
      .map((refuel) => ({
        ...refuel,
        vehicleName: vehiclesMap.get(refuel.vehicleId) ?? 'Vehículo desconocido',
        dateFormatted: this.dateFormatted(refuel?.date),
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 2);

    const recentExpenses: ExpenseModel[] = expenses
      .map((expense) => ({
        ...expense,
        vehicleName: vehiclesMap.get(expense.vehicleId) ?? 'Vehículo desconocido',
        dateFormatted: this.dateFormatted(expense?.date),
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 2);

    let all = [...recentRefuels, ...recentExpenses];
    all = all.sort((a, b) => b.date.localeCompare(a.date));

    this.recentMovements = all;
  }

  public dateFormatted(dateOriginal: string) {
    const [year, month, day] = dateOriginal.split('-').map(Number);

    const date = new Date(year, month - 1, day);

    const dateFormatted = date.toLocaleDateString('es-CO');

    return dateFormatted;
  }
}
