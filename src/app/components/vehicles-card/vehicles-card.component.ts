import { Component, input, OnInit, output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { DividerComponent } from '@components/divider/divider.component';
import { ExpenseModel, RefuelModel, VehicleModel } from '@models/index';
import { ExpenseService, RefuelService, SweetAlertService, VehiclesService } from '@services/index';
import { CreateEditVehicleFormComponent, ExpenseFormComponent, RefuelFormComponent } from '@components/index';
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
  public expensesByVehicle: ExpenseModel[] = [];

  constructor(
    private readonly sweetAlertService: SweetAlertService,
    private readonly vehiclesService: VehiclesService,
    private readonly modalController: ModalController,
    private readonly refuelService: RefuelService,
    private readonly expenseService: ExpenseService,
  ) {}

  ngOnInit() {
    this.getRefuelsByVehicle();
    this.getExpensesByVehicle();
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

  public async onClickCreateExpenseVehicle() {
    const modal = await this.modalController.create({
      component: ExpenseFormComponent,
      componentProps: {
        vehicle: this.vehicle(),
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getExpensesByVehicle();
    }
  }

  public async onClickEditExpenseVehicle(item: ExpenseModel) {
    const modal = await this.modalController.create({
      component: ExpenseFormComponent,
      componentProps: {
        vehicle: this.vehicle(),
        expense: item,
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getExpensesByVehicle();
    }
  }

  public onClickDeleteExpenseVehicle(item: ExpenseModel) {
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
          await this.expenseService.delete(item.id);

          this.getExpensesByVehicle();

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
    });
  }

  public getExpensesByVehicle() {
    this.expenseService.getAll().then((x) => {
      this.expensesByVehicle = x.filter((y) => y.vehicleId === this.vehicle()?.id);
      this.expensesByVehicle
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .sort((a, b) => b.odometer - a.odometer);
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
    if (this.refuelsByVehicle.length === 0) {
      return;
    }

    this.isOpenRefuelsByVehicle = !this.isOpenRefuelsByVehicle;
    if (this.isOpenExpensesByVehicle) {
      this.isOpenExpensesByVehicle = false;
    }
  }

  public onClickOpenExpensesByVehicle() {
    if (this.expensesByVehicle.length === 0) {
      return;
    }

    this.isOpenExpensesByVehicle = !this.isOpenExpensesByVehicle;
    if (this.isOpenRefuelsByVehicle) {
      this.isOpenRefuelsByVehicle = false;
    }
  }
}
