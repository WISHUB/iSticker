import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ApiService } from '@services';
import { Sticker } from '@interfaces';

@Component({
  selector: 'app-stickers-list',
  templateUrl: './stickers-list.component.html',
  styleUrls: ['./stickers-list.component.scss'],
})
export class StickersListComponent implements OnInit {

  stickers: Sticker[];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private apiService: ApiService) {
    this.stickers = [];
  }

  ngOnInit() {
    this.getStickers();
  }

  getStickers(): void {
    this.apiService.get('stickers')
      .subscribe((response: Sticker[]) => this.stickers = response);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.stickers.length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

}
