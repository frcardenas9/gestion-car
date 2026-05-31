import { Component } from '@angular/core';
import { OptionsListComponent } from '@components/index';
import { PopoverController } from '@ionic/angular';
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
  public isOpenPopover: boolean = false;

  constructor(private readonly popoverController: PopoverController) {}

  public async onClickAddRecord(event: Event) {
    console.log('Agregar nuevo registro');

    const popover = await this.popoverController.create({
      component: OptionsListComponent,
      event,
      mode: 'ios',
      side: 'top',
    });

    await popover.present();

    this.isOpenPopover = true;

    await popover.onDidDismiss();

    this.isOpenPopover = false;
  }
}
