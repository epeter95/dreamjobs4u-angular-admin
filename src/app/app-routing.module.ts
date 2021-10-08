import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './site-layout/home/home.component';
import { LanguagesComponent } from './site-layout/languages/languages.component';
import { PublicContentsComponent } from './site-layout/public-contents/public-contents.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'nyelvek', component: LanguagesComponent, pathMatch: 'full' },
      { path: 'publikus-tartalmak', component: PublicContentsComponent, pathMatch: 'full' },

    ]
  },
  { path: 'bejelentkezes', component: LoginComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
