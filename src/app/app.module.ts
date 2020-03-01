// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from '@shared/shared.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './app.reducer';
import { AuthEffects } from '@auth/store/effects/auth.effects';

// Utilities
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TokenInterceptor, ErrorInterceptor } from './core/interceptors/token.interceptor';
import { environment } from '@env';
import { AuthService } from '@app/services';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Components
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export function jwtTokenGetter() {
  const auth = JSON.parse(sessionStorage.getItem('auth'));
  return auth['user'] ? auth['user']['token'] : '';
}

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

const interceptors = [{
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
},
{
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}];

const serviceWorker = ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  registrationStrategy: 'registerImmediately'
});

const jwtModule = JwtModule.forRoot({
  config: {
    tokenGetter: jwtTokenGetter
  }
});

const storeDevtoolsModule = StoreDevtoolsModule.instrument({
  maxAge: 25, // Retains last 25 states
  logOnly: environment.production, // Restrict extension to log-only mode
});


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    ContentLayoutComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    serviceWorker,
    jwtModule,
    StoreModule.forRoot(fromApp.reducers, { metaReducers: fromApp.metaReducers }),
    EffectsModule.forRoot([AuthEffects]),
    storeDevtoolsModule
  ],
  providers: [
    AuthService,
    interceptors,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
