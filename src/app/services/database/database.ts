import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import brands from '../../../assets/json/brands.json';

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
      expenses: '++id, expenseType, date, odometer, total, vehicleId',
      brands: '++id, name',
    });
  }

  public getTable<T>(tableName: string): Table<T, number> {
    return this.table(tableName);
  }

  async seedBrands() {
    const count = await this.table('brands').count();

    if (count === 0) {
      await this.table('brands').bulkAdd(brands);
    }
  }
}
