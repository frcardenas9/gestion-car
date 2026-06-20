import { Injectable } from '@angular/core';
import { BrandModel } from '@models/index';
import { BaseRepository } from '@services/base-repository/base-repository';
import { DatabaseService } from '@services/index';

@Injectable({
  providedIn: 'root',
})
export class BrandsService extends BaseRepository<BrandModel> {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'brands');
  }

  async seedBrands() {
    await this.databaseService.seedBrands();
  }
}
