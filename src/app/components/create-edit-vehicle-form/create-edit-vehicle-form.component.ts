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
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { VehicleModel } from '@models/index';
import { SweetAlertService, VehiclesService } from '@services/index';

@Component({
  selector: 'app-create-edit-vehicle-form',
  templateUrl: './create-edit-vehicle-form.component.html',
  styleUrls: ['./create-edit-vehicle-form.component.scss'],
  imports: [
    IonInput,
    IonContent,
    IonTitle,
    IonIcon,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonSelect,
    IonSelectOption,
    ReactiveFormsModule,
  ],
})
export class CreateEditVehicleFormComponent implements OnInit {
  public vehicle = input<VehicleModel>();
  public isEditMode: boolean = false;

  public form: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    plate: new FormControl('', []),
    capacity: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly modalController: ModalController,
    private readonly vehiclesService: VehiclesService,
    private readonly sweetAlertService: SweetAlertService,
  ) {}

  ngOnInit() {
    if (this.vehicle()) {
      this.form.patchValue(this.vehicle());
      this.isEditMode = true;
    }
  }

  public onClickBackButton(refresh?: boolean) {
    this.modalController.dismiss({ refresh });
  }

  public onClickSaveVehicle() {
    if (!this.form.valid) {
      return;
    }
    const vehicleForm = this.form.value;

    if (this.isEditMode) {
      this.vehiclesService.update(this.vehicle().id, vehicleForm);
    } else {
      this.vehiclesService.add(vehicleForm);
    }

    this.onClickBackButton(true);

    this.sweetAlertService.show({
      title: '¡Éxito!',
      text: this.isEditMode
        ? 'El vehículo ha sido actualizado exitosamente.'
        : 'El vehículo ha sido creado exitosamente.',
      icon: 'success',
    });
  }
}
