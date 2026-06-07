import { Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonInput,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { RefuelModel, VehicleModel } from '@models/index';
import { RefuelService, SweetAlertService } from '@services/index';

@Component({
  selector: 'app-refuel-form',
  templateUrl: './refuel-form.component.html',
  styleUrls: ['./refuel-form.component.scss'],
  imports: [
    IonCheckbox,
    IonInput,
    IonContent,
    IonTitle,
    IonIcon,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    ReactiveFormsModule,
  ],
})
export class RefuelFormComponent implements OnInit {
  public vehicle = input<VehicleModel>();
  public refuel = input<RefuelModel>();
  public isEditMode: boolean = false;
  public currentDate: string = (() => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  })();

  public form: FormGroup = new FormGroup({
    date: new FormControl(this.currentDate, [Validators.required]),
    odometer: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
    fuelAmount: new FormControl(''),
    isFilling: new FormControl(true, [Validators.required]),
  });

  constructor(
    private readonly modalController: ModalController,
    private readonly refuelService: RefuelService,
    private readonly sweetAlertService: SweetAlertService,
  ) {}

  ngOnInit() {
    if (this.refuel()) {
      this.form.patchValue(this.refuel());
      this.isEditMode = true;
    }
  }

  public onClickBackButton(refresh?: boolean) {
    this.modalController.dismiss({ refresh });
  }

  public async onClickSaveRefuel() {
    if (!this.form.valid) {
      return;
    }
    const refuelForm = {
      ...this.form.value,
      vehicleId: this.vehicle().id,
    };

    if (this.isEditMode) {
      await this.refuelService.update(this.refuel().id, refuelForm);
    } else {
      await this.refuelService.add(refuelForm);
    }

    this.onClickBackButton(true);

    this.sweetAlertService.show({
      title: '¡Éxito!',
      text: this.isEditMode
        ? 'El registro ha sido actualizado exitosamente.'
        : 'El registro ha sido creado exitosamente.',
      icon: 'success',
    });
  }

  public calculateFuelAmount() {
    const price: number = Number(this.form.get('price')?.value);
    const total: number = Number(this.form.get('total')?.value);

    if (price && total) {
      const fuelAmount: number = Math.round((total / price) * 100) / 100;
      this.form.get('fuelAmount')?.setValue(fuelAmount);
    } else {
      this.form.get('fuelAmount')?.setValue('');
    }
  }
}
