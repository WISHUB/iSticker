// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickersRoutingModule } from './stickers-routing.module';
import { IonicModule } from '@ionic/angular';

// Utilities
// ..

// Components
import { StickerItemComponent } from './components/sticker-item/sticker-item.component';
import { StickerPackComponent } from './components/sticker-pack/sticker-pack.component';
import { StickersListComponent } from './pages/stickers-list/stickers-list.component';

@NgModule({
  declarations: [
    StickerItemComponent,
    StickerPackComponent,
    StickersListComponent
  ],
  imports: [
    CommonModule,
    StickersRoutingModule,
    IonicModule.forRoot()
  ]
})
export class StickersModule { }
