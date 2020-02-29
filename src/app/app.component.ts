import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `<ion-router-outlet id="main-content"></ion-router-outlet>`
})
export class AppComponent implements OnInit {

  loadingRouteConfig: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    const appTitle = this.titleService.getTitle();

    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          window.scrollTo(0, 0);
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['breadcrumb']) {
            return child.snapshot.data['breadcrumb'];
          }
          return appTitle;
        })
      ).subscribe((title: string) => this.titleService.setTitle('StickerBook | ' + title));
  }
}
