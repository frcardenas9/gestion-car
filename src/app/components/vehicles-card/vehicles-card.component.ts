import { Component, input, OnInit, output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { DividerComponent } from '@components/divider/divider.component';
import { RefuelModel, VehicleModel } from '@models/index';
import { RefuelService, SweetAlertService, VehiclesService } from '@services/index';
import { CreateEditVehicleFormComponent, RefuelFormComponent } from '@components/index';
import { ModalController } from '@ionic/angular';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-vehicles-card',
  templateUrl: './vehicles-card.component.html',
  styleUrls: ['./vehicles-card.component.scss'],
  imports: [IonIcon, IonButton, DividerComponent, DatePipe, DecimalPipe],
})
export class VehiclesCardComponent implements OnInit {
  public vehicle = input.required<VehicleModel>();
  public getAllVehicles = output<boolean>();
  public isOpenDetail: boolean = false;
  public isOpenRefuelsByVehicle: boolean = false;
  public isOpenExpensesByVehicle: boolean = false;
  public refuelsByVehicle: RefuelModel[] = [];

  constructor(
    private readonly sweetAlertService: SweetAlertService,
    private readonly vehiclesService: VehiclesService,
    private readonly modalController: ModalController,
    private readonly refuelService: RefuelService,
  ) {}

  ngOnInit() {
    this.getRefuelsByVehicle();
  }

  public onClickDeleteVehicle() {
    this.sweetAlertService
      .confirm({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminarlo!',
        cancelButtonText: 'Cancelar',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await this.refuelService.deleteRefuelsByVehicleId(this.vehicle().id);
          await this.vehiclesService.delete(this.vehicle().id);

          this.getAllVehicles.emit(true);

          this.sweetAlertService.show({
            title: '¡Eliminado!',
            text: 'El registro ha sido eliminado.',
            icon: 'success',
          });
        }
      });
  }

  public async onClickEditVehicle() {
    const modal = await this.modalController.create({
      component: CreateEditVehicleFormComponent,
      componentProps: {
        vehicle: this.vehicle(),
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getAllVehicles.emit(true);
    }
  }

  public async onClickCreateRefuelVehicle() {
    const modal = await this.modalController.create({
      component: RefuelFormComponent,
      componentProps: {
        vehicle: this.vehicle(),
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getRefuelsByVehicle();
    }
  }

  public async onClickEditRefuelVehicle(item: RefuelModel) {
    const modal = await this.modalController.create({
      component: RefuelFormComponent,
      componentProps: {
        vehicle: this.vehicle(),
        refuel: item,
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getRefuelsByVehicle();
    }
  }

  public onClickDeleteRefuelVehicle(item: RefuelModel) {
    this.sweetAlertService
      .confirm({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminarlo!',
        cancelButtonText: 'Cancelar',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await this.refuelService.delete(item.id);

          this.getRefuelsByVehicle();

          this.sweetAlertService.show({
            title: '¡Eliminado!',
            text: 'El registro ha sido eliminado.',
            icon: 'success',
          });
        }
      });
  }

  public getRefuelsByVehicle() {
    this.refuelService.getAll().then((x) => {
      this.refuelsByVehicle = x.filter((y) => y.vehicleId === this.vehicle()?.id);
      this.refuelsByVehicle
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .sort((a, b) => b.odometer - a.odometer);
      this.calculatePerformance(this.refuelsByVehicle);
      console.table(this.refuelsByVehicle);
    });
  }

  public calculatePerformance(records: RefuelModel[]) {
    const sorted = [...records].sort((a, b) => a.odometer - b.odometer);

    for (const r of sorted) {
      r.performance = null;
    }

    let startFullIndex: number | null = null;
    let startOdometer: number | null = null;
    let gallonsSum = 0;

    for (let i = 0; i < sorted.length; i++) {
      const current = sorted[i];

      if (startFullIndex === null) {
        if (current.isFilling) {
          startFullIndex = i;
          startOdometer = current.odometer;
          gallonsSum = 0;
        }
        continue;
      }

      gallonsSum += current.fuelAmount;

      if (!current.isFilling) {
        continue;
      }

      const distance = current.odometer - startOdometer!;
      const performance = gallonsSum > 0 ? distance / gallonsSum : null;

      for (let j = startFullIndex + 1; j <= i; j++) {
        sorted[j].performance = performance;
      }

      startFullIndex = i;
      startOdometer = current.odometer;
      gallonsSum = 0;
    }

    return sorted;
  }

  public onClickOpenDetail() {
    this.isOpenDetail = !this.isOpenDetail;
  }

  public onClickOpenRefuelsByVehicle() {
    this.isOpenRefuelsByVehicle = !this.isOpenRefuelsByVehicle;
    if (this.isOpenExpensesByVehicle) {
      this.isOpenExpensesByVehicle = false;
    }
  }

  public onClickOpenExpensesByVehicle() {
    this.isOpenExpensesByVehicle = !this.isOpenExpensesByVehicle;
    if (this.isOpenRefuelsByVehicle) {
      this.isOpenRefuelsByVehicle = false;
    }
  }
}
