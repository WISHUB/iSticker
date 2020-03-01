import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StickerPackComponent } from './sticker-pack.component';

describe('StickerPackComponent', () => {
  let component: StickerPackComponent;
  let fixture: ComponentFixture<StickerPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickerPackComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StickerPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
