import { Component, OnInit } from '@angular/core';
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
import { VehiclesService } from '@services/index';

@Component({
  selector: 'app-create-vehicle-form',
  templateUrl: './create-vehicle-form.component.html',
  styleUrls: ['./create-vehicle-form.component.scss'],
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
export class CreateVehicleFormComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    plate: new FormControl('', []),
    capacity: new FormControl('', [Validators.required]),
  });
  public vehicle!: VehicleModel;

  constructor(
    private readonly modalController: ModalController,
    private readonly vehiclesService: VehiclesService,
  ) {}

  ngOnInit() {}

  public onClickBackButton() {
    this.modalController.dismiss();
  }

  public onClickSaveVehicle() {
    if (!this.form.valid) {
      return;
    }
    this.vehicle = this.form.value;

    this.vehiclesService.add(this.vehicle);

    alert('¡Vehículo guardado exitosamente!');
  }
}
