import { Component } from '@angular/core';
import { TabModel } from '@models/tabs.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {
  public tabs: TabModel[] = [
    {
      label: 'Inicio',
      icon: 'assets/icons/home.svg',
      route: '/tabs/home',
      tab: 'home',
      isRoute: true,
    },
    {
      label: 'Vehículos',
      icon: 'assets/icons/car-side.svg',
      route: '/tabs/vehicles',
      tab: 'vehicles',
      isRoute: true,
    },
    {
      label: 'Agregar',
      icon: 'assets/icons/plus.svg',
      isRoute: false,
    },
    {
      label: 'Reportes',
      icon: 'assets/icons/data-report.svg',
      route: '/tabs/reports',
      tab: 'reports',
      isRoute: true,
    },
    {
      label: 'Alertas',
      icon: 'assets/icons/bell.svg',
      route: '/tabs/alerts',
      tab: 'alerts',
      isRoute: true,
    },
  ];

  public onClickAdd() {
    console.log('Agregar nuevo registro');
  }
}
