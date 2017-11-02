// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Services
import { ApiService } from './services/api.service';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent, FooterComponent, ItemsListComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ItemsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    { provide: LOCALE_ID, useValue: 'en-Us' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
