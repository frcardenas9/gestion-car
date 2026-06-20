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
} from '@ionic/angular/standalone';
import { VehicleTypeModel } from '@models/index';
import { SweetAlertService, VehicleTypesService } from '@services/index';

@Component({
  selector: 'app-create-edit-vehicle-type-form',
  templateUrl: './create-edit-vehicle-type-form.component.html',
  styleUrls: ['./create-edit-vehicle-type-form.component.scss'],
  imports: [IonInput, IonContent, IonTitle, IonIcon, IonButton, IonHeader, IonToolbar, IonButtons, ReactiveFormsModule],
})
export class CreateEditVehicleTypeFormComponent implements OnInit {
  public vehicleType = input<VehicleTypeModel>();
  public isEditMode: boolean = false;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly modalController: ModalController,
    private readonly vehicleTypesService: VehicleTypesService,
    private readonly sweetAlertService: SweetAlertService,
  ) {}

  ngOnInit() {
    if (this.vehicleType()) {
      this.form.patchValue(this.vehicleType());
      this.isEditMode = true;
    }
  }

  public onClickBackButton(refresh?: boolean) {
    this.modalController.dismiss({ refresh });
  }

  public onClickSave() {
    if (!this.form.valid) {
      return;
    }
    const dataForm = this.form.value;

    if (this.isEditMode) {
      this.vehicleTypesService.update(this.vehicleType().id, dataForm);
    } else {
      this.vehicleTypesService.add(dataForm);
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
}
