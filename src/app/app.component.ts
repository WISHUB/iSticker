import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public title = "Wis Dev";
  public location = "Buenos Aires, Argentina";
  public item = "../assets/icon/favicon.png";
  public avatar: any = {
    image: "../assets/icon/wis.png",
    description: "",
  };


  public appPages = [
    {
      title: 'STICKERS',
      url: '/folder/Stickers',
      icon: 'logo-whatsapp'
    },   
    {
      title: 'Favoritos',
      url: '/folder/Favoritos',
      icon: 'heart'
    },
    {
      title: 'Explorar',
      url: '/folder/Explorar',
      icon: 'walk-outline'
    },
    {
      title: 'Papelera',
      url: '/folder/Papelera',
      icon: 'trash'
    },
    
  ];
  public labels = ['Simpsons', 'Macri Gato', 'Cats', 'Wis'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
