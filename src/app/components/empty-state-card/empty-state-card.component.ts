import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state-card',
  templateUrl: './empty-state-card.component.html',
  styleUrls: ['./empty-state-card.component.scss'],
})
export class EmptyStateCardComponent {
  public title = input<string>();
  public description = input<string>();
}
