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
import { BrandModel } from '@models/index';
import { BrandsService, SweetAlertService } from '@services/index';

@Component({
  selector: 'app-create-edit-brand-form',
  templateUrl: './create-edit-brand-form.component.html',
  styleUrls: ['./create-edit-brand-form.component.scss'],
  imports: [IonInput, IonContent, IonTitle, IonIcon, IonButton, IonHeader, IonToolbar, IonButtons, ReactiveFormsModule],
})
export class CreateEditBrandFormComponent implements OnInit {
  public brand = input<BrandModel>();
  public isEditMode: boolean = false;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly modalController: ModalController,
    private readonly brandsService: BrandsService,
    private readonly sweetAlertService: SweetAlertService,
  ) {}

  ngOnInit() {
    if (this.brand()) {
      this.form.patchValue(this.brand());
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
      this.brandsService.update(this.brand().id, dataForm);
    } else {
      this.brandsService.add(dataForm);
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
