import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StickersListComponent } from './stickers-list.component';

describe('StickersListComponent', () => {
  let component: StickersListComponent;
  let fixture: ComponentFixture<StickersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickersListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StickersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
