import { Component, input, OnInit, output } from '@angular/core';
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
  IonDatetime,
} from '@ionic/angular/standalone';
import { AlertModel } from '@models/index';
import { SweetAlertService, AlertsService } from '@services/index';

@Component({
  selector: 'app-create-edit-alert-form',
  templateUrl: './create-edit-alert-form.component.html',
  styleUrls: ['./create-edit-alert-form.component.scss'],
  imports: [
    IonDatetime,
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
export class CreateEditAlertFormComponent implements OnInit {
  public alert = input<AlertModel>();
  public permissionEnabled = input<boolean>();
  public getAllAlerts = output<boolean>();
  public isEditMode: boolean = false;
  public minDate: string = (() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  })();

  public form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly modalController: ModalController,
    private readonly alertsService: AlertsService,
    private readonly sweetAlertService: SweetAlertService,
  ) {}

  ngOnInit() {
    if (this.alert()) {
      this.form.patchValue(this.alert());
      this.isEditMode = true;
    }
  }

  public onClickBackButton(refresh?: boolean) {
    this.modalController.dismiss({ refresh });
  }

  public async onClickSaveAlert() {
    if (!this.form.valid) {
      return;
    }
    const alertForm = this.form.value;

    if (this.isEditMode) {
      const id = await this.alertsService.update(this.alert().id, alertForm);
      this.schedule({
        id,
        name: alertForm?.name,
        date: alertForm?.date,
      });
      this.getAllAlerts.emit(true);
    } else {
      const id = await this.alertsService.add(alertForm);
      this.schedule({
        id,
        name: alertForm?.name,
        date: alertForm?.date,
      });
    }

    this.onClickBackButton(true);

    this.sweetAlertService.show({
      title: '¡Éxito!',
      text: this.isEditMode ? 'La alerta ha sido actualizada exitosamente.' : 'La alerta ha sido creada exitosamente.',
      icon: 'success',
    });
  }

  private schedule(alert: AlertModel) {
    this.alertsService.scheduleNotification(alert);
  }
}
