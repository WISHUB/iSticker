import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@main/app.reducer';
import { ActivateLoadingAction, DesctivateLoadingAction } from '@shared/ui.actions';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit, OnDestroy {

  public loadingRouteConfig: boolean;
  public subscription: Subscription;

  public selectedIndex = 0;
  public title = 'Wis Dev';
  public item = 'assets/icons/favicon.png';
  public avatar: any = {
    image: 'assets/images/wis.png'
  };

  public appPages = [
    {
      title: 'Stickers',
      url: '/stickers',
      icon: 'logo-whatsapp'
    }
  ];

  constructor(
    private router: Router,
    private store: Store < AppState >,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this._initializeApp();
  }

  ngOnInit() {

    this.subscription = this.store.select('ui')
      .subscribe(ui => this.loadingRouteConfig = ui.isLoading);

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.store.dispatch(new ActivateLoadingAction());
      } else if (event instanceof RouteConfigLoadEnd) {
        this.store.dispatch(new DesctivateLoadingAction());
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private _initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
