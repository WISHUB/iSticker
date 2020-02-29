import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AuthGuard } from '@app/guards';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data: {
          breadcrumb: 'Home'
        }

      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>  import('@modules/auth/auth.module').then(m => m.AuthModule),
    data: {
      breadcrumb: 'Authentication'
    }
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
