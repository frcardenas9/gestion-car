import { Injectable } from '@angular/core';
import { AlertModel } from '@models/index';
import { BaseRepository } from '@services/base-repository/base-repository';
import { DatabaseService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class AlertsService extends BaseRepository<AlertModel> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'alerts');
  }
}
