import { Component, OnInit } from '@angular/core';
import { EmptyStateCardComponent, CreateEditBrandFormComponent } from '@components/index';
import { ModalController } from '@ionic/angular';
import {
  IonContent,
  IonLabel,
  IonButton,
  IonIcon,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
} from '@ionic/angular/standalone';
import { BrandModel } from '@models/index';
import { BrandsService, SweetAlertService } from '@services/index';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  imports: [
    IonButtons,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonContent,
    IonLabel,
    IonButton,
    IonIcon,
    EmptyStateCardComponent,
  ],
})
export class BrandsComponent implements OnInit {
  public brands: BrandModel[] = [];

  constructor(
    private readonly brandsService: BrandsService,
    private readonly modalController: ModalController,
    private readonly sweetAlertService: SweetAlertService,
  ) {}

  ngOnInit() {
    this.getAll();
  }

  public async getAll() {
    this.brands = await this.brandsService.getAll();
    console.table(this.brands);
  }

  public async onClickCreate() {
    const modal = await this.modalController.create({
      component: CreateEditBrandFormComponent,
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getAll();
    }
  }

  public onClickDelete(brand: BrandModel) {
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
          await this.brandsService.delete(brand.id);

          this.getAll();

          this.sweetAlertService.show({
            title: '¡Eliminado!',
            text: 'El registro ha sido eliminado.',
            icon: 'success',
          });
        }
      });
  }

  public async onClickEdit(brand: BrandModel) {
    const modal = await this.modalController.create({
      component: CreateEditBrandFormComponent,
      componentProps: {
        brand: brand,
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.refresh) {
      this.getAll();
    }
  }

  public onClickBackButton() {
    this.modalController.dismiss();
  }
}
