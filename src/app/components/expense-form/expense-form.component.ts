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
import { ExpenseModel, ExpenseTypeModel, VehicleModel } from '@models/index';
import { ExpenseService, ExpenseTypesService, RefuelService, SweetAlertService } from '@services/index';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
  imports: [
    IonInput,
    IonContent,
    IonTitle,
    IonIcon,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class ExpenseFormComponent implements OnInit {
  public vehicle = input<VehicleModel>();
  public expense = input<ExpenseModel>();
  public isEditMode: boolean = false;
  public currentDate: string = (() => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  })();
  public expenseTypes: ExpenseTypeModel[] = [];

  public form: FormGroup = new FormGroup({
    expenseType: new FormControl('', [Validators.required]),
    date: new FormControl(this.currentDate, [Validators.required]),
    odometer: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly modalController: ModalController,
    private readonly expenseService: ExpenseService,
    private readonly sweetAlertService: SweetAlertService,
    private readonly expenseTypesService: ExpenseTypesService,
  ) {}

  async ngOnInit() {
    if (this.expense()) {
      this.form.patchValue(this.expense());
      this.isEditMode = true;
    }
    await this.getAllExpenseTypes();
  }

  public onClickBackButton(refresh?: boolean) {
    this.modalController.dismiss({ refresh });
  }

  public async onClickSaveExpense() {
    if (!this.form.valid) {
      return;
    }
    const expenseForm = {
      ...this.form.value,
      vehicleId: this.vehicle().id,
    };

    if (this.isEditMode) {
      await this.expenseService.update(this.expense().id, expenseForm);
    } else {
      await this.expenseService.add(expenseForm);
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

  public async getAllExpenseTypes() {
    this.expenseTypes = await this.expenseTypesService.getAll();
  }
}
