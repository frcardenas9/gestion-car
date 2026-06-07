import { Injectable } from '@angular/core';
import { VehicleModel } from '@models/index';
import Dexie, { Table } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  constructor() {
    super('gestion_car_database');

    this.version(1).stores({
      vehicles: '++id, type, name, brand, model, year, plate, capacity',
      alerts: '++id, name, date',
      refuels: '++id, date, odometer, price, total, fuelAmount, isFilling, vehicleId',
    });
  }

  public getTable<T>(tableName: string): Table<T, number> {
    return this.table(tableName);
  }
}
