import { Component } from '@angular/core';
import { BrandsService } from '@services/index';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private readonly brandsService: BrandsService) {
    this.brandsService.seedBrands();
  }
}
