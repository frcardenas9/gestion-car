import { Component, input } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { ExpenseModel, RefuelModel } from '@models/index';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-recent-activity-card',
  templateUrl: './recent-activity-card.component.html',
  styleUrls: ['./recent-activity-card.component.scss'],
  imports: [IonButton, IonIcon, DecimalPipe],
})
export class RecentActivityCardComponent {
  public recentMovements = input.required<(RefuelModel | ExpenseModel)[]>();

  constructor(private readonly router: Router) {}

  public onClickOpenReports() {
    this.router.navigate(['/tabs/reports']);
  }
}
