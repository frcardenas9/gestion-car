import { Component, OnInit } from '@angular/core';
import { ExpensesSummary } from '@models/index';
import { DashboardService, ExpenseService, RefuelService } from '@services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  public summary: ExpensesSummary;
  public currentMonth: string;
  public firstMonth: string;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly refuelService: RefuelService,
    private readonly expenseService: ExpenseService,
  ) {}

  async ngOnInit() {
    this.summary = await this.dashboardService.getSummary();

    this.getCurrentMonth();
    this.getFirstMonth();
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

    const date = new Date(oldestDate);

    const month = new Intl.DateTimeFormat('es-CO', {
      month: 'long',
    }).format(date);

    const year = date.getFullYear();

    this.firstMonth = month.charAt(0).toUpperCase() + month.slice(1) + ' ' + year;
  }
}
