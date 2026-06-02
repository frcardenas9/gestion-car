import { Component, OnInit } from '@angular/core';
import { AlertsCardComponent } from '@components/alerts-card/alerts-card.component';

@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss'],
  imports: [AlertsCardComponent],
})
export class AlertsListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
