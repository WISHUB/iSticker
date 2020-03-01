import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sticker-item',
  templateUrl: './sticker-item.component.html',
  styleUrls: ['./sticker-item.component.scss'],
})
export class StickerItemComponent implements OnInit {

  @Input() sticker: any;

  constructor() { }

  ngOnInit() {}

}
