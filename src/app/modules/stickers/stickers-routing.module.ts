import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { StickersListComponent } from './pages/stickers-list/stickers-list.component';

const routes: Routes = [
  {
    path: '',
    component: StickersListComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StickersRoutingModule { }
