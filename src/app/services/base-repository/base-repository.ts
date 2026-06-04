import { Table, UpdateSpec } from 'dexie';
import { DatabaseService } from '@services/index';

export class BaseRepository<T extends { id?: number }> {
  protected table: Table<T, number>;

  constructor(databaseService: DatabaseService, tableName: string) {
    this.table = databaseService.getTable<T>(tableName);
  }

  public add(item: T) {
    return this.table.add(item);
  }

  public getAll() {
    return this.table.toArray();
  }

  public getById(id: number) {
    return this.table.get(id);
  }

  public update(id: number, changes: UpdateSpec<T>) {
    return this.table.update(id, changes);
  }

  public put(item: T) {
    return this.table.put(item);
  }

  public delete(id: number) {
    return this.table.delete(id);
  }

  public clear() {
    return this.table.clear();
  }
}
