import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import {
  HeaderComponent,
  SummaryCardComponent,
  ExpensesCardComponent,
  UpcomingAlertsCardComponent,
  RecentActivityCardComponent,
  EmptyStateCardComponent,
} from '@components/index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderComponent,
    SummaryCardComponent,
    ExpensesCardComponent,
    UpcomingAlertsCardComponent,
    RecentActivityCardComponent,
    EmptyStateCardComponent,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
