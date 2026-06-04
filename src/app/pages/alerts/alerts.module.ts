import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertsPageRoutingModule } from './alerts-routing.module';

import { AlertsPage } from './alerts.page';
import { HeaderComponent, AlertsListComponent, EmptyStateCardComponent } from '@components/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertsPageRoutingModule,
    HeaderComponent,
    AlertsListComponent,
    EmptyStateCardComponent,
  ],
  declarations: [AlertsPage],
})
export class AlertsPageModule {}
