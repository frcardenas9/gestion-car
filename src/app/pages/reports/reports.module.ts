import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import { DividerComponent, EmptyStateCardComponent, HeaderComponent } from '@components/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    HeaderComponent,
    DividerComponent,
    NgApexchartsModule,
    DecimalPipe,
    EmptyStateCardComponent,
  ],
  declarations: [ReportsPage],
})
export class ReportsPageModule {}
