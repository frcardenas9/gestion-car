import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import { DividerComponent, HeaderComponent } from '@components/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    HeaderComponent,
    DividerComponent,
    NgApexchartsModule,
  ],
  declarations: [ReportsPage],
})
export class ReportsPageModule {}
