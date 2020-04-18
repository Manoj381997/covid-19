import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndiaComponent } from './india/india.component';
import { CoronaComponent } from './corona/corona.component';
import { GlobalComponent } from './global/global.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, },
  { path: 'india', component: IndiaComponent, },
  { path: 'corona', component: CoronaComponent, },
  { path: 'global', component: GlobalComponent, },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent, IndiaComponent, CoronaComponent, GlobalComponent];