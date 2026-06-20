import { Component } from '@angular/core';
import { SeedDatabaseService } from '@services/index';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private readonly seedDatabaseService: SeedDatabaseService) {
    this.seedDatabaseService.seedDatabase();
  }
}
