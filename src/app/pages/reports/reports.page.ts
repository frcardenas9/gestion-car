import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { VehicleModel } from '@models/index';
import { ExpenseService, RefuelService, VehiclesService } from '@services/index';

import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexLegend,
  ApexTooltip,
  ApexMarkers,
  ApexPlotOptions,
  ApexResponsive,
  ApexGrid,
  ApexAnnotations,
  ApexStates,
  ApexTheme,
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis | ApexYAxis[];
  title?: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  dataLabels?: ApexDataLabels;
  stroke?: ApexStroke;
  fill?: ApexFill;
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  markers?: ApexMarkers;
  plotOptions?: ApexPlotOptions;
  responsive?: ApexResponsive[];
  grid?: ApexGrid;
  annotations?: ApexAnnotations;
  states?: ApexStates;
  theme?: ApexTheme;
  colors?: string[];
  labels?: any;
};

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: false,
  providers: [DecimalPipe],
})
export class ReportsPage {
  public chartLineOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: '',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      labels: {
        formatter: (val: number) => {
          return this.decimalPipe.transform(val, '1.0-0');
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => {
          return this.decimalPipe.transform(val, '1.0-0');
        },
      },
    },
  };
  public chartColumnOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => {
        return this.decimalPipe.transform(val, '1.0-0');
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },
    xaxis: {
      categories: [],
      position: 'top',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: (val) => {
          return this.decimalPipe.transform(val, '1.0-0');
        },
      },
    },
    title: {
      text: '',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444',
      },
    },
  };
  public vehicles: VehicleModel[] = [];
  public vehicleSelected: number;
  public allRefuelExpenses: number;
  public periodSelected: string = 'all';
  public isLoading: boolean = false;

  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly refuelService: RefuelService,
    private readonly decimalPipe: DecimalPipe,
    private readonly expenseService: ExpenseService,
  ) {}

  async ionViewWillEnter() {
    this.vehicles = await this.vehiclesService.getAll();
    this.vehicleSelected = -1;
    await this.getData();
  }

  public async onClickVehicle(vehicleId: number) {
    this.vehicleSelected = vehicleId;
    await this.getData();
  }

  public handlePeriodChange(
    event: Event & {
      detail?: { value: string };
    },
  ) {
    this.periodSelected = event?.detail?.value || 'all';
    this.getAllRefuelExpenses();
  }

  private async getData() {
    this.isLoading = true;
    await this.getAllRefuelExpenses();
    await this.getRefuelChartData();
    this.isLoading = false;
  }

  private async getAllRefuelExpenses() {
    this.allRefuelExpenses = 0;

    const allRefuels = await this.refuelService.getAll();
    const allExpenses = await this.expenseService.getAll();

    const totalExpenses: any[] = [...allRefuels, ...allExpenses];

    const now = new Date();

    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const previousDate = new Date(currentYear, now.getMonth() - 1, 1);
    const previousMonth = previousDate.getMonth() + 1;
    const previousYear = previousDate.getFullYear();

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    const filteredRefuels = totalExpenses.filter((item) => {
      const vehicleMatch = this.vehicleSelected === -1 || item.vehicleId === this.vehicleSelected;

      const [yearStr, monthStr, dayStr] = item.date.toString().split('-');

      const year = Number(yearStr);
      const month = Number(monthStr);
      const day = Number(dayStr);

      const expenseDate = new Date(year, month - 1, day);

      let periodMatch = true;

      switch (this.periodSelected) {
        case 'current':
          periodMatch = month === currentMonth && year === currentYear;
          break;

        case 'previous':
          periodMatch = month === previousMonth && year === previousYear;
          break;

        case 'three-months':
          periodMatch = expenseDate >= threeMonthsAgo && expenseDate <= now;
          break;

        case 'six-months':
          periodMatch = expenseDate >= sixMonthsAgo && expenseDate <= now;
          break;

        case 'last-year':
          periodMatch = expenseDate >= oneYearAgo && expenseDate <= now;
          break;

        case 'all':
        default:
          periodMatch = true;
      }

      return vehicleMatch && periodMatch;
    });

    this.allRefuelExpenses = filteredRefuels.reduce((acc, item) => acc + item.total, 0);
  }

  private async getRefuelChartData() {
    const allRefuels = await this.refuelService.getAll();

    const allExpenses = await this.expenseService.getAll();

    const totalExpenses: any[] = [...allRefuels, ...allExpenses];

    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const now = new Date();

    const months: any = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

      months.push({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        label: monthNames[date.getMonth()],
        total: 0,
      });
    }

    totalExpenses.forEach((item) => {
      if (this.vehicleSelected !== -1 && item.vehicleId !== this.vehicleSelected) {
        return;
      }

      const [yearStr, monthStr] = item.date.toString().split('-');

      const year = Number(yearStr);
      const month = Number(monthStr);

      const monthData = months.find((m: any) => m.year === year && m.month === month);

      if (monthData) {
        monthData.total += item.total;
      }
    });

    const filteredMonths = months.filter((m: any) => m.total > 0);

    const categories = filteredMonths.map((m: any) => m.label);
    const series = [
      {
        name: 'Total',
        data: filteredMonths.map((m: any) => m.total),
      },
    ];

    this.chartLineOptions.series = series;
    this.chartLineOptions.xaxis = {
      categories,
    };

    this.chartColumnOptions.series = series;
    this.chartColumnOptions.xaxis = {
      categories,
    };
  }
}
