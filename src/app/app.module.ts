// Core
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Services
import { ApiService } from './services/api.service';
// Pipes
import { SortPipe } from './pipes/sort.pipe';
import { DatePipe } from '@angular/common';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent, FooterComponent, ItemsListComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ItemsListComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    SortPipe,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'en-Us' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
