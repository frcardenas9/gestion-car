import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-recent-activity-card',
  templateUrl: './recent-activity-card.component.html',
  styleUrls: ['./recent-activity-card.component.scss'],
  imports: [IonButton, IonIcon],
})
export class RecentActivityCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
