import { Component, OnInit } from '@angular/core';
import { VehiclesCardComponent } from '@components/vehicles-card/vehicles-card.component';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
  imports: [VehiclesCardComponent],
})
export class VehiclesListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
