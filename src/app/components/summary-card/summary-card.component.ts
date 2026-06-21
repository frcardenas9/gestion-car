import { Component, input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { ExpensesSummary } from '@models/index';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss'],
  imports: [IonIcon, DecimalPipe],
})
export class SummaryCardComponent {
  public currentMonth = input.required<string>();
  public summary = input.required<ExpensesSummary>();
}
