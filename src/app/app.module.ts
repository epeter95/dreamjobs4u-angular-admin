import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { HomeComponent } from './site-layout/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';

import { SanitizerPipe } from './pipes/sanitizer.pipe';
import { BaseTableComponent } from './general-components/base-table/base-table.component';
import { BorderCardComponent } from './general-components/border-card/border-card.component';
import { DynamicFormComponent } from './general-components/dynamic-form/dynamic-form.component';
import { FormBaseComponent } from './general-components/dynamic-form/form-base/form-base.component';
import { DialogComponent } from './general-components/dialog/dialog.component';
import { HeaderComponent } from './site-layout/header/header.component';
import { PublicContentsComponent } from './site-layout/public-contents/public-contents.component';
import { LanguagesComponent } from './site-layout/languages/languages.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    HomeComponent,
    LoginComponent,
    SanitizerPipe,
    BorderCardComponent,
    DynamicFormComponent,
    FormBaseComponent,
    BaseTableComponent,
    DialogComponent,
    HeaderComponent,
    PublicContentsComponent,
    LanguagesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
