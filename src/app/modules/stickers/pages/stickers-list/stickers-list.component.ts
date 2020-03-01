import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-stickers-list',
  templateUrl: './stickers-list.component.html',
  styleUrls: ['./stickers-list.component.scss'],
})
export class StickersListComponent implements OnInit {

  stickers: any[];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor() {
    this.stickers = [
      {
        name: 'test'
      },
      {
        name: 'test 2'
      },
      {
        name: 'test 3'
      }
    ];
  }

  ngOnInit() {}

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
