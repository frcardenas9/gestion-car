import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
  standalone: false,
})
export class VehiclesPage implements OnInit {
  public vehicles: any[] = [];

  constructor() {}

  ngOnInit() {}

  public onClickAddVehicle() {
    console.log('Add Vehicle');
  }
}
