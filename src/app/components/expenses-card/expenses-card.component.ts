import { Component, input } from '@angular/core';
import { ExpensesSummary } from '@models/index';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-expenses-card',
  templateUrl: './expenses-card.component.html',
  styleUrls: ['./expenses-card.component.scss'],
  imports: [DecimalPipe],
})
export class ExpensesCardComponent {
  public firstMonth = input.required<string>();
  public summary = input.required<ExpensesSummary>();
}
