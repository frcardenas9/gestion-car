import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateEditVehicleTypeFormComponent } from './create-edit-vehicle-type-form.component';

describe('CreateEditVehicleTypeFormComponent', () => {
  let component: CreateEditVehicleTypeFormComponent;
  let fixture: ComponentFixture<CreateEditVehicleTypeFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditVehicleTypeFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditVehicleTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
